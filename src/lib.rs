use std::{ fs::{self, OpenOptions}, io::{self, BufRead, Write}};
use accumulator::{group::Rsa2048, Witness};
use accumulator::Accumulator;
use std::fs::File;
use std::io::{BufReader};
use dotenv::dotenv;
use ethers::prelude::*;
use ethers::abi::Abi;
use serde_json::{self};
use std::{env, sync::Arc};


pub fn add_names_to_accumulator<'a>(acc: &mut Accumulator<Rsa2048, &'a str>, names: &'a Vec<String>) {
    for i in names.iter() {
        let name_str: &str = i.as_str();
        *acc = acc.clone().add(&[name_str]);
    }
}

pub fn retrieve_names() -> Vec<String> {
    let file: File = File::open("./src/names.txt").unwrap();
    let reader: BufReader<File> = BufReader::new(file);

    let mut names: Vec<String> = Vec::new();

    for (index, line) in reader.lines().enumerate() {
        let line: String = line.unwrap();
        let test: String = format!("{}:{}", line, index);
        names.push(test);
    }
    names
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

    let abi_json: String = fs::read_to_string("../abi.json")?;
    let abi: Abi = serde_json::from_str(&abi_json)?;
    let contract = Contract::new(vrf_contract, abi, Arc::new(client));

    let request_vrf = contract.method::<_, H256>("requestRandomWords", commitment)?;

    let pending_tx: PendingTransaction<'_, _> = request_vrf.send().await?;
    let receipt: Option<TransactionReceipt> = pending_tx.confirmations(3).await?;
    println!("VRF Request sent successfully: {:?}", receipt);

    Ok(())
}

// The Add functionality: Adds a username to the file
pub fn add(name: &str) -> Result<String, io::Error> {
    let mut file = OpenOptions::new()
        .write(true)
        .append(true)
        .create(true)
        .open("names.txt")?;
    
    writeln!(file, "{}", name)?;
    Ok(format!("Added {} successfully", name))
}

// The Validate functionality: Placeholder, you can define the actual logic
pub fn validate() -> Result<String, io::Error> {
    // Define your logic for validating
    let mut witness: Witness<Rsa2048, &str> = Witness(Accumulator::empty());
    let names = retrieve_names();
    let names_str_slice: Vec<&str> = names.iter().map(|s: &String| s.as_str()).collect();
    witness = witness
        .compute_subset_witness(&names_str_slice, &[&names[0]])
        .unwrap();
    Ok("Validate action executed successfully".to_string())
}

