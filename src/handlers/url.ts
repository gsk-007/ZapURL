import {Request,Response} from "express"
import { generateShortId, isValidUrlFormat } from "../modules/url-helpers"
import { client } from "../config/db"

const shortenUrl = async (req:Request, res: Response) => {
  const {long_url} = req.body

  if(!long_url){
    res.status(400)
    throw new Error('long_url not present')
  }

  if(!isValidUrlFormat(long_url)){
    res.status(400)
    throw new Error('Invalid Url format')
  }

  // Generate shortId
  const short_code = generateShortId()

  const newUrl = await client.query('INSERT INTO URL(original_url, short_code) VALUES ($1, $2) RETURNING *',[long_url, short_code])

  res.status(201).send(newUrl.rows[0])
}

const getLongUrl = (req:Request, res: Response) => {
  res.send('Shorten URL')
}

const getStats = (req:Request, res: Response) => {
  res.send('Shorten URL')
}

const deleteShortUrl = (req:Request, res: Response) => {
  res.send('Shorten URL')
}

export {shortenUrl, getLongUrl, getStats, deleteShortUrl }
