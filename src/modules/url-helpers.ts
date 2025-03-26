import * as nanoid from "nanoid";

export function isValidUrlFormat(url: string): boolean {
  try {
    new URL(url); // Will throw an error if the format is invalid
    return true;
  } catch (error) {
    return false;
  }
}

export function generateShortId(length: number=7){
  return nanoid.nanoid(length)
}
