import { createContext } from "react";
import type { Song, Album } from "../types";
export interface SongContextType {
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
    hasNextSong: boolean,
    hasPrevSong: boolean,
  }
  
  export const SongContext = createContext<SongContextType | undefined>(undefined); 