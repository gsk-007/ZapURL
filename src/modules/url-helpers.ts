import * as nanoid from "nanoid";

export function isValidUrlFormat(url: string): boolean {
  try {
    new URL(url); // Will throw an error if the format is invalid
    return true;
  } catch (error) {
    return false;
  }
}

export async function isUrlBroken(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return !res.ok;
  } catch (error) {
    return true;
  }
}

export function generateShortId(length: number = 7) {
  return nanoid.nanoid(length);
}
