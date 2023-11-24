import { readFileSync } from "fs";

// part1: input => outcome + shapeScore1 = roundScore
// A X => D + 1 = 4
// A Y => W + 2 = 8
// A Z => L + 3 = 3
// B X => L + 1 = 1
// B Y => D + 2 = 5
// B Z => W + 3 = 9
// C X => W + 1 = 7
// C Y => L + 2 = 2
// C Z => D + 3 = 6

// part2: input | parseRounds(input) => outcome + shapeScore2
// B X | 1 0 => L + 1
// C X | 2 0 => L + 2
// A X | 0 0 => L + 3
// A Y | 0 1 => D + 1
// B Y | 1 1 => D + 2
// C Y | 2 1 => D + 3
// C Z | 2 2 => W + 1
// A Z | 0 2 => W + 2
// B Z | 1 2 => W + 3

function parseRounds(rounds: string): [number, number][] {
    // Convert letters to numbers
    const CHAR_TO_SHAPE = {
        A: 0,
        B: 1,
        C: 2,
        X: 0,
        Y: 1,
        Z: 2,
    };
    return rounds
        .split("\n")
        .filter((round) => round.length === 3)
        .map((round) => [CHAR_TO_SHAPE[round[0]], CHAR_TO_SHAPE[round[2]]]);
}

function shapeScore1(me: number): number {
    return me + 1;
}

function outcomeScore1(opponent: number, me: number): number {
    if (opponent === me) {
        return 3;
    } else if ((opponent + 1) % 3 === me) {
        return 6;
    }
    return 0;
}

function shapeScore2(opponent: number, outcome: number): number {
    // Figure out my shape depending on what opponent plays and what the outcome is:
    if (outcome === 0) {
        // Lose
        return opponent === 0 ? 3 : opponent;
    }
    if (outcome === 1) {
        // Draw
        return opponent + 1;
    } else {
        // Win
        return opponent + 2 > 3 ? (opponent + 2) % 3 : opponent + 2;
    }
}

function outcomeScore2(outcome: number): number {
    return outcome * 3;
}

const rounds = parseRounds(readFileSync("data/day02.txt", "utf8"));
const score1 = rounds
    .map(([opponent, me]) => {
        return shapeScore1(me) + outcomeScore1(opponent, me);
    })
    .reduce((a, b) => a + b);
console.log(`Part 1: ${score1}`);

const score2 = rounds
    .map(([opponent, outcome]) => {
        return shapeScore2(opponent, outcome) + outcomeScore2(outcome);
    })
    .reduce((a, b) => a + b);
console.log(`Part 2: ${score2}`);
