import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { toast } from 'react-toastify';
import useAuthStore from '../../store/useAuthStore';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const register = useAuthStore((state) => state.register);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handlePhoneChange = (value) => {
        setFormData({
            ...formData,
            phone: value || ''
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            toast.error('Nama lengkap wajib diisi!');
            return;
        }
        if (!formData.email.trim()) {
            toast.error('Email wajib diisi!');
            return;
        }
        if (!formData.phone.trim()) {
            toast.error('Nomor HP wajib diisi!');
            return;
        }
        if (!formData.password) {
            toast.error('Kata sandi wajib diisi!');
            return;
        }
        if (formData.password.length < 6) {
            toast.error('Kata sandi minimal 6 karakter!');
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            toast.error('Konfirmasi kata sandi tidak cocok!');
            return;
        }
        setIsLoading(true);
        const result = register(formData);
        setTimeout(() => {
            if (result && result.success) {
                toast.success(result.message);
                navigate('/', { replace: true });
            } else {
                toast.error(result?.message || 'Registrasi gagal!');
            }
            setIsLoading(false);
        }, 500);
    };
    return (
        <div className="min-h-screen bg-bg-cream flex items-center justify-center p-6">
            <div className="w-full max-w-130">
                <div className="text-center mb-8">
                    <Link to="/" className="text-2xl font-black inline-block">
                        <span className="text-secondary">video</span>
                        <span className="text-accent">belajar</span>
                    </Link>
                </div>
                
                <div className="bg-white rounded-2xl p-10 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-black text-gray-900 mb-2">
                            Pendaftaran Akun
                        </h1>
                        <p className="text-sm text-gray-600">
                            Yuk, daftarkan akunmu sekarang juga!
                        </p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {/* NAMA */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-900">
                                Nama Lengkap<span className="text-accent"> *</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Masukkan nama lengkap kamu"
                                className="w-full bg-white px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-normal focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(60,191,76,0.1)] placeholder:text-gray-400"
                                required
                            />
                        </div>
                        {/* EMAIL */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-900">
                                E-Mail<span className="text-accent"> *</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Masukkan email kamu"
                                className="w-full bg-white px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-normal focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(60,191,76,0.1)] placeholder:text-gray-400"
                                required
                            />
                        </div>
                        {/* PHONE */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-900">
                                No. Hp<span className="text-accent"> *</span>
                            </label>
                            <div className="phone-input-wrapper">
                                <PhoneInput
                                    international
                                    defaultCountry="ID"
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    placeholder="Masukkan nomor telepon"
                                    className="custom-phone-input w-full"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Pilih negara dan masukkan nomor telepon
                            </p>
                        </div>
                        {/* PASSWORD */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-900">
                                Kata Sandi<span className="text-accent"> *</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Buat kata sandi"
                                    className="w-full bg-white px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-normal focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(60,191,76,0.1)] placeholder:text-gray-400 pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                                >
                                    {showPassword ? <FaEye className="w-5 h-5" /> : <FaEyeSlash className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                        {/* KONFIRMASI PASSWORD */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-bold text-gray-900">
                                Konfirmasi Kata Sandi<span className="text-accent"> *</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Konfirmasi kata sandi"
                                    className="w-full bg-white px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-normal focus:outline-none focus:border-primary focus:shadow-[0_0_0_3px_rgba(60,191,76,0.1)] placeholder:text-gray-400 pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900 transition-colors"
                                >
                                    {showConfirmPassword ? <FaEye className="w-5 h-5" /> : <FaEyeSlash className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>
                        <div className="text-center text-sm text-gray-600 -mt-2">
                            Sudah punya akun?{' '}
                            <Link to="/login" className="text-primary font-bold hover:underline">
                                Masuk di sini
                            </Link>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3.5 px-6 bg-primary text-white rounded-xl text-base font-bold hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(60,191,76,0.3)] transition-all flex items-center justify-center gap-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                        </button>
                        <div className="relative text-center my-2">
                            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200"></div>
                            <span className="relative bg-white px-4 text-xs text-gray-400">atau</span>
                        </div>
                        <button
                            type="button"
                            className="w-full py-3.5 px-6 bg-white text-gray-900 border border-gray-200 rounded-xl text-base font-bold hover:bg-gray-50 hover:border-gray-600 transition-all flex items-center justify-center gap-2"
                        >
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                            Daftar dengan Google
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;