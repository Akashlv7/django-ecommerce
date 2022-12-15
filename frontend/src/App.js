import { Container } from 'react-bootstrap'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import PlcaeOrderPage from './pages/PlcaeOrderPage';
import AddressPage from './pages/AddressPage';
import OrdePage from './pages/OrderPage'
import UserListPage from './pages/UserListPage';
import UserEditPage from './pages/UserEditPage';
import ProductListPage from './pages/ProductListPage';
import ProductEditPage from './pages/ProductEditPage';
import OrderListPage from './pages/OrderListPage';
import RazorPayComponent from './components/RazorPayComponent';

function App() {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
          <Route path='/' element={<HomePage />} exact />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/product/:id' element={<ProductPage />} />
          <Route path='/cart' element={<CartPage />} />
          <Route path='/cart/:id' element={<CartPage />} />
          <Route path='/shipping' element={<ShippingPage />} />
          <Route path='/payment' element={<PaymentPage />} />
          <Route path='/placeorder' element={<PlcaeOrderPage />} />
          <Route path='/address' element={<AddressPage />} />

          <Route path='/order/:id' element={<OrdePage />} />
          <Route path='/admin/orderlist' element={<OrderListPage />} />

          <Route path='/admin/userlist' element={<UserListPage />} />
          <Route path='/admin/user/:id/edit' element={<UserEditPage />} />

          <Route path='/admin/productlist' element={<ProductListPage />} />
          <Route path='/admin/product/:id/edit' element={<ProductEditPage />} />

          <Route path='/razorpay' element={<RazorPayComponent />} />

          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
