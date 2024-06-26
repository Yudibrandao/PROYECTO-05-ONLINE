import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../Login/Login";
import { Home } from "../Home/Home";
import { Register } from "../Register/Register";
import { Profile } from "../Profile/Profile";
import { Appointments } from "../Appointment/Appointment";
import { Admin } from "../Admin/Admin";


export const Body = () => {

  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" />}/>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/create" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/citas" element={< Appointments/>}/>
        <Route path="/admin" element={<Admin/>}/>
       
      </Routes>
    </>
  );
};