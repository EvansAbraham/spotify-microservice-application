import { sql } from "./config/db.js";
import TryCatch from "./TryCatch.js";
import { Album } from "./types/index.js";
import { redisClient } from './index.js';

export const getAllAlbum = TryCatch(async(req, res)=> {
    let albums;

    const CACHE_EXPIRE = 1800;

    if (redisClient.isReady) {
        albums = await redisClient.get("albums");
    };

    if (albums) {
        console.log("Cache Hit!");
        res.json(JSON.parse(albums));
        return;
    } else {
        console.log("Cache miss!");
        albums = await sql.query(`SELECT * FROM albums`);
    
        if(redisClient.isReady) {
            await redisClient.set("albums", JSON.stringify(albums.rows), {
                EX: CACHE_EXPIRE,
            });
        };

        res.json(albums.rows);
        return;
    };

});

export const getAllSongs = TryCatch(async(req, res)=>{
    let songs;

    const CACHE_EXPIRE = 1800;

    if (redisClient.isReady) {
        songs = await redisClient.get("songs");
    };

    if (songs) {
        console.log("Cache Hit!");
        res.json(JSON.parse(songs));
        return;
    } else {
        console.log("Cache miss!");
        songs = await sql.query(`SELECT * FROM songs`);
    
        if(redisClient.isReady) {
            await redisClient.set("songs", JSON.stringify(songs.rows), {
                EX: CACHE_EXPIRE,
            });
        };

        res.json(songs.rows);
        return;
    };

});

export const getAllSongsOfAlbum = TryCatch(async(req, res)=>{

    const { id } = req.params;
    const CACHE_EXPIRY = 1800;

    let albums, songs;

    if (redisClient.isReady) {
        const cacheData = await redisClient.get(`album_songs_${id}`);
        if (cacheData) {
            console.log("Cache Hit!");
            res.json(JSON.parse(cacheData));
            return;
        }
    }

    albums = await sql.query(`SELECT * FROM albums WHERE id=$1`,[id]);

    if (albums.rows.length === 0) {
        res.status(404).json({
            message: "Album not found!"
        });
        return;
    };

    songs = await sql.query(`SELECT * FROM songs WHERE album_id=$1`,[id]);

    const response = { songs: songs.rows, albums: albums.rows[0] as Album };

    if (redisClient.isReady) {
        await redisClient.set(`album_songs_${id}`, JSON.stringify(response), {
          EX: CACHE_EXPIRY,
        });
      }
    console.log("cache miss");
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