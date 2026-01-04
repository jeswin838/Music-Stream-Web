import express from "express";
import { uploadSongFiles } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/upload", uploadSongFiles);

export default router;
