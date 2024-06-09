import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Home } from './pages/Home'
import { Products } from './pages/Books'
import { Navbar } from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import Payments from './pages/Payments'
import { Warehouse } from "./pages/Warehouse";
import Register from './pages/Register'
import Login from './pages/Login';


function App() {

  return (
  <>
    <ShoppingCartProvider>
      <Navbar />
      <Container className='mb-4'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/payments' element={<Payments />}></Route>
          <Route path='/books' element={<Products />}></Route>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/warehouse" element={<Warehouse />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  </>
  )
}

export default App
