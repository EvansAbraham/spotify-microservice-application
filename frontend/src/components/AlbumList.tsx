import { MdDelete } from "react-icons/md";
import { useSongData } from "../hooks/useSongData";
import { useAdminActions } from "../hooks/useAdminActions";
import Button from "./Button";

const AlbumList = () => {
  const { btnLoading, deleteAlbum } = useAdminActions();
  const { albums } = useSongData();
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Albums Added</h3>
      <div className="flex justify-center md:justify-start gap-2 items-center flex-wrap">
        {albums.map((e, i) => (
          <div className="bg-[#181818] p-4 rounded-lg shadow-md" key={i}>
          <img src={e.thumbnail} className="mr-1 w-52 h-52" alt={e.title.slice(0, 30)} />
          <h4 className="text-lg font-bold">{e.title.slice(0, 30)}</h4>
          <h4 className="text-lg font-bold">
            {e.description.slice(0, 20)}..
          </h4>
          <Button
            disabled={btnLoading}
            className="px-3 py-1 text-red-500 rounded"
            onClick={() => deleteAlbum(e.id)}
          >
            <MdDelete />
          </Button>
        </div>
        ))}
      </div>
      
    </div>
  )
}

export default AlbumList
