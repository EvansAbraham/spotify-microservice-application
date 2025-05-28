import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PlayList from "./pages/Playlist";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/playlist" element={<PlayList/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
