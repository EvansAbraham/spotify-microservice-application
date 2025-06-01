import type { Album } from "../types"
import { useNavigate } from "react-router-dom"

const AlbumCard: React.FC<Album> = ({ id, title, description, thumbnail }) => {
    const navigate = useNavigate();
  return (
    <div onClick={()=> navigate("/album/" + id)} className="min-w-[180px] max-w-fit p-3 rounded cursor-pointer bg-[#121212] hover:bg-[#1A1A1A]">
        <img src={thumbnail} alt="thumbnail" className="rounded w-[160px]" />
        <p className="font-bold mt-2 mb-1">{title.slice(0, 12)}...</p>
        <p className="text-slate-200 text-sm">{description.slice(0, 12)}...</p>
    </div>
  )
}

export default AlbumCard