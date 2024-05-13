import { useEffect, useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { IsInputError } from "../../utils/validators";
import { BootstrapModal } from "../../components/BootstrapModal/BootstrapModal"
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Row } from "react-bootstrap";
import { userData } from "../../app/slices/userSlice";
import { deleteUsers, getDataUser } from "../../services/apiCalls";
import { isAction } from "redux";
import "./Profile.css";


export const Profile = () => {

  const dispatch = useDispatch()
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    id: "",
    role: "",
  })
  const userToken = useSelector(userData).token// Almacena informacion del estado actual 
  const [modify, setModify] = useState(false)//Si el perfil se modifica o no 

  //Aqui se almacenaran los datos del perfil
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  //Traigo los datos de usuario logueado
  useEffect(() => {
    getDataUser(userToken)
      .then((userData) => {
        setUser(userData)
      })
      .catch(() => {

      })
  }, [userToken])

  //Funcion para eliminar el usuario
  const deleteUser = (token)=>{
    const delete_data = {isActive: "false"}
    deleteUsers(token, delete_data)
    
  }

  //Actualiza el estado cuando cambia los campos del formulario
  const inputHandler = (e) => {
    setProfileData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Container fluid className="profileDesign">
      {modify ? (
        <><h1>modify</h1></>

      ) : (
        <Row className="carDesign">
          <Col md={12}>
            <Row className="d-flex justify-content-center">
              <Col md={2}>
                Nombre : {user.firstName}
              </Col>
            </Row>
          </Col>
          <Col md={12}>
            <Row className="d-flex justify-content-center">
              <Col md={2}>
                Apellido : {user.lastName}
              </Col>
            </Row>
          </Col>
          <Col md={12}>
            <Row className="d-flex justify-content-center">
              <Col md={2}>
                Email : {user.email}
              </Col>
            </Row>
          </Col>

          <Col md={12}>
            <Row className="d-flex justify-content-center">
              <Col md={2}>
                Id : {user.id}
              </Col>
            </Row></Col>
          <Col md={12}>
            <Row className="d-flex justify-content-center">
              <Col md={2}>
                Rol : {user.role === 1 ? ("Admin") : user.role === 2 ? ("Tatuador") : ("Cliente")}
              </Col>
            </Row>
          </Col>
          <Col md={12}>
            <Row className="d-flex justify-content-center">
              <Col md={1}>
                <Button onClick={()=>{setModify(true)}}>Modificar</Button>
              </Col>
              <Col md={1}>
                <Button onClick={()=>deleteUser(userToken)}>Borrar</Button>
              </Col>
            </Row>
          </Col>

        </Row>
      )}
    </Container>
  );
};