mod day04;
mod solution;

use std::env;
use std::fs;
use std::panic;

use solution::Solution;

fn main() {
    let usage = "Usage: cargo run <day>";
    let day: usize = env::args()
        .nth(1)
        .unwrap_or_else(|| panic!("{}", usage))
        .parse()
        .unwrap_or_else(|_| panic!("{}", usage));
    let input =
        fs::read_to_string(format!("data/day{:02}.txt", day)).expect("Could not read input");
    let solution = match day {
        4 => Some(day04::Day04 {}),
        _ => None,
    }
    .unwrap_or_else(|| panic!("Day {} is not implemented", day));

    println!("Day {}, part 1: {}", day, solution.part_1(&input));
    println!("Day {}, part 2: {}", day, solution.part_2(&input));
}
