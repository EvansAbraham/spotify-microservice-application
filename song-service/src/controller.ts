import { sql } from "./config/db.js";
import TryCatch from "./TryCatch.js";

interface Album {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
}

export const getAllAlbum = TryCatch(async(req, res)=> {
    let albums;

    albums = await sql.query(`SELECT * FROM albums`);

    res.json(albums.rows);
});

export const getAllSongs = TryCatch(async(req, res)=>{
    let songs;

    songs = await sql.query(`SELECT * FROM songs`);

    res.json(songs.rows);

});

export const getAllSongsofAlbum = TryCatch(async(req, res)=>{

    const { id } = req.params;

    let albums, songs;

    albums = await sql.query(`SELECT * FROM albums WHERE id=$1`,[id]);

    if (albums.rows.length === 0) {
        res.status(404).json({
            message: "Album not found!"
        });
        return;
    };

    songs = await sql.query(`SELECT * FROM songs WHERE album_id=$1`,[id]);

    const response = { songs: songs.rows, albums: albums.rows[0] as Album };

    res.json(response);
});

export const getSingleSong = TryCatch(async(req, res)=>{
    const song = await sql.query(`SELECT * FROM songs WHERE id=$1`, [req.params.id]);
    if (song.rows.length === 0) {
        res.status(404).json({
            message: "Song not found!"
        });
        return;
    };
    res.json(song.rows[0]);
});