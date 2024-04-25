import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation } from 'react-router-dom';
import "./Header.css";

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const location = useLocation()
    // console.log(location)
    // console.log(location.pathnamen)




  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">NachoT@ttoo</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/characters" className={location.pathname === "/characters" ? "elementTest": ""}>Tatuadores</Nav.Link>

            <NavDropdown title="Link" id="navbarScrollingDropdown">  <NavDropdown.Item href="/register" className={location.pathname === "/register" ? "elementTest": ""}>
                Resgister
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/login" className={location.pathname === "/login" ? "elementTest": ""}>
              Login
              </NavDropdown.Item>
              
            </NavDropdown>
         
            
          </Nav>

          
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;