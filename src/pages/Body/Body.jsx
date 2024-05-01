import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../Login/Login";
import { Home } from "../Home/Home";
import { Characters } from "../Characters/Characters";
import { Register } from "../Register/Register";
import { Profile } from "../Profile/Profile";
import { Admin } from "../Admin/Admin";
import { Tatuador } from "../Tatuador/Tatuador";
import { AdminRoute } from "../../components/AdminRoute/AdminRoute";
import { TatuadorRoute } from "../../components/TatuadorRoute/TatuadorRoute";

export const Body = () => {

  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" />}/>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/tatuador" element={<TatuadorRoute Component={Tatuador} />} />

        <Route path="/admin" element={<AdminRoute Component={Admin} />} />

      </Routes>
    </>
  );
};