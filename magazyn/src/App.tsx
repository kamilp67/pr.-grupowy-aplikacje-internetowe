import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Home } from './pages/Home'
import { Navbar } from './components/Navbar'
import { Warehouse } from "./pages/Warehouse";

function App() {

  return (
  <>

      <Navbar />
      <Container className='mb-4'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path="/warehouse" element={<Warehouse />} />
        </Routes>
      </Container>

  </>
  )
}

export default App
