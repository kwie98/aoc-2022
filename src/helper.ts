import { Option, none, some } from "fp-ts/lib/Option.js";

export function toInt(str: string): Option<number> {
    const num = parseInt(str);
    if (isNaN(num)) return none;
    else return some(num);
}
