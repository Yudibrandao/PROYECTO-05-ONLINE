import { useNavigate } from "react-router-dom";
import  CustomInput  from "../../components/CustomInput/CustomInput";
import { ButtonC } from "../../components/ButtonC/ButtonC";
import { useEffect, useState } from "react";
import "./Login.css";
import { loginCall } from "../../services/apiCalls";
import { decodeToken } from "react-jwt";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

export const Login = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

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
        decodificado: uDecodificado,
      };

      console.log(passport);

      sessionStorage.setItem("passport", JSON.stringify(passport));

      setMsg(`${uDecodificado.name}, Bienvenido de nuevo`);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  const handlerSend = (event) => {
    event.preventDefault();
    const requiredFields = ["email", "password"];
    const emptyField = requiredFields.find((field) => !credentials[field]);

    if (emptyField) {
      return;
    }

    // loginCall("user/login", credentials)
    //   .then((data) => {
    //     dispatch(login({ credentials: data.data.token }));

    //     setTimeout(() => {
    //       navigate("/profile");
    //     }, 2500);
    //   })
    //   .catch((error) => {
    //     // Manejar el error de Axios
    //     console.log(error);
    //   });
    console.log(credentials);
  };

  return (
    <div className="login-container loginElementsDesign">
      {msg === "" ? (
        <>
          <Container>
            <Row>
              <Col>
                <h2 className="titleLogin text-center">Login</h2>
                <Form onSubmit={handlerSend} method="post">
                  <CustomInput
                    type={"email"}
                    name={"email"}
                    handler={inputHandler}
                    placeholder={"Email"}
                  />
                  <CustomInput
                    type={"password"}
                    name={"password"}
                    handler={inputHandler}
                    placeholder={"Indica tu contraseña"}
                  />

                  <div className="text-center">
                    <Button type="submit" variant="secondary">
                      Enviar
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <div>{msg}</div>
      )}

      <pre>{JSON.stringify(credentials, null, 2)}</pre>
    </div>
  );
};