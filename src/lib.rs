use std::{fs, sync::Mutex};
use accumulator::{group::Rsa2048, Accumulator};
use actix_web::{web, HttpResponse, Responder};
use dotenv::dotenv;
use ethers::prelude::*;
use ethers::abi::Abi;
use serde_json::{self};
use std::{env, sync::Arc};

pub struct AppState {
    pub names: Vec<String>,
    pub accumulator: Accumulator<Rsa2048, String>,
}

impl AppState {
    pub fn new() -> Self {
        // Initialize an empty accumulator for Rsa2048
        let accumulator = Accumulator::<Rsa2048, String>::empty();

        Self {
            names: Vec::new(),
            accumulator,
        }
    }
}

pub async fn add_name_wrapper(data: web::Data<Arc<Mutex<AppState>>>, name: web::Json<String>) -> impl Responder {
    let mut app_state = data.lock().unwrap();

    // Add the name to the names list
    add_name(name, app_state);

    HttpResponse::Ok().body("Name added")
}

pub fn add_name(name: web::Json<String>, mut app_state: std::sync::MutexGuard<'_, AppState>) {
    let name_string = name.into_inner();
    app_state.names.push(name_string.clone());

    // Update the accumulator
    app_state.accumulator = app_state.accumulator.clone().add(&[name_string.clone()]);
}

pub async fn request_vrf(commitment: H256) -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();

    let vrf_contract: H160 = "0xc81228e835DDef6E0F08D91bC714213B371Ad4c3".parse::<Address>()?;
    let priv_key: String = env::var("PRIVATE_KEY").unwrap();
    let rpc_url: String = env::var("RPC_URL").unwrap();
    let provider: Provider<Http> = Provider::<Http>::try_from(rpc_url)?;

    let wallet = priv_key
        .parse::<LocalWallet>()?
        .with_chain_id(Chain::Sepolia);
    let client = SignerMiddleware::new(provider.clone(), wallet.clone());

    let abi_json: String = fs::read_to_string("abi.json")?;
    let abi: Abi = serde_json::from_str(&abi_json)?;
    let contract = Contract::new(vrf_contract, abi, Arc::new(client));

    let request_vrf = contract.method::<_, H256>("requestRandomWords", commitment)?;

    let pending_tx: PendingTransaction<'_, _> = request_vrf.send().await?;
    let receipt: Option<TransactionReceipt> = pending_tx.confirmations(3).await?;
    println!("VRF Request sent successfully: {:?}", receipt);

    Ok(())
}

pub async fn get_random_number(commitment: H256) -> Result<U256, Box<dyn std::error::Error>> {
    dotenv().ok();

    let contract_address = "0xc81228e835DDef6E0F08D91bC714213B371Ad4c3".parse::<Address>()?;
    let priv_key = env::var("PRIVATE_KEY").unwrap();
    let rpc_url = env::var("RPC_URL").unwrap();
    let provider = Provider::<Http>::try_from(rpc_url)?;

    let wallet = priv_key
        .parse::<LocalWallet>()?
        .with_chain_id(Chain::Sepolia);
    let client = SignerMiddleware::new(provider.clone(), wallet.clone());

    let abi_json = fs::read_to_string("abi.json")?;
    let abi: Abi = serde_json::from_str(&abi_json)?;
    let contract = Contract::new(contract_address, abi, Arc::new(client));

    // Call the commitmentRandomness mapping
    let random_number: U256 = contract
        .method::<_, U256>("commitmentRandomness", commitment)?
        .call()
        .await?;

    Ok(random_number)
}
