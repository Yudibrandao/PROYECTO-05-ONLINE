import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import "./Header.css";

export const Header = () => {

    const location = useLocation();
    const [isLogued, setLogued] = useState(false)

    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary headerDesing">
            <Container>
                <Navbar.Brand as={Link} to="/">Inicio</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav className="me-auto"></Nav>
                    <Nav className="me-auto"></Nav>
                    <Nav className="me-auto"></Nav>
                    <Nav className="me-auto"></Nav>
                    <Nav className="me-auto">
                        {isLogued ? (
                            <>
                                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                <Nav.Link as={Link} to="/tatuadores">Tatuadores</Nav.Link>
                                <Nav.Link as={Link} to="/citas">Citas</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/create">Register</Nav.Link>
                            </>
                        )}


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};







