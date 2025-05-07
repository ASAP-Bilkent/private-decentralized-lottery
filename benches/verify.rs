use std::sync::{Arc, Mutex};
use actix_web::{web, HttpResponse, Responder};
use criterion::{criterion_group, criterion_main, Criterion, black_box};
use accumulator::group::Rsa2048;
use accumulator::{Accumulator, Witness};

async fn verify(data: web::Data<Arc<Mutex<AppState>>>, name: web::Json<String>) -> impl Responder {
    let app_state = data.lock().unwrap();

    let mut witness: Witness<Rsa2048, String> = Witness(Accumulator::<Rsa2048, String>::empty());

    let names_str_slice: Vec<String> = app_state.names.iter().map(|s: &String| s.clone()).collect();
    println!("Names: {:?}", app_state.names);
    println!("Verifying name: {:?}", name.to_string());

    match witness.compute_subset_witness(&names_str_slice, &[name.to_string()]) {
        Ok(w) => {
            witness = w;
            println!("Witness: {:?}", witness);
        }
        Err(e) => {
            println!("Error computing witness: {:?}", e);
            return HttpResponse::InternalServerError().body("Failed to compute witness");
        }
    }

    let proof_witness = match app_state
        .accumulator
        .prove_membership(&[(name.to_string(), witness)])
    {
        Ok(p) => p,
        Err(e) => {
            println!("Error proving membership: {:?}", e);
            return HttpResponse::InternalServerError().body("Failed to prove membership");
        }
    };
    println!("Proof: {:?}", proof_witness);

    let result: bool = app_state
        .accumulator
        .verify_membership(&name, &proof_witness);
    println!("Result: {:?}", result);

    if result {
        HttpResponse::Ok().body(format!(
            "Selected name '{}' is in with proof: {:?}",
            name, proof_witness
        ))
    } else {
        HttpResponse::NotFound().body("Name not found")
    }
}

struct AppState {
    names: Vec<String>,
    accumulator: Accumulator<Rsa2048, String>,
}

pub fn benchmark_verify(c: &mut Criterion) {
    let names: Vec<String> = (0..1)
    .map(|i| format!("Name{}", i)) // Generates "Name0", "Name1", ..., "Name499"
    .collect();
     // Create shared app state
    let app_state = Arc::new(Mutex::new(AppState {
        accumulator: Accumulator::<Rsa2048, String>::empty(),
        names: names.clone(),
    }));
    // Add names to the accumulator
    let app_state_guard = app_state.lock().unwrap();
    for name in &names {
        app_state_guard.accumulator.clone().add(&[name.clone()]);
    }

   

    let test_name = "Name0".to_string();

    c.bench_function("verify", |b| {
        b.iter(|| async {
            let data = web::Data::new(app_state.clone());
            let name = web::Json(test_name.clone());

            black_box(verify(data, name).await);
        });
    });
}


pub fn benchmark_verify_50(c: &mut Criterion) {
    let names: Vec<String> = (0..50)
    .map(|i| format!("Name{}", i)) // Generates "Name0", "Name1", ..., "Name499"
    .collect();
     // Create shared app state
    let app_state = Arc::new(Mutex::new(AppState {
        accumulator: Accumulator::<Rsa2048, String>::empty(),
        names: names.clone(),
    }));
    // Add names to the accumulator
    let app_state_guard = app_state.lock().unwrap();
    for name in &names {
        app_state_guard.accumulator.clone().add(&[name.clone()]);
    }

   

    let test_name = "Name0".to_string();

    c.bench_function("verify", |b| {
        b.iter(|| async {
            let data = web::Data::new(app_state.clone());
            let name = web::Json(test_name.clone());

            black_box(verify(data, name).await);
        });
    });
}

pub fn benchmark_verify_1000(c: &mut Criterion) {
    let names: Vec<String> = (0..100)
    .map(|i| format!("Name{}", i)) // Generates "Name0", "Name1", ..., "Name499"
    .collect();
     // Create shared app state
    let app_state = Arc::new(Mutex::new(AppState {
        accumulator: Accumulator::<Rsa2048, String>::empty(),
        names: names.clone(),
    }));
    // Add names to the accumulator
    let app_state_guard = app_state.lock().unwrap();
    for name in &names {
        app_state_guard.accumulator.clone().add(&[name.clone()]);
    }

   

    let test_name = "Name0".to_string();

    c.bench_function("verify", |b| {
        b.iter(|| async {
            let data = web::Data::new(app_state.clone());
            let name = web::Json(test_name.clone());

            black_box(verify(data, name).await);
        });
    });
}

criterion_group!(benches, benchmark_verify,benchmark_verify_50,benchmark_verify_1000);
criterion_main!(benches);
