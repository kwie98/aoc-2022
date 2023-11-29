use std::fs;

use itertools::Itertools;

fn main() {
    let day = 4;
    let input = fs::read_to_string(format!("data/day{:02}.txt", day)).unwrap();
    println!("Day {}, part 1: {}", day, part_1(&input));
    println!("Day {}, part 2: {}", day, part_2(&input));
}

fn parse_line(line: &str) -> (usize, usize, usize, usize) {
    return line
        .split(&['-', ','])
        .map(|s| {
            s.parse()
                .unwrap_or_else(|_| panic!("Expected number, got {}", s))
        })
        .collect_tuple()
        .unwrap_or_else(|| panic!("Expected four numbers, got {}", line));
}

fn part_1(input: &str) -> String {
    let score: usize = input
        .lines()
        .map(|line| {
            let (first_lo, first_hi, second_lo, second_hi) = parse_line(line);
            if (first_lo <= second_lo && first_hi >= second_hi)
                || (second_lo <= first_lo && second_hi >= first_hi)
            {
                return 1;
            };
            return 0;
        })
        .sum();
    return score.to_string();
}

fn part_2(input: &String) -> String {
    let score: usize = input
        .lines()
        .map(|line| {
            let (first_lo, first_hi, second_lo, second_hi) = parse_line(line);
            if first_hi < second_lo || second_hi < first_lo {
                return 0;
            };
            return 1;
        })
        .sum();
    return score.to_string();
}
