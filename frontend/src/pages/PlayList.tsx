import type { Song } from "../types";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import { useEffect, useState } from "react";
import { useSongData } from "../hooks/useSongData"
import { useUserData } from "../hooks/useUserData";
import { FaBookmark, FaPlay } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";

const PlayList = () => {
  const { user, addToPlaylist } = useUserData();
  const { songs, setIsPlaying, setSelectedSong, loading } = useSongData();
  const [myPlaylist, setMyPlaylist] = useState<Song []>([]);

  useEffect(() => {
    if (songs && user?.playlist) {
      const filteredSongs = songs.filter((song) =>
        user.playlist.includes(song.id.toString())
      );
      setMyPlaylist(filteredSongs);
    }
  },[songs, user]);

  return (
    <div>
      <Layout>
        {myPlaylist && (
          <>
            {loading ? (
              <Loading/>
            ) : (
              <>
                <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
                  <MdOutlineFileDownload size={32}/>
                  <div className="flex flex-col">
                    <p>Playlist</p>
                    <h2 className="text-3xl font-bold mb-4 md:text-5xl">
                      {user?.name}'s Playlist
                    </h2>
                    <h4>Your Favorite Songs</h4>
                    <p className="mt-1">
                      <img src="/favicon.svg" alt="Logo" className="inline-block w-6" />
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
                  <p>
                    <b className="mr-4">#</b>
                  </p>
                  <p className="hidden sm:block">Description</p>
                  <p className="text-center">Actions</p>
                </div>
                <hr />
                {myPlaylist && myPlaylist.map((song, index) => (
                  <div
                  className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
                  key={index}
                >
                  <p className="text-white">
                    <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                    {song.thumbnail ? (
                      <img src={song.thumbnail} className="mr-1 w-[70px] p-2 rounded" alt={song.title} />
                      ) : (
                      <MdOutlineFileDownload />
                    )}{" "}
                    {song.title}
                  </p>
                  <p className="text-[15px] hidden sm:block">
                    {song.description.slice(0, 30)}...
                  </p>
                  <p className="flex justify-center items-center gap-5">
                    <button
                      className="text-[15px] text-center"
                      onClick={() => addToPlaylist(song.id)}
                    >
                      <FaBookmark />
                    </button>

                    <button
                      className="text-[15px] text-center"
                      onClick={() => {
                        setSelectedSong(song.id);
                        setIsPlaying(true);
                      }}
                    >
                      <FaPlay />
                    </button>
                  </p>
                </div>
                ))}
              </>
            )}
          </>
        )}
      </Layout>
    </div>
  )
}

export default PlayList