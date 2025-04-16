import { Request, Response } from "express";
import { generateShortId, isValidUrlFormat } from "../modules/url-helpers";
import { client } from "../config/db";

const shortenUrl = async (req: Request, res: Response) => {
  const { long_url } = req.body;

  if (!long_url) {
    res.status(400);
    throw new Error("long_url not present");
  }

  if (!isValidUrlFormat(long_url)) {
    res.status(400);
    throw new Error("Invalid Url format");
  }

  const urlExists = await client.query(
    "SELECT DISTINCT short_code,original_url FROM URL WHERE original_url=$1",
    [long_url],
  );

  if (urlExists.rows.length > 0) {
    res.status(200).send(urlExists.rows[0]);
    return;
  }

  // Generate shortId
  const short_code = generateShortId();

  const newUrl = await client.query(
    "INSERT INTO URL(original_url, short_code) VALUES ($1, $2) RETURNING *",
    [long_url, short_code],
  );

  res.status(201).send(newUrl.rows[0]);
};

const getLongUrl = async (req: Request, res: Response) => {
  const { shortCode } = req.params;
  const urlExists = await client.query(
    "SELECT * FROM URL WHERE short_code=$1",
    [shortCode],
  );

  if (urlExists.rows.length == 0) {
    res.status(400);
    throw new Error("Short url does not exist!");
  }

  await client.query("UPDATE URL SET clicks = clicks + 1 WHERE short_code=$1", [
    shortCode,
  ]);
  res.status(302).redirect(urlExists.rows[0].original_url);
  res.send("Shorten URL");
};

const getStats = async (req: Request, res: Response) => {
  const { shortCode } = req.params;

  const urlExists = await client.query(
    "SELECT clicks FROM URL WHERE short_code=$1",
    [shortCode],
  );

  if (urlExists.rows.length == 0) {
    res.status(400);
    throw new Error("Short url does not exist!");
  }

  res.status(200).json(urlExists.rows[0]);
};

const deleteShortUrl = async (req: Request, res: Response) => {
  const { shortCode } = req.params;

  const urlExists = await client.query(
    "SELECT clicks FROM URL WHERE short_code=$1",
    [shortCode],
  );

  if (urlExists.rows.length == 0) {
    res.status(400);
    throw new Error("Short url does not exist!");
  }

  await client.query("DELETE FROM URL WHERE short_code=$1", [shortCode]);

  res.status(204).json({ message: "Url Deleted!" });
};

export { shortenUrl, getLongUrl, getStats, deleteShortUrl };
