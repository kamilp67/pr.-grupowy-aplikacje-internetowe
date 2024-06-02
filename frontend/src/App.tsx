import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Home } from './pages/Home';
import { Products } from './pages/Books';
import { Navbar } from './components/Navbar';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import Payment from './pages/Payments';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
    return (
        <>
            <ShoppingCartProvider>
                <Navbar />
                <Container className='mb-4'>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/payments' element={<Payment />} />
                        <Route path='/books' element={<Products />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                    </Routes>
                </Container>
            </ShoppingCartProvider>
        </>
    );
}

export default App;
