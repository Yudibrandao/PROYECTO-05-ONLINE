import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { artists, createAppointment, getAppointmentsCliente, getAppointmentsTatuadores, getDataUser } from "../../services/apiCalls";
import { userData, userLogout } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import "./Appointment.css";

export const Appointments = () => {
    const [modify_citas, setModify_citas] = useState(false);
    const userToken = useSelector(userData).token
    const userLogued = useSelector(userData).decodificado
    const [artistas, setArtistas] = useState([])
    const [citas, setCitas] = useState([])
    const [modify, setModify] = useState(false)//Si el perfil se modifica o no
    const [citasTatuador, setCitasTatuador] = useState([])
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newAppointment, setNewAppointment] = useState({
        title: "",
        date: "",
        time: "",
        type: "",
        Tatuador: ""
    });



    const [user, setUser] = useState({
        day_date: "",
        description: ""
    })

    const [dataCitas_modify, setDataCitasModify] = useState({
        day_date: "",
        description: ""
    });

    useEffect(() => {
        get_user()
    }, [userToken])

    const get_user = () => {
        getDataUser(userToken)
            .then((userData) => {
                setUser(userData)
            })
            .catch(() => {
            })
    }

    useEffect(() => {
        if (!userToken) {
            navigate("/")
        }

    }, [userToken])

    const inputHandler = (e) => {
        setDataCitasModify((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const modifyCitas = (data, token) => {
        let citas_mod = {}
        if (data.firstName) {
            citas_mod.firstName = data.firstName
        }
        if (data.lastName) {
            citas_mod.lastName = data.lastName
        }
        if (data.email) {
            citas_mod.email = data.email
        }

        updateUsers(token, data_mod)
            .then((res) => {

                get_user()
                setModify_citas(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }







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
                            </Col>
                        ))}
                    </Row>
                </>
            )
            };
{/* 
            <Row>

                <Col>
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

                            </Col>
                        )

                    })}

                </Col>
            </Row> */}

        </Container>
    );

};
