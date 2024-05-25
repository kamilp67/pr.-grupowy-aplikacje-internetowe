import { Button, Container, Nav, Navbar as NavbarBs } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useShoppingCart } from '../context/ShoppingCartContext'

export const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingCart()

  return <NavbarBs sticky='top' bg="dark" data-bs-theme="dark" className=' shadow-lg mb-3 pb-2'>
    <Container>
        <NavbarBs.Brand className='fs-3'>Books.com</NavbarBs.Brand>
        <Nav className='me-auto'>
          <Nav.Link to="/books" as={NavLink}>Books</Nav.Link>
          <Nav.Link to="/payments" as={NavLink}>Payments</Nav.Link>
        </Nav>
        
        <Button onClick={ openCart } className='btn-success'>
          
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
          </svg>

          <div 
            className='rounded-circle bg-danger d-flex justify-content-center align-items-center' 
            style={{ color: "white", width: "1.7rem", height: "1.7rem", position: "absolute", transform: "translate(60%, -25%)" }}
            >
              { cartQuantity }
          </div>

        </Button>
    </Container>
  </NavbarBs>
}
