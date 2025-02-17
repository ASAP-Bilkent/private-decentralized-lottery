use accumulator::{group::Rsa2048, Accumulator, Witness};
use actix_web::{web, App, HttpServer, HttpResponse, Responder};
use actix_cors::Cors;
use actix_web::web::Data;
use ethers::types::H256;
use private_decentralized_lottery::{add_name_wrapper, get_random_number, request_vrf};
use std::sync::{Arc, Mutex};

#[derive(Clone)]
struct AppState {
    names: Vec<String>,
    winner_number: Option<usize>,
    accumulator: Accumulator<Rsa2048, String>,
    commitment: H256,
}

async fn start_lottery(data: web::Data<Arc<Mutex<AppState>>>) -> impl Responder {
    let mut app_state = data.lock().unwrap();
    if app_state.names.is_empty() {
        return HttpResponse::BadRequest().body("No names in the lottery");
    }

    let commitment = format!("{:?}", app_state.accumulator.clone()).into_bytes();
    let mut commitment_array = [0u8; 32];
    commitment_array.copy_from_slice(&commitment[..32]);
    app_state.commitment = commitment_array.into();
    // get actual vrf output
    request_vrf(commitment_array.into()).await.unwrap();

    HttpResponse::Ok().json("Lottery started, VRF request sent")
}

async fn announce_winner(data: web::Data<Arc<Mutex<AppState>>>) -> impl Responder {
    let mut app_state = data.lock().unwrap();
    
    let winner = get_random_number(app_state.commitment).await.unwrap();
    app_state.winner_number = Some(winner.as_usize());

    if let Some(winner_index) = app_state.winner_number {
        if let Some(winner) = app_state.names.get(winner_index) {
            HttpResponse::Ok().json(format!("The winner is: {}", winner))
        } else {
            HttpResponse::InternalServerError().body("Winner index is invalid")
        }
    } else {
        HttpResponse::BadRequest().body("Lottery has not started")
    }
}

async fn verify(data: web::Data<Arc<Mutex<AppState>>>, name: web::Json<String>) -> impl Responder {
    let app_state = data.lock().unwrap();
    let mut witness: Witness<Rsa2048, String> = Witness(Accumulator::empty());
    witness = witness
        .compute_subset_witness(&app_state.names.iter().map(|s| s.to_string()).collect::<Vec<String>>(), &[name.to_string()])
        .unwrap();
    let proof_witness: accumulator::MembershipProof<Rsa2048, String> = app_state.accumulator.prove_membership(&[(name.to_string(), witness)]).unwrap();
    let result: bool = app_state.accumulator.verify_membership(&name, &proof_witness);
    if result {
        HttpResponse::Ok().body(format!("Selected name '{}' is in with proof: {:?}", name, proof_witness))
    } else {
        HttpResponse::NotFound().body("Name not found")
    }
}


#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "debug");
    env_logger::init();

    let app_state = Arc::new(Mutex::new(AppState {
        names: Vec::new(),
        winner_number: None,
        accumulator: Accumulator::<Rsa2048, String>::empty(),
        commitment: H256::zero(),
    }));

    HttpServer::new(move || {
        App::new()
            .app_data(Data::new(app_state.clone()))
            .wrap(
                Cors::default()
                    .allow_any_origin() // Allow requests from any origin
                    .allow_any_method() // Allow all HTTP methods
                    .allow_any_header(), // Allow all headers
            )
            .route("/add", web::post().to(add_name_wrapper))
            .route("/start_lottery", web::post().to(start_lottery))
            .route("/announce_winner", web::get().to(announce_winner))
            .route("/verify", web::post().to(verify))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
