import { Router } from "express";
import {
  shortenUrl,
  getLongUrl,
  getStats,
  deleteShortUrl,
} from "./handlers/url";

const router = Router();

router.post("/shorten", shortenUrl);
router.get("/:shortCode", getLongUrl);
router.get("/:shortCode/stats", getStats);
router.delete("/:shortCode", deleteShortUrl);

export default router;
