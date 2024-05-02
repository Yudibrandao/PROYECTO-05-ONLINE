import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { Characters } from "./pages/Characters/Characters";
import { Register } from "./pages/Register/Register";
// import { Profile } from "./pages/Profile/Profile";
import { Admin } from "./pages/Admin/Admin";
import { Artist } from "./pages/Artist/Artist";
import { AdminRoute } from "./components/AdminRoute/AdminRoute";
import { ArtistRoute } from "./components/ArtistRoute/ArtistRoute";
import "./App.css";
import Header from "./components/Header/Header";
import { Body } from "./pages/Body/Body";

const App = () => {
  const [isServerUp, setIsServerUp] = useState(false);

  useEffect(() => {
    const pingServer = async () => {
      const isAlive = await axios.get("http://localhost:3000/");
      setIsServerUp(isAlive);
    };
    pingServer()
  }, []);


  return (
    <>
      <Header />
      <Body />
    </>

    // <Routes>
    //   <Route path="*" element={<Navigate to="/" />} />
    //   <Route path="/" element={<Home />} />
    //   <Route path="/login" element={<Login />} />
    //   <Route path="/register" element={<Register />} />
    //   <Route path="/characters" element={<Characters />} />
    //   {/* <Route path="/profile" element={<Profile />} /> */}
    //   <Route path="/admin" element={<AdminRoute Component={Admin} />} />
    //   <Route path="/artist" element={<ArtistRoute Component={Artist} />} />
    // </Routes>
  );
}

export default App;