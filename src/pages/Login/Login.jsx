import { useNavigate } from "react-router-dom"
import { CustomInput } from "../../components/CustomInput/CustomInput"
import { ButtonC } from "../../components/ButtonC/ButtonC"
import { useEffect, useState } from "react";
import "./Login.css"
import { loginCall } from "../../services/apiCalls";
import { decodeToken } from "react-jwt";

export const Login = () => {
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        email:"", 
        password:""
    })


    const inputHandler = (e) => {
       

        setCredentials((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };

    const loginMe = async () => {

        const answer = await loginCall(credentials)
        console.log(answer)
        

        if(answer.data.token){
            const uDecodificado = decodeToken(answer.data.token);

            const passport = {
                token: answer.data.token, 
                decodificado: uDecodificado
            }

            console.log(passport)

            scryRenderedDOMComponentsWithTag(`${uDecodificado.name}, Bienvenido de nuevo`)

            setTimeout(()=> {
                navigate("/")

            }, 3000)
        }

    }

    

    return (
        <div className="login-container loginElementsDesign">
            {/* {msg === "" ? <></> : <div>{msg}</div>} */}
            {/* <pre>{JSON.stringify(credentials, null, 2)}</pre>  */}
            <CustomInput
                typeProp= {"email"}
                nameProp= {"email"}
                handlerProp= { (e)=> inputHandler(e)}
                placeholderProp={"Email"}        
            />
            <CustomInput
                typeProp={"password"}
                nameProp={"password"}
                handlerProp={(e)=> inputHandler(e)}
                placeholderProp={"Indica tu contraseña"}
            />

            <ButtonC
                title={"Login"}
                className={"regularButtonClass"}
                funtionEmit={loginMe}
            />


        </div>
    )
}