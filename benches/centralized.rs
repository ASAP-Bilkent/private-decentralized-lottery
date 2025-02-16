use criterion::{criterion_group, criterion_main, Criterion};
use private_decentralized_lottery::{add_name, AppState};
use std::sync::{Arc, Mutex};
use actix_web::web;

pub fn benchmark_add_name(c: &mut Criterion) {
    // Create a mock AppState
    let app_state = Arc::new(Mutex::new(AppState::new()));

    // Create a sample input name
    let test_name = serde_json::to_string("Alice").unwrap();

    c.bench_function("add_name", |b| {
        b.iter(|| {
            // Lock the AppState and call the add_name function
            let mut state = app_state.lock().unwrap();
            add_name(web::Json(test_name.clone()), state);
        });
    });
}

criterion_group!(benches, benchmark_add_name);
criterion_main!(benches);
