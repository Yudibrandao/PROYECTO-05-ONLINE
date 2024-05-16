import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { createAppointment } from "../../services/apiCalls";
import "./Appointment.css";

export const Appointments = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [newAppointment, setNewAppointment] = useState({
        title: "",
        date: "",
        time: "",
        description: ""
    });

    const handleCreateAppointment = () => {
        // Aquí puedes agregar la lógica para crear una cita
        console.log("Nueva cita:", newAppointment);
        // Aquí puedes llamar a la función para crear una cita
        // createAppointment(newAppointment);
    };

    return (
        <Container fluid className="appointmentsDesign">
            {/* Mostrar el botón "Crear Cita" solo si el formulario de creación de cita no está visible */}
            {!showCreateForm && (
                <Button onClick={() => setShowCreateForm(true)}>Crear Cita</Button>
            )}

            {/* Formulario para crear una nueva cita */}
            {showCreateForm && (
                <Row className="d-flex justify-content-center">
                    <Col className="card_design" md={4}>
                        {/* Campos del formulario */}
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

                        {/* Botones para guardar o cancelar la creación de la cita */}
                        <Button onClick={handleCreateAppointment}>Guardar</Button>
                        <Button onClick={() => setShowCreateForm(false)}>Cancelar</Button>
                    </Col>
                </Row>
            )}
        </Container>
    );
};
