import  axios  from 'axios';
import type { Song, Album } from "../types";
import { SongContext } from "../context/SongContext";
import { useCallback, useEffect, useState, type ReactNode } from "react";

const server = import.meta.env.VITE_SONG_API;
  
interface SongProviderProps {
  children: ReactNode;
}

export const SongProvider: React.FC<SongProviderProps> = ({ children }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [albums, setAlbums] = useState<Album[]>([]);


  const fetchSongs = useCallback(async()=>{
    setLoading(true);
    try {
      const { data } = await axios.get<Song[]>(`${server}/api/v1/songs/all`);
      setSongs(data);
      if (data.length > 0) setSelectedSong(data[0].id.toString());
      setIsPlaying(false);
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const [song, setSong] = useState<Song | null>(null);
  
  const fetchSingleSong = useCallback(async()=>{
    if (!selectedSong) return;
    try {
      const { data } = await axios.get<Song>(`${server}/api/v1/song/${selectedSong}`);
      setSong(data);
    } catch (error) {
      console.error(error);
    }
  }, [selectedSong]);

  const fetchAlbums = useCallback(async()=>{
    setLoading(true);
    try{
      const { data } = await axios.get<Album[]>(`${server}/api/v1/albums/all`);
      setAlbums(data);
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const [index, setIndex] = useState(0);
  const hasNextSong = songs.length > 0 && index < songs.length - 1;
  const hasPrevSong = songs.length > 0 && index > 0;

  const nextSong = useCallback(()=>{
    if (!hasNextSong) return;
    if (songs.length === 0) return;
    const nextIndex = index === songs.length - 1 ? 0 : index + 1;
    setIndex(nextIndex);
    setSelectedSong(songs[nextIndex].id);
  }, [index, songs, hasNextSong, setSelectedSong]);

  const prevSong = useCallback(() => {
    if (!hasPrevSong) return;
    if (songs.length === 0) return;
    const prevIndex = index === 0 ? songs.length - 1 : index - 1;
    setIndex(prevIndex);
    setSelectedSong(songs[prevIndex].id);
  }, [index, songs, hasPrevSong, setSelectedSong]);

  const [albumSong, setAlbumSong] = useState<Song[]>([]);
  const [albumData, setAlbumData] = useState<Album | null>(null);

  const fetchAlbumSongs = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const { data } = await axios.get<{ songs: Song[]; albums: Album }>(`${server}/api/v1/album/${id}`);
      setAlbumData(data.albums);
      setAlbumSong(data.songs);
    } catch(error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSongs();
    fetchAlbums();
  }, [fetchAlbums, fetchSongs]);

  return (
    <SongContext.Provider
    value={{
      songs,
      selectedSong,
      setSelectedSong,
      isPlaying,
      setIsPlaying,
      loading,
      albums,
      fetchSingleSong,
      song,
      nextSong,
      prevSong,
      fetchAlbumSongs,
      albumData,
      albumSong,
      fetchSongs,
      fetchAlbums,
      hasNextSong,
      hasPrevSong,
    }}
    >{children}</SongContext.Provider>
  );
} 
