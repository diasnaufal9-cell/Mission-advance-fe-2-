import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaUser,
    FaBook,
    FaShoppingCart,
    FaEye,
    FaEyeSlash
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import useAuthStore from '../../store/useAuthStore';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const Profile = () => {
    const user = useAuthStore((state) => state.user);
    const [activeMenu, setActiveMenu] = useState('profile');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || 'Jennie Ruby Jane',
        email: user?.email || 'rubyjane@gmail.com',
        gender: user?.gender || 'Perempuan',
        phone: user?.phone || '+6281234567890',
        password: '',
        confirmPassword: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handlePhoneChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            phone: value || '',
        }));
    };
    const CustomInput = (props) => (
        <input
            {...props}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-primary transition-colors"
        />
    );
    const handleSave = (e) => {
        e.preventDefault();
        if (formData.password || formData.confirmPassword) {
            if (formData.password.length < 6) {
                toast.error(
                    'Password baru minimal harus 6 karakter!'
                );
                return;
            }
            if (
                formData.password !==
                formData.confirmPassword
            ) {
                toast.error(
                    'Konfirmasi password tidak cocok!'
                );
                return;
            }
        }
        const updatedUser = {
            ...user,
            name: formData.name,
            email: formData.email,
            gender: formData.gender,
            phone: formData.phone,
            ...(formData.password && {
                password: formData.password,
            }),
        };
        localStorage.setItem(
            'user',
            JSON.stringify(updatedUser)
        );
        useAuthStore.setState({
            user: updatedUser,
        });
        setFormData((prev) => ({
            ...prev,
            password: '',
            confirmPassword: '',
        }));
        setShowPassword(false);
        setShowConfirmPassword(false);
        toast.success(
            'Profil berhasil diperbarui!'
        );
    };
    const menuItems = [
        {
            id: 'profile',
            label: 'Profil Saya',
            icon: <FaUser className="w-5 h-5" />,
            path: '/profile',
        },
        {
            id: 'courses',
            label: 'Kelas Saya',
            icon: <FaBook className="w-5 h-5" />,
            path: '/my-courses',
        },
        {
            id: 'orders',
            label: 'Pesanan Saya',
            icon: <FaShoppingCart className="w-5 h-5" />,
            path: '/orders',
        },
    ];

    return (
        <div className="bg-bg-cream min-h-screen">
            <Navbar />
            <div className="max-w-300 mx-auto px-6 py-12">
                <div className="mb-8">
                    <h1 className="text-2xl font-black text-gray-900 mb-1">
                        Ubah Profil
                    </h1>
                    <p className="text-sm text-gray-600">
                        Kelola informasi pribadi dan keamanan akun Anda
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row gap-6">
                    <aside className="w-full lg:w-72 shrink-0">
                        <div className="bg-white rounded-xl border border-gray-200 p-4">
                            <ul className="space-y-1">
                                {menuItems.map((item) => (
                                    <li key={item.id}>
                                        <Link
                                            to={item.path}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                                activeMenu === item.id
                                                    ? 'bg-[#FFF8E7] text-accent font-bold border border-accent/30'
                                                    : 'text-gray-400 hover:bg-gray-50'
                                            }`}
                                            onClick={() =>
                                                setActiveMenu(item.id)
                                            }
                                        >
                                            {item.icon}
                                            <span>
                                                {item.label}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                    <main className="flex-1">
                        <div className="bg-white rounded-xl border border-gray-200 p-8">
                            <div className="flex items-center gap-5 pb-6 border-b border-gray-200">
                                <img
                                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop"
                                    alt="Profile"
                                    className="w-20 h-20 rounded-lg object-cover"
                                />
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                                        {formData.name}
                                    </h2>
                                    <p className="text-sm text-gray-600 mb-2">
                                        {formData.email}
                                    </p>
                                    <button
                                        type="button"
                                        className="text-sm font-bold text-accent hover:text-accent-dark transition-colors"
                                    >
                                        Ganti Foto Profil
                                    </button>
                                </div>
                            </div>
                            <form
                                onSubmit={handleSave}
                                className="mt-6 space-y-4"
                            >
                                <div className="relative">
                                    <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-medium text-primary">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-primary rounded-lg text-sm text-gray-900 focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div className="relative">
                                    <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-medium text-gray-500">
                                        E-Mail
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-primary transition-colors"
                                    />
                                </div>
                                <div className="relative">
                                    <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-medium text-gray-500">
                                        Jenis Kelamin
                                    </label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-primary transition-colors appearance-none bg-white cursor-pointer"
                                    >
                                        <option value="Perempuan">
                                            Perempuan
                                        </option>
                                        <option value="Laki-laki">
                                            Laki-laki
                                        </option>
                                    </select>
                                </div>
                                {/* PHONE */}
                                <div className="relative">
                                    <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-medium text-gray-500 z-10">
                                        No. Hp
                                    </label>
                                    <PhoneInput
                                        international
                                        defaultCountry="ID"
                                        value={formData.phone}
                                        onChange={handlePhoneChange}
                                        placeholder="Masukkan nomor telepon"
                                        inputComponent={CustomInput}
                                    />
                                </div>
                                {/* PASSWORD SECTION */}
                                <div className="pt-4 mt-6 border-t border-gray-200">
                                    <div className="mb-4">
                                        <h3 className="text-base font-bold text-gray-900">
                                            Ubah Password
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">
                                            Kosongkan jika Anda tidak ingin mengubah password.
                                        </p>
                                    </div>
                                    {/* PASSWORD BARU */}
                                    <div className="relative mb-4">
                                        <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-medium text-gray-500">
                                            Password Baru
                                        </label>
                                        <input
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Masukkan password baru"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-primary transition-colors pr-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash className="w-5 h-5" />
                                            ) : (
                                                <FaEye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                    {/* KONFIRMASI PASSWORD */}
                                    <div className="relative">
                                        <label className="absolute -top-2.5 left-3 bg-white px-1 text-xs font-medium text-gray-500">
                                            Konfirmasi Password Baru
                                        </label>
                                        <input
                                            type={
                                                showConfirmPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            name="confirmPassword"
                                            value={
                                                formData.confirmPassword
                                            }
                                            onChange={handleChange}
                                            placeholder="Ulangi password baru"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-primary transition-colors pr-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            {showConfirmPassword ? (
                                                <FaEyeSlash className="w-5 h-5" />
                                            ) : (
                                                <FaEye className="w-5 h-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full mt-6 px-8 py-3.5 bg-primary text-white rounded-lg text-base font-bold hover:bg-primary-dark transition-colors"
                                >
                                    Simpan Perubahan
                                </button>
                            </form>
                        </div>
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;