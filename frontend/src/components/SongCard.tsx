import type { Song } from "../types";
import { FaBookmark, FaPlay } from "react-icons/fa";
import { useSongData } from "../hooks/useSongData";
import { useUserData } from "../hooks/useUserData";
import { MdOutlineFileDownload } from "react-icons/md";

type SongCardProps = Pick<Song, "id" | "title" | "description" | "thumbnail">;

const SongCard: React.FC<SongCardProps> = ({ id, title, description, thumbnail }) => {

    const { addToPlaylist, isAuth } = useUserData();
    const { setSelectedSong, setIsPlaying } = useSongData();

    const saveToPlayListHandler = () => {
        addToPlaylist(id);
    };

  return (
    <div className="min-w-[180px] p-3 rounded cursor-pointer bg-[#121212] hover:bg-[#1A1A1A]">
      <div className="relative group">
        {thumbnail ? (
            <img src={thumbnail} className="mr-1 w-[160px] rounded" alt={title} />
            ) : (
            <MdOutlineFileDownload />
        )}
        <div className="flex gap-2">
            <button className="absolute bottom-2 right-14 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer" onClick={()=>{
                setSelectedSong(id);
                setIsPlaying(true);
            }}>
                <FaPlay/>
            </button>
            {isAuth && (
              <button className="absolute bottom-2 right-2 bg-green-500 text-black p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={saveToPlayListHandler}>
                <FaBookmark/>
              </button>
            )}
        </div>
      </div>
      <p className="font-bold mt-2 mb-1">{title}</p>
      <p className="text-slate-200 text-sm">{description.slice(0, 12)}...</p>
    </div>
  )
}

export default SongCard
