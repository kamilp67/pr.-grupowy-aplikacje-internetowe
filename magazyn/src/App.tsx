import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
import { Warehouse } from "./pages/Warehouse";
import { Orders } from "./pages/Orders";
import { Login } from "../../frontend/src/pages/Login";

function App() {

  return (
    <>
      <Navbar />
      <Container className='mb-4'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/warehouse" element={<Warehouse />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
