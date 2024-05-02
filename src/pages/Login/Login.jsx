import { useNavigate } from "react-router-dom"
import { CustomInput } from "../../components/CustomInput/CustomInput"
import { ButtonC } from "../../components/ButtonC/ButtonC"
import { useEffect, useState } from "react";
import "./Login.css"
import { loginCall } from "../../services/apiCalls";
import { decodeToken } from "react-jwt";



export const Login = () => {
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const [msg, setMsg] = useState("");

    const inputHandler = (value, name) => {
        setCredentials((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    const loginMe = async () => {
        const answer = await loginCall(credentials);
        if (answer.data.token) {

            const uDecodificado = decodeToken(answer.data.token);

            const passport = {
                token: answer.data.token,
                decodificado: uDecodificado
            };

            console.log(passport);

            sessionStorage.setItem("passport", JSON.stringify(passport))

            setMsg(`${uDecodificado.name}, Bienvenido de nuevo`);

            setTimeout(() => {
                navigate("/")
            }, 3000);
        }

    };

    return (
        <div className="login-container loginElementsDesign">
            {msg === "" ? (

                <>

                    <CustomInput
                        
                        type={"email"}
                        name={"email"}
                        handler={ inputHandler}
                        placeholderProp={"Email"}
                    />
                    <CustomInput
                      
                      type={"password"}
                        name={"password"}
                        handler={ inputHandler}
                        placeholderProp={"Indica tu contraseña"}
                    />

                    <ButtonC
                        title={"Login"}
                        className={"regularButtonClass"}
                        funtionEmit={loginMe}
                    />
                </>
            ) : (
                <div>{msg}</div>
            )}

            <pre>{JSON.stringify(credentials, null, 2) }</pre>
        </div >
    );
}