use crate::solution::Solution;
use itertools::Itertools;

pub struct Day04 {}

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

impl Solution for Day04 {
    fn part_1(&self, input: &str) -> String {
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

    fn part_2(&self, input: &str) -> String {
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
}
