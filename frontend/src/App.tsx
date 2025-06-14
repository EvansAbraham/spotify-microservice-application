import Home from "./pages/Home";
import Album from "./pages/Album";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PlayList from "./pages/PlayList";
import Loading from "./components/Loading";
import { useUserData } from "./hooks/useUserData";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const { isAuth, user, loading } = useUserData();
  return (
  <>
      {loading ? (
        <Loading/>
      ) : (
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/album/:id" element={<Album/>}/>
                <Route path="/login" element={isAuth ? <Home/> : <Login/>}/>
                <Route path="/register" element={isAuth ? <Home/> : <Register/>}/>
                <Route path="/playlist" element={isAuth ? <PlayList/> : <Login/>}/>
                <Route path="/admin/dashboard" element={isAuth && user?.role === "admin" ? <Admin/> : <Home/>}/>
              </Routes>
            </BrowserRouter>
      )}
  </>
  )
}

export default App
