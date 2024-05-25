import { Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Home } from './pages/Home'
import { Products } from './pages/Books'
import { Navbar } from './components/Navbar'
import { ShoppingCartProvider } from './context/ShoppingCartContext'
import Payments from './pages/Payments'

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
        </Routes>
      </Container>
    </ShoppingCartProvider>
  </>
  )
}

export default App
