import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlayList from "./pages/PlayList";
import { SongProvider } from "./providers/SongProvider";
import { UserProvider } from "./providers/UserProvider";
import Album from "./pages/Album";

const App = () => {
  return (
    <UserProvider>
      <SongProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/album/:id" element={<Album/>}/>
            <Route path="/playlist" element={<PlayList/>} />
          </Routes>
        </BrowserRouter>
      </SongProvider>
    </UserProvider>
  )
}

export default App
