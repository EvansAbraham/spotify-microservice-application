import Layout from "../components/Layout"
import Loading from "../components/Loading";
import SongCard from "../components/SongCard";
import AlbumCard from "../components/AlbumCard"
import { useSongData } from "../hooks/useSongData"

const Home = () => {
  const { albums, songs, loading } = useSongData();
  return (
    <div>
      {loading ? ( <Loading/> ) : (
        <Layout>  
          <div className="mb-4 h-max">
            <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
            <div className="flex overflow-auto gap-4">
              {albums.map((album)=> {
                return (
                    <AlbumCard key={album.id} {...album}/>
                  )
                })}
            </div>
          </div>
          <div className="mb-4">
            <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
            <div className="flex overflow-auto gap-4">
              {songs.map((song) => {
                return (
                  <SongCard key={song.id} {...song}/>
                )
              })}
            </div>
          </div>
        </Layout>
      )}
    </div>
  )
}

export default Home