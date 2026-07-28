import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout
import AdminLayout from './components/layout/AdminLayout';

// Routes
import ProtectedRoute from './routes/ProtectedRoute';

// Public Pages
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import Courses from './pages/public/Courses';
import CourseDetail from './pages/public/CourseDetail';
import PaymentMethod from './pages/public/PaymentMethod';
import Checkout from './pages/public/Checkout';
import PaymentSuccess from './pages/public/PaymentSuccess';
import Profile from './pages/public/Profile';
import NotFound from './pages/public/NotFound';
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import Users from './pages/admin/Users';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/course/:id" element={<CourseDetail />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/payment-method/:id" element={<PaymentMethod />} />
                    <Route path="/checkout/:id" element={<Checkout />} />
                    <Route path="/payment-success" element={<PaymentSuccess />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/my-courses" element={<Profile />} />
                    <Route path="/orders" element={<Profile />} />
                </Route>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="product" element={<Products />} />
                    <Route path="users" element={<Users />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="bottom-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                theme="light"
            />
        </BrowserRouter>
    );
}

export default App;