import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { artists, createAppointment, getAppointmentsCliente, getAppointmentsTatuadores } from "../../services/apiCalls";
import { userData, userLogout } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import "./Appointment.css";

export const Appointments = () => {
    const userToken = useSelector(userData).token
    const userLogued = useSelector(userData).decodificado
    const [artistas, setArtistas] = useState([])
    const [citas, setCitas] = useState([])
    const [citasTatuador, setCitasTatuador] = useState([])
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newAppointment, setNewAppointment] = useState({
        title: "",
        date: "",
        time: "",
        type: "",
        Tatuador: ""
    });
   
    // const navigate = useNavigate();
    // const dispatch = useDispatch()
    // const [user, setUser] = useState({
    //     firstName: "",
    //     lastName: "",
    //     email: "",
    //     id: "",
    //     role: "",
    // })

    // // Aqui se almacenaran los datos del perfil
    // const [modify, setModify] = useState({
    //     day_date: "",
    // 	description: "",
    // 	price: "",
    //     isActive: false
    // });

    useEffect(() => {
        artists()
            .then((artists) => {
                setArtistas(artists)
            })
            .catch(() => {
            })

    }, [userToken])

    useEffect(() => {
        getAppointmentsCliente(userToken)
            .then((citas) => {
                setCitas(citas)
            })
            .catch(() => {
            })

    }, [userToken])


    useEffect(() => {
        if (userLogued.userRole === '2') {
            getAppointmentsTatuadores(userToken)
                .then((citasTatuador) => {
                    setCitasTatuador(citasTatuador);
                })
                .catch((error) => {
                    console.error("Error al obtener citas del tatuador:", error);
                });
        }
    }, [userToken, userLogued.userRole]);


    const handleGetTatuadorAppointments = () => {
        getAppointmentsTatuadores(userToken)
            .then((citas) => {
                setCitasTatuador(citas);
            })
            .catch((error) => {
                console.error("Error al obtener citas del tatuador:", error);
            });
    };


    const handleCreateAppointment = () => {

        if (newAppointment.title === "" || newAppointment.date === "" || newAppointment.time === "" || newAppointment.type === "") return console.log("Ningun campo puede estar vacio")
        let data_to_send = {}
        data_to_send.day_date = newAppointment.date
        data_to_send.description = newAppointment.title
        data_to_send.price = 150
        data_to_send.Tatuador = newAppointment.Tatuador
        console.log(data_to_send)
        createAppointment(userToken, data_to_send)
            .then((res) => {
                console.log(res)
                setNewAppointment({
                    title: "",
                    date: "",
                    time: "",
                    type: ""
                });

                getAppointmentsCliente(userToken)
                    .then((citas) => {
                        setCitas(citas)
                    })
                    .catch(() => {
                    })

                setShowCreateForm(false);

            })
            .catch(() => {

            })
    };

    //a partir de aqui es para modificar citas 

    // const modify_appointment = (dataAppointment, token) => {
    //     let data_appointment = {}
    //     if (dataAppointment.id) {
    //         data_appointment.id = dataAppointment.id
    //     }
    //     if (dataAppointment.day_date) {
    //         data_appointment.day_date = dataAppointment.day_date
    //     }

    //     const deleteAppointment = (token) => {
    //         const delete_data = { isActive: "false" }
    //         deleteAppointment(token, delete_data_appointment)
    //         dispatch(userLogout())
    //     }

    //     //Saco los datos de los input y los guardo 
    //     const inputHandler = (e) => {
    //         setDataModifyAppointment((prevState) => ({
    //             ...prevState,
    //             [e.target.name]: e.target.value,
    //         }));
    //     };

    //     updateAppointment(token, data_appointment)
    //         .then((res) => {

    //             get_appointment()
    //             setModifyAppointment(false)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }



    return (
        <Container className="appointmentsDesign">
            {userLogued.userRole === "3" ? (
                <>
                    {!showCreateForm && (
                        <Row>
                            <Col className="d-flex justify-content-center col_button_create" md={2}>
                                <Button className="button_create_design" onClick={() => setShowCreateForm(true)}>Crear Cita</Button>
                            </Col>
                            {citas.map((cita) => {
                                return (
                                    <Col key={cita.id} className="d-flex justify-content-center" md={5}>
                                        <Row className="justify-content-center">
                                            <Col className="card_design" md={10}>
                                                <Row>
                                                    <Col md={12}>
                                                        <h6>Cita : {cita.description}</h6>
                                                    </Col>
                                                    <Col md={12}>
                                                        <h6>Fecha : {cita.day_date}</h6>
                                                    </Col>
                                                    <Col md={12}>
                                                        <h6>Precio : {cita.price}</h6>
                                                    </Col>
                                                    <Col md={12}>
                                                        <h6>Tatuador : {cita.tatuador.user.firstName}</h6>
                                                    </Col>
                                                    <Col md={12}>
                                                        <h6>Email : {cita.tatuador.user.email}</h6>
                                                    </Col>
                                                </Row>

                                            </Col>
                                        </Row>

                                    </Col>
                                )

                            })}
                        </Row>
                    )}

                    {showCreateForm && (
                        <Row className="d-flex justify-content-center">
                            <Col className="card_design" md={4}>
                                <CustomInput
                                    type="text"
                                    placeholder="Título de la cita"
                                    value={newAppointment.title}
                                    handler={(e) => setNewAppointment({ ...newAppointment, title: e.target.value })}
                                />
                                <CustomInput
                                    type="date"
                                    placeholder="Fecha"
                                    value={newAppointment.date}
                                    handler={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
                                />
                                <CustomInput
                                    type="time"
                                    placeholder="Hora"
                                    value={newAppointment.time}
                                    handler={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                                />
                                <div>
                                    {artistas.map((artista) => {

                                        return (
                                            <div key={artista.id}>

                                                <label ><input onClick={() => setNewAppointment({ ...newAppointment, Tatuador: artista.id })} type="radio" name="artist" value={artista.id} />{artista.user.firstName}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div>
                                    <Button
                                        variant={newAppointment.type === "Tatuaje" ? "primary" : "outline-primary"}
                                        onClick={() => setNewAppointment({ ...newAppointment, type: "Tatuaje" })}
                                    >
                                        Tatuaje
                                    </Button>
                                    <Button
                                        variant={newAppointment.type === "Piercing" ? "primary" : "outline-primary"}
                                        onClick={() => setNewAppointment({ ...newAppointment, type: "Piercing" })}
                                    >
                                        Piercing
                                    </Button>
                                </div>
                                <Button onClick={handleCreateAppointment}>Guardar</Button>
                                <Button onClick={() => setShowCreateForm(false)}>Cancelar</Button>
                            </Col>
                        </Row>
                    )}
                </>
            ) : (
                <>
                    <Row>

                        {citasTatuador.map((cita) => (
                            <Col key={cita.id} className="d-flex justify-content-center" md={5}>

                                <Row className="justify-content-center">
                                    <Col className="card_design" md={10}>
                                        <Row>

                                            <Col md={12}>
                                                <h6>Fecha : {cita.id}</h6>
                                            </Col>
                                            <Col md={12}>
                                                <h6>Precio : {cita.price}</h6>
                                            </Col>
                                            <Col md={12}>
                                                <h6>Precio : {cita.day_date}</h6>
                                            </Col>

                                        </Row>
                                    </Col>
                                </Row>
                                <Button onClick={handleGetTatuadorAppointments} >Actualizar Citas del Tatuador</Button>
                                
                            </Col>

                        ))}

                    </Row>

                </>
            )}


                {/* modificar citas */}

            {/* {modify ? (
                <Row className="d-flex justify-content-center">
                    <Col className="card_design" md={4}>
                        <Row >
                            <Col md={12} className="m-2 text-center">
                                Id : {appointment.id}
                            </Col>
                        </Row>
                        <Row >
                            <Col md={12} className="m-2">
                                Fecha :
                                <CustomInput className="inputLogin"
                                    type={"date"}
                                    name={"day_date"}
                                    handler={inputHandler}
                                />
                            </Col>
                        </Row>
                        <Row >
                            <Col md={12} className="m-2">
                                Description:
                                <CustomInput className="inputLogin"
                                    type={"text"}
                                    name={"description"}
                                    handler={inputHandler}
                                />
                            </Col>
                        </Row>
                        <Row >
                            <Col md={12} className="m-2">
                                price :
                                <CustomInput className="inputLogin"
                                    type={"number"}
                                    name={"price"}
                                    handler={inputHandler}
                                />
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center mt-3">
                            <Col md={4}>
                                <Button onClick={() => modify_appointment(data_modify_appointment, userToken)}>Modificar</Button>
                            </Col>
                            <Col md={4}>
                                <Button onClick={() => { setModify(false) }}>Cancelar</Button>
                            </Col>
                        </Row>
                    </Col>

                </Row>

            ) : (
                <Row className="d-flex justify-content-center">
                    <Col className="card_design" md={4}>
                        <Row >
                            <Col md={12} className="m-2">
                                Nombre : {appointment.firstName}
                            </Col>
                        </Row>
                        <Row >
                            <Col md={12} className="m-2">
                                Apellido : {appointment.lastName}
                            </Col>
                        </Row>
                        <Row >
                            <Col md={12} className="m-2">
                                Email : {appointment.email}
                            </Col>
                        </Row>
                        <Row >
                            <Col md={12} className="m-2">
                                Id : {user.id}
                            </Col>
                        </Row>
                        <Row >
                            <Col md={12} className="m-2">
                                Rol : {user.role === "1" ? ("Admin") : user.role === "2" ? ("Tatuador") : ("Cliente")}
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center mt-3">
                            <Col md={4}>
                                <Button onClick={() => { setModify(true) }}>Modificar</Button>
                            </Col>
                            <Col md={4}>
                                <Button onClick={() => deleteUser(userToken)}>Borrar</Button>
                            </Col>
                        </Row>
                    </Col>

                </Row>
            )} */}
        </Container>
    );
};
