import { readFileSync } from "fs";

// For each elf, its numbers are split by \n.
const elves = readFileSync("data/day01.txt", "utf8").split("\n\n");
const nums = elves.map((elf) => {
    return elf
        .split("\n")
        .map((line) => parseInt(line)) // WARNING: No error handling!
        .reduce((a, b) => a + b);
});
// Sort in descending order:
const sorted = nums.sort((l, r) => r - l);

console.log(`Part 1: ${sorted[0]}`);
console.log(`Part 2: ${sorted.slice(0, 3).reduce((a, b) => a + b)}`);
