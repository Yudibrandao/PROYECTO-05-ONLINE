import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../Login/Login";
import { Home } from "../Home/Home";
import { Characters } from "../Characters/Characters";
import { Register } from "../Register/Register";

export const Body = () => {

    return (
        <>
            <Routes>
                <Route path="*" element={<Navigate to="/" />}/>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/characters" element={<Characters />} />
                                                
            </Routes>
        </>
    );
};