import express from "express";
import { getAllAlbum, getAllSongs, getAllSongsOfAlbum, getSingleSong } from "./controller.js";

const router = express.Router();

router.get("/albums/all", getAllAlbum);
router.get("/songs/all", getAllSongs);
router.get("/album/:id", getAllSongsOfAlbum);
router.get("/song/:id", getSingleSong);

export default router;