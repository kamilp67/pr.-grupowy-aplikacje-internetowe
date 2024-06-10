import React from 'react';
import { Container, Nav, Navbar as NavbarBs } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useUser } from "../context/UserContext";

export const Navbar = () => {
  const { user } = useUser();

  return (
    <NavbarBs sticky='top' bg="dark" data-bs-theme="dark" className='shadow-lg mb-3 pb-2'>
      <Container>
        <NavbarBs.Brand className='fs-3'>Books.com</NavbarBs.Brand>
        <Nav className='me-auto'>
          {user && user.position === 'employee' && (
            <>
              <Nav.Link to="/warehouse" as={NavLink}>Warehouse</Nav.Link>
              <Nav.Link to="/orders" as={NavLink}>Orders</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </NavbarBs>
  );
}
