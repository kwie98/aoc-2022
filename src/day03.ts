import { readFileSync } from "fs";

function itemPriority(item: string): number {
    let code = item.charCodeAt(0);
    if (code < 97) {
        code -= 38;
    } else {
        code -= 96;
    }
    // console.log(code);
    return code;
}

function max(array: string[]): string {
    return array.reduce((inc, y) => (inc > y ? inc : y));
}

function sum(array: boolean[]): number {
    return array.map((b) => Number(b)).reduce((acc, y) => acc + y);
}

function mergeSearch(arrays: string[][]): string | null {
    /**
     * From multiple (unsorted) char arrays, find a char that appears in all of them and return it or `null` if there is
     * none. Uses a merge sort approach.
     */
    const sorted = arrays.map((str) => str.sort());
    let indices: number[] = new Array(sorted.length).fill(0);
    while (true) {
        const currentChars = sorted.map((str, i) => str[indices[i]]);
        const biggest = max(currentChars);
        const biggestMask = currentChars.map((c) => c === biggest);
        if (sum(biggestMask) === biggestMask.length) {
            return biggest; // all current chars are equal
        }
        // All indices where chars are lower than the biggest can scoot up a place:
        indices = indices.map((index, i) => index + Number(!biggestMask[i]));
        // If any index runs out of bounds, no shared char can be found:
        if (indices.some((index, i) => index >= sorted[i].length)) {
            return null;
        }
    }
}

const lines = readFileSync("data/day03.txt", "utf8")
    .split("\n")
    .filter((line) => line.length > 0);

const score1 = lines
    .map((line) => {
        const middle = Math.floor(line.length / 2);
        return itemPriority(mergeSearch([[...line.slice(null, middle)], [...line.slice(middle)]]));
    })
    .reduce((a, b) => a + b);

console.log(`Part 1: ${score1}`);

let score2 = 0;
for (let i = 0; i < lines.length; i += 3) {
    // Get sorted lines in batches of 3:
    const batch = lines.slice(i, i + 3).map((s) => [...s]);
    score2 += itemPriority(mergeSearch(batch));
}

console.log(`Part 2: ${score2}`);
