use dotenv::dotenv;
use ethers::abi::Abi;
use ethers::prelude::*;
use serde_json::{self};
use std::fs;
use std::{env, sync::Arc};

pub async fn request_vrf(commitment: H256) -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();

    let vrf_contract: H160 = "0xC811D13F35A3240e0Fcf7D28Ed0A92f617B44752".parse::<Address>()?;
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

    let contract_address = "0xC811D13F35A3240e0Fcf7D28Ed0A92f617B44752".parse::<Address>()?;
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
