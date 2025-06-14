import { useEffect } from "react";
import SongForm from "../components/SongForm";
import SongList from "../components/SongList";
import AlbumForm from "../components/AlbumForm";
import AlbumList from "../components/AlbumList";
import { useUserData } from "../hooks/useUserData";
import { Link, useNavigate } from "react-router-dom";

const Admin = () => {

  const navigate = useNavigate();
  const { user } = useUserData();

  useEffect(() => {
    if (user && user.role !== "admin") navigate("/");
  }, [user, navigate]);
  return (
    <div className="min-h-screen p-8">
      <Link to={"/"} className="bg-green-500 text-white font-bold py-2 px-4 rounded-full" >
        Go to home page
      </Link>
      <AlbumForm/>
      <SongForm/>
      <AlbumList/>
      <SongList/>
    </div>
  )
}

export default Admin
