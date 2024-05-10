import { useNavigate } from "react-router-dom"
import {CustomInput} from "../../components/CustomInput/CustomInput"
import { ButtonC } from "../../components/ButtonC/ButtonC"
import { Col, Row, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
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
            // const answer = await registerNewUserCall(credentials);
            // console.log(answer)
            // setMsg(answer.data.message);

            // if (answer.data.email) {
            //     setTimeout(() => {
            //         navigate("/profile");
            //     }, 2000);
            // }
        }
        else {
            console.log(credentials)
            console.log("credenciales incorrectas, algún campo no está bien introducido")
        }
    };


    return (
        <Container className="register_design">

            <Row className="d-flex justify-content-center align-items-center">
                <Col md={4}>
                    
                    <CustomInput className="inputLogin"
                        type={"text"}
                        name={"firstName"}
                        handler={inputHandler}
                        placeholder={"Nombre"}
                    />
                  
                    <CustomInput className="inputLogin"
                        type={"text"}
                        name={"lastName"}
                        handler={inputHandler}
                        placeholder={"Apellidos"}
                    />

                    <CustomInput className="inputLogin"
                        type={"email"}
                        name={"email"}
                        handler={inputHandler}
                        placeholder={"Email"}
                    />
                    <CustomInput className="inputLogin"
                        type={"password"}
                        name={"password"}
                        handler={inputHandler}
                        placeholder={"Contraseña"}
                    />

                    <ButtonC
                        title={"register"}
                        className={"regularButtonClass"}
                        funtionEmit={registerMe}
                    />
                </Col>

            </Row>

        </Container>
    )

}