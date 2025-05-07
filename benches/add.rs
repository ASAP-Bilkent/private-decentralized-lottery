use criterion::{criterion_group, criterion_main, Criterion};
use private_decentralized_lottery::add_name;
use accumulator::group::Rsa2048;
use accumulator::Accumulator;

pub fn benchmark_add_name(c: &mut Criterion) {
    
    let mut accumulator = Accumulator::<Rsa2048, String>::empty();
    let test_name = serde_json::to_string("Alice").unwrap();

    c.bench_function("add_name", |b| {
        b.iter(|| {
            // Lock the AppState and call the add_name function
            add_name(&mut accumulator, test_name.clone());
        });
    });
}

pub fn benchmark_add_name_with_50(c: &mut Criterion) {
    let mut accumulator = Accumulator::<Rsa2048, String>::empty();

    // Initialize the accumulator with 50 names
    for i in 0..50 {
        let name = serde_json::to_string(&format!("Name{}", i)).unwrap();
        add_name(&mut accumulator, name);
    }

    let test_name = serde_json::to_string("Alice").unwrap();

    c.bench_function("add_name_with_50", |b| {
        b.iter(|| {
            add_name(&mut accumulator, test_name.clone());
        });
    });
}

pub fn benchmark_add_name_with_1000(c: &mut Criterion) {
    let mut accumulator = Accumulator::<Rsa2048, String>::empty();

    // Initialize the accumulator with 1000 names
    for i in 0..1000 {
        let name = serde_json::to_string(&format!("Name{}", i)).unwrap();
        add_name(&mut accumulator, name);
    }

    let test_name = serde_json::to_string("Alice").unwrap();

    c.bench_function("add_name_with_1000", |b| {
        b.iter(|| {
            add_name(&mut accumulator, test_name.clone());
        });
    });
}

criterion_group!(
    benches,
    benchmark_add_name,
    benchmark_add_name_with_50,
    benchmark_add_name_with_1000,
);
criterion_main!(benches);

