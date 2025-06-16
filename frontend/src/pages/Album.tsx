import { useEffect } from "react";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import { useParams } from "react-router-dom";
import { useSongData } from "../hooks/useSongData";
import { useUserData } from "../hooks/useUserData";
import { FaBookmark, FaPlay } from "react-icons/fa";
import { MdOutlineDownloadForOffline } from "react-icons/md";

const Album = () => {
  
  const {
    loading,
    albumSong,
    albumData,
    setIsPlaying,
    fetchAlbumSongs,
    setSelectedSong
  } = useSongData();

  const { isAuth, addToPlaylist } = useUserData();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchAlbumSongs(id);
    }
  }, [fetchAlbumSongs, id]);

  return (
    <div>
      <Layout>
        {albumData && (
          <>
          {loading ? (
            <Loading/>
          ) : (
            <>
            <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-center">
                  {albumData.thumbnail && (
                    <img
                      src={albumData.thumbnail}
                      className="w-48 rounded"
                      alt="thumbnail" />
                  )}
                  <div className="flex flex-col">
                    <p>Playlist</p>
                    <h2 className="text-3xl font-bold mb-4 md:text-5xl">
                      {albumData.title} Playlist
                    </h2>
                    <h4>{albumData.description}</h4>
                    <p className="mt-1">
                      <img src="/favicon.svg" alt="logo" className="inline-block w-6" />
                    </p>
                  </div>
                </div><div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
                    <p><b className="mr-4"># Songs</b></p>
                    <p className="hidden sm:block">Description</p>
                    <p className="text-center">Actions</p>
                  </div>
                  <hr />
            {albumSong && albumSong.map((song, index) => {
              return (
                <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer" key={index}>
                  <p>
                  <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                  {song.thumbnail ? (
                    <img src={song.thumbnail} alt="thumbnail" className="inline w-10 mr-5"/>
                  ) : (
                    <MdOutlineDownloadForOffline className="text-2xl"/>
                  )}
                  {" "}
                  {song.title.slice(0, 30)}
                  </p>
                  <p className="text-[15px] hidden sm:block">
                    {song.description.slice(0, 30)}...
                  </p>
                  <p className="flex justify-center items-center gap-5">
                    {isAuth && (
                      <button
                      className="text-[15px] text-center"
                      onClick={() => addToPlaylist(song.id)}
                      >
                        <FaBookmark />
                      </button>
                    )}
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
              );
            })}
            </>
          )}
          </>
        )}
      </Layout>
    </div>
  )
}

export default Album