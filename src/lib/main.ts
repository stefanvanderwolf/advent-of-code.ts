import { readFile } from "node:fs/promises";
import path from "node:path";

/**
  * Call the `fn` right away when the current file is the main file.
  */
export async function Main<Parsed, Output>(
  callee: string,
  parse: (input: string) => Parsed,
  p1: (input: Parsed) => Output,
  p2: (input: Parsed) => Output,
): Promise<void> {
  // Coming in from calling `node main.js`. The argument will be the full path.
  const main = process.argv[1];
  // Remove any protocol like file://.
  const file = new URL(callee).pathname;

  if (main === file) {
    const name = path.basename(file, ".js");
    console.time(name);
    const input = await read(name);
    console.timeLog(name, `input read`)
    const parsed = parse(input)
    console.timeLog(name, `input parsed`)
    const n1 = p1(parsed);
    console.timeLog(name, `p1 ${String(n1)}`);
    const n2 = p2(parsed);
    console.timeLog(name, `p2 ${String(n2)}`);
    console.timeEnd(name);
  }
}

async function read(name: string): Promise<string> {
  const filename = path.join(import.meta.dirname, `../../input/${name}`);
  const input = await readFile(filename, "utf8");
  return input;
}
