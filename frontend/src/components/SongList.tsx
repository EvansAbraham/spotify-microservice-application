import Button from "./Button";
import { MdDelete } from "react-icons/md";
import { useSongData } from "../hooks/useSongData";
import { useAdminActions } from "../hooks/useAdminActions";

const SongList = () => {
  const { btnLoading, deleteSong, fileChangeHandler, addThumbnailHandler } = useAdminActions();
  const { songs } = useSongData();
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Songs Added</h3>
      <div className="flex justify-center md:justify-start gap-2 items-center flex-wrap">
        {songs.map((e, i) => (
          <div className="bg-[#181818] p-4 rounded-lg shadow-md" key={i}>
            {e.thumbnail ? (
              <img src={e.thumbnail} className="mr-1 w-52 h-52" alt="thumbnail" />
            ): (
              <div className="flex flex-col justify-center items-center gap-2 w-[250px]">
                    <input type="file" onChange={fileChangeHandler} />
                    <Button
                      style={{ width: "200px" }}
                      disabled={btnLoading}
                      onClick={() => addThumbnailHandler(e.id)}
                    >
                      {btnLoading ? "Please Wait..." : "Add Thumbnail"}
                    </Button>
                  </div>
            )}
            <h4 className="text-lg font-bold">{e.title.slice(0, 30)}</h4>
                <h4 className="text-lg font-bold">
                  {e.description.slice(0, 20)}..
                </h4>
                <Button
                  disabled={btnLoading}
                  className="px-3 py-1 text-red-500 rounded"
                  onClick={() => deleteSong(e.id)}
                >
                  <MdDelete />
                </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SongList
