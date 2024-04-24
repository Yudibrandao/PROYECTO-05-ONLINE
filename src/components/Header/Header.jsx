import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation } from 'react-router-dom';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const location = useLocation()
    console.log(location)
    console.log(location.pathname)




  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">NachoT@ttoo</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/characters">Tatuadores</Nav.Link>
            <Nav.Link href="#contacto">Contacto</Nav.Link>

            <NavDropdown title="Link" id="navbarScrollingDropdown">  <NavDropdown.Item href="registrarte">
                Resgistrate
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" onClick={()=> setIsLoggedIn(!isLoggedIn)}>
                {!isLoggedIn
                ? "Iniciar Sesion"
                : "Salir"}
              </NavDropdown.Item>
            </NavDropdown>
         
            
          </Nav>

          
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;