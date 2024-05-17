import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { artists, createAppointment } from "../../services/apiCalls";
import { userData } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";
import "./Appointment.css";

export const Appointments = () => {
    const userToken = useSelector(userData).token
    const [artistas, setArtistas] = useState([])
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newAppointment, setNewAppointment] = useState({
        title: "",
        date: "",
        time: "",
        type: "",
        Tatuador: ""
    });

    useEffect(() => {
        artists()
            .then((artists) => {
                setArtistas(artists)
            })
            .catch(() => {
            })

    }, [userToken])

    const handleCreateAppointment = () => {
        
        if (newAppointment.title === "" || newAppointment.date === "" || newAppointment.time === "" || newAppointment.type === "") return console.log("Ningun campo puede estar vacio")
        let data_to_send= {}
        data_to_send.description = newAppointment.title
        data_to_send.price= 150
        data_to_send.day_date= newAppointment.date
        data_to_send.Tatuador= newAppointment.Tatuador
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
                setShowCreateForm(false);

            })
            .catch(() => {

            })

    };

    return (
        <Container fluid className="appointmentsDesign">
            {!showCreateForm && (
                <Button onClick={() => setShowCreateForm(true)}>Crear Cita</Button>
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
                                        
                                      <label ><input onClick={() => setNewAppointment({ ...newAppointment, Tatuador:artista.id})} type="radio" name="artist" value={artista.id}/>{artista.user.firstName}</label>
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
        </Container>
    );
};
