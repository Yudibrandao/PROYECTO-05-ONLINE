import { useNavigate } from "react-router-dom"
import { CustomInput } from "../../components/CustomInput/CustomInput"
import { ButtonC } from "../../components/ButtonC/ButtonC"
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { registerNewUserCall } from "../../services/apiCalls";
import "./Register.css"



export const Register = () => {
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        firstName: "",
        email: "",
        password: "",
    });

    const [msg, setMsg] = useState("");


    const inputHandler = (e) => {

        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const registerMe = async () => {
        if (!IsInputError(credentials.password, "password") && !IsInputError(credentials.email, "email")) {
          const answer = await registerNewUserCall(credentials);
          console.log(answer)
          setMsg(answer.data.message);
    
          if (answer.data.email) {
            setTimeout(() => {
              navigate("/profile");
            }, 2000);
          }
        }
        else {
          console.log(credentials)
          console.log("credenciales incorrectas, algún campo no está bien introducido")
        }
      };


    return (
        <div className="register-container registerElementsDesign">
            {msg === "" ? (
                <>

                    <CustomInput
                        typeProp={"text"}
                        nameProp={"firstName"}
                        handlerProp={(e) => inputHandler(e)}
                        placeholderProp={"Escribe tu Nombre"}
                    />
                    <CustomInput
                        typeProp={"email"}
                        nameProp={"email"}
                        handlerProp={(e) => inputHandler(e)}
                        placeholderProp={"Escribe tu Email"}
                    />

                    <CustomInput
                        typeProp={"password"}
                        nameProp={"password"}
                        handlerProp={(e) => inputHandler(e)}
                        placeholderProp={"Indica tu contraseña"}
                    />

                    <ButtonC
                        title={"register"}
                        className={"regularButtonClass"}
                        funtionEmit={registerMe}
                    />

                </>
            ) : (

                <div>{msg}</div>
            )}
            { }

        </div>


    );
}