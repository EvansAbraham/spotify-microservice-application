import { Request } from "express";
import TryCatch from "./TryCatch.js";
import getBuffer from "./config/dataUri.js";
import  cloudinary  from 'cloudinary';
import { sql } from "./config/db.js";
import { redisClient } from "./index.js";
import { Song, Album } from "./types/index.js";

interface AuthenticatedRequest extends Request{
    user? :{
        _id: string;
        role: string;
    }
}

export const addAlbum = TryCatch(async(req: AuthenticatedRequest, res)=>{
    console.log("[addAlbum] req.user:", req.user);

    if(req.user?.role != "admin") {
        res.status(401).json({
            message: "Unauthorized Action Perform!"
        });
        return;
    };

    const { title, description } = req.body;
    const file = req.file;

    if(!file) {
        res.status(403).json({
            message: "No file is uploaded!"
        });
        return;
    };

    const fileBuffer = getBuffer(file);

    if(!fileBuffer || !fileBuffer.content) {
        res.status(500).json({
            message: "Failed to generate file buffer!"
        });
        return;
    };

    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content, {
        folder: "albums",
    });

    const result = await sql.query(
        `INSERT INTO albums (title, description, thumbnail) 
         VALUES ($1, $2, $3) 
         RETURNING *`,
        [title, description, cloud.secure_url]
    );

    if (redisClient.isReady) {
        await redisClient.del("albums");
        console.log("Cache invalidated for albums");
      }
    
    const album = result.rows[0] as Album;

    res.json({
        message: "Album Created!",
        album: album
    });

});

export const addSong = TryCatch(async(req: AuthenticatedRequest, res)=>{

    if(req.user?.role != "admin") {
        res.status(401).json({
            message: "Unauthorized Action Perform!"
        });
        return;
    };

    const { title, description, album } = req.body;

    const isAlbum = await sql.query(`SELECT * FROM albums WHERE id=$1`, [album]);

    if(isAlbum.rows.length === 0) {
        res.status(404).json({
            message: "Album not found!"
        });
        return;
    };

    const file = req.file;

    const fileBuffer = getBuffer(file);

    if(!fileBuffer || !fileBuffer.content) {
        res.status(500).json({
            message: "Failed to Generate File Buffer!"
        });
        return;
    };

    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content,{
        folder: "songs",
        resource_type: "video"
    });

    const result = await sql.query(`
        INSERT INTO songs (title, description, audio, album_id)
        VALUES ($1, $2, $3, $4) RETURNING *
        `, [title, description, cloud.secure_url, album]);

        if (redisClient.isReady) {
            await redisClient.del("songs");
            console.log("Cache invalidated for songs");
          }

    const song = result.rows[0] as Song;
    
    res.json({
        message: "Song added successfully!",
        song: song
    });    

});

export const addThumbnail = TryCatch(async(req: AuthenticatedRequest, res)=>{
    if(req.user?.role != "admin") {
        res.status(401).json({
            message: "Unauthorized Action Perform!"
        });
        return;
    };

    const song = await sql.query(`
        SELECT * FROM songs WHERE id = $1
        `, [req.params.id]);

    if(song.rows.length === 0) {
        res.status(404).json({
            message: "Song not found!"
        });
        return;
    };

    const file = req.file;

    if(!file) {
        res.status(400).json({
            message: "No file to upload!"
        });
        return;
    };

    const fileBuffer = getBuffer(file)

    if(!fileBuffer || !fileBuffer.content) {
        res.status(500).json({
            message: "Failed to generate file buffer!"
        });
        return;
    };

    const cloud = await cloudinary.v2.uploader.upload(fileBuffer.content);

    const result = await sql.query(`
        UPDATE songs SET thumbnail = $1 where id = $2 RETURNING *
        `, [cloud.secure_url, req.params.id]);
    
        if (redisClient.isReady) {
            await redisClient.del("songs");
            console.log("Cache invalidated for songs");
          }

    res.status(200).json({
        message: "Thumbnail Updated Successfully!",
        thumbnail: result.rows[0]
    });
});

export const deleteAlbum = TryCatch(async (req: AuthenticatedRequest, res)=>{
    if(req.user?.role != "admin") {
        res.status(401).json({
            message: "Unauthorized Action Perform!"
        });
        return;
    };
    
    const {id} = req.params;
    const isAlbum = await sql.query(`SELECT * FROM albums WHERE id=$1`, [id]);

    if(isAlbum.rows.length === 0) {
        res.status(404).json({
            message: "Album not found!"
        });
        return;
    };
    
    await sql.query(`DELETE FROM songs WHERE album_id = $1`,[id]);
    await sql.query(`DELETE FROM albums WHERE id = $1`,[id]);

    if (redisClient.isReady) {
        await redisClient.del("albums");
        console.log("Cache invalidated for albums");
      }
    
      if (redisClient.isReady) {
        await redisClient.del("songs");
        console.log("Cache invalidated for songs");
      }

    res.json({
        message: "Album Deleted Successfully"
    });
});

export const deleteSong = TryCatch(async (req: AuthenticatedRequest, res)=>{
    if(req.user?.role != "admin") {
        res.status(401).json({
            message: "Unauthorized Action Perform!"
        });
        return;
    };

    const {id} = req.params;

    const song = await sql.query(`SELECT * FROM songs WHERE id = $1`,[id]);
    if(song.rows.length === 0 ) {
        res.status(404).json({
            message: "No song was in this id!",
        });
        return;
    };

    await sql.query(`DELETE FROM songs WHERE id=$1`, [id]);

    if (redisClient.isReady) {
        await redisClient.del("songs");
        console.log("Cache invalidated for songs");
      }

    res.json({
        message: "Song was deleted successfully!",
    });
});