import { FaMusic } from "react-icons/fa";

const PlaylistCard = () => {
  return (
    <div className="flex items-center p-4 rounded-lg shadow-md cursor-pointer hover:bg-[#ffffff26] mx-2">
        <div className="w-10 h-10 bg-gray-900 flex items-center justify-center rounded-md">
            <FaMusic className="text-xl"/>
        </div>
        <div className="ml-4">
            <h2>My Playlist</h2>
            <p className="text-sm">Playlist · <span>{"User"}</span></p>
        </div>
    </div>
  )
}

export default PlaylistCard