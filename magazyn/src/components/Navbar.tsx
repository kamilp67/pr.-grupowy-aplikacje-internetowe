import { Container, Nav, Navbar as NavbarBs } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'


export const Navbar = () => {


  return <NavbarBs sticky='top' bg="dark" data-bs-theme="dark" className=' shadow-lg mb-3 pb-2'>
    <Container>
        <NavbarBs.Brand className='fs-3'>Books.com</NavbarBs.Brand>
        <Nav className='me-auto'>

          <Nav.Link to="/warehouse" as={NavLink}>Warehouse</Nav.Link>
            <Nav.Link to="/orders" as={NavLink}>Orders</Nav.Link>
        </Nav>


    </Container>
  </NavbarBs>
}
