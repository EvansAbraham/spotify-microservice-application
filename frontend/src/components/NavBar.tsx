import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom"
import Button from "./Button";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full flex justify-between items-center font-medium">
        <div className="flex items-center gap-2">
          <MdKeyboardArrowLeft className="text-3xl bg-black rounded-full cursor-pointer" onClick={()=> navigate(-1)}/>
          <MdKeyboardArrowRight className="text-3xl bg-black rounded-full cursor-pointer" onClick={()=> navigate(+1)}/>
        </div>
        <div className="flex items-center gap-2">
          <Button className="hidden md:block">Explore Premium</Button>
          <Button className="hidden md:block">Install App</Button>
          <Button className="hidden md:block">Logout</Button>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Button>All</Button>
        <Button className="hidden md:block">Music</Button>
        <Button className="hidden md:block">Podcast</Button>
        <Button className="md:hidden" to="/playlist">Playlist</Button>
      </div>
    </>
  )
}

export default NavBar