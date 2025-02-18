import { Main } from "./lib/main.js";

function parse(input: string): string {
  return input;
}

function p1(directions: string): number {
  let floor = 0;
  for (const character of directions) {
    switch (character) {
      case "(":
        floor += 1;
        break;
      case ")":
        floor -= 1;
        break;
    }
  }

  return floor;
}

function p2(directions: string): number {
  let floor = 0;
  let position = 0;
  for (const character of directions) {
    position += 1;

    switch (character) {
      case "(":
        floor += 1;
        break;
      case ")":
        floor -= 1;
        break;
    }

    if (floor === -1) {
      break;
    }
  }

  return position;
}

await Main(import.meta.url, parse, p1, p2);
