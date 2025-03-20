import {Request,Response} from "express"

const shortenUrl = (req:Request, res: Response) => {
  res.send('Shorten URL')
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
