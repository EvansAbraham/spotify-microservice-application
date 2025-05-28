import { createContext, useContext, useEffect, useState } from "react";

const server = import.meta.env.VITE_SONG_API;

export interface Song {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  audio: string;
  album: string;
}

export interface Album {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

interface SongContextType {
  songs: Song[];
  song: Song | null;
  isPlaying: boolean;
  setIsPlaying: (value: boolean) => void;
  loading: boolean;
  selectedSong: string | null;
  setSelectedSong: (id: string) => void;
  albums: Album[];
  fetchSingleSong: () => Promise<void>;
  nextSong: () => void;
  prevSong: () => void;
  albumSong: Song[];
  albumData: Album | null;
  fetchAlbumSongs: (id: string) => Promise<void>;
  fetchSongs: () => Promise<void>;
  fetchAlbums: () => Promise<void>;
}

const SongContext = () => {
  
  return (
    <div>SongContext</div>
  )
}

export default SongContext