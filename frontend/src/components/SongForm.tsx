import Button from "./Button";
import { useSongData } from "../hooks/useSongData";
import { useAdminActions } from "../hooks/useAdminActions"

const SongForm = () => {
  
  const {
    title,
    setTitle,
    description,
    setDescription,
    album,
    setAlbum,
    btnLoading,
    addSongHandler,
    fileChangeHandler
  } = useAdminActions();
    
    const { albums } = useSongData();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 mt-6">Add Song</h2>
      <form className="bg-[#181818] p-6 rounded-lg shadow-lg flex flex-col items-center justify-center gap-4" onSubmit={addSongHandler}>
      <input
          type="text"
          placeholder="Title"
          className="auth-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          className="auth-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select
          className="auth-input"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          required
        >
          <option value="">Choose Album</option>
          {albums?.map((e, i) => (
              <option value={e.id} key={i}>
                {e.title}
              </option>
          ))}
        </select>
        <input
          type="file"
          placeholder="Choose audio"
          onChange={fileChangeHandler}
          className="auth-input"
          accept="audio/*"
          required
        />
        <Button
          style={{ width: "100px" }}
          disabled={btnLoading}
        >
          {btnLoading ? "Please Wait..." : "Add"}
        </Button>
      </form>
    </div>
  )
}

export default SongForm
