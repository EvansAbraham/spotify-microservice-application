import Button from "./Button";
import { useAdminActions } from "../hooks/useAdminActions"

const AlbumForm = () => {
    const { 
        title,
        setTitle,
        description,
        setDescription,
        btnLoading,
        addAlbumHandler,
        fileChangeHandler } = useAdminActions();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 mt-6">Add Album</h2>
      <form className="bg-[#181818] p-6 rounded-lg shadow-lg flex flex-col items-center justify-center gap-4" onSubmit={addAlbumHandler}>
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
        <input
          type="file"
          placeholder="Choose Thumbnail"
          onChange={fileChangeHandler}
          className="auth-input"
          accept="image/*"
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

export default AlbumForm
