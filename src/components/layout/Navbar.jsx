import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        setIsMobileMenuOpen(false);
        navigate('/login');
    };

    const menuItems = [
        { label: 'Profil Saya', path: '/profile' },
        { label: 'Kelas Saya', path: '/my-courses' },
        { label: 'Pesanan Saya', path: '/orders' },
    ];
    const getUserAvatar = () => {
        if (!user) return 'https://i.pravatar.cc/40?img=1';
        const avatarNumber = user.name ? 
            (user.name.charCodeAt(0) % 70) + 1 : 
            (user.email.charCodeAt(0) % 70) + 1;
        
        return `https://i.pravatar.cc/40?img=${avatarNumber}`;
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-300 mx-auto px-6">
                <div className="flex justify-between items-center py-4">
                    <Link to="/" className="text-2xl font-black">
                        <span className="text-secondary">video</span>
                        <span className="text-accent">belajar</span>
                    </Link>
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            to="/courses"
                            className="text-base font-normal text-gray-900 hover:text-primary transition-colors"
                        >
                            Kategori
                        </Link>
                        {!user ? (
                            <Link
                                to="/login"
                                className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-all"
                            >
                                Login
                            </Link>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="cursor-pointer"
                                >
                                    <img
                                        src={getUserAvatar()}
                                        alt={user.name || 'User'}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                </button>
                                {isOpen && (
                                    <div className="absolute top-[calc(100%+10px)] right-0 w-50 bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden z-1000">
                                        <div className="p-4 text-sm text-gray-900 border-b border-gray-200">
                                            Hai, <strong className="text-primary">{user.name || 'User'}</strong>
                                        </div>
                                        <ul className="py-2">
                                            {menuItems.map((item, index) => (
                                                <li key={index}>
                                                    <Link
                                                        to={item.path}
                                                        className="block px-4 py-2.5 text-sm text-gray-900 hover:bg-bg-cream transition-colors"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {item.label}
                                                    </Link>
                                                </li>
                                            ))}
                                            <li className="border-t border-gray-100 mt-2 pt-2">
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-left px-4 py-2.5 text-sm text-red-500 font-bold hover:bg-red-50 transition-colors"
                                                >
                                                    Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-gray-600 hover:text-primary transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="max-w-300 mx-auto px-6">
                        <ul className="divide-y divide-gray-200">
                            {/* Kategori */}
                            <li>
                                <Link
                                    to="/courses"
                                    className="block py-4 text-base text-gray-900 hover:bg-gray-50 transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Kategori
                                </Link>
                            </li>
                            {user && menuItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        to={item.path}
                                        className="block py-4 text-base text-gray-900 hover:bg-gray-50 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                            {user && (
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-between py-4 text-base text-red-500 font-bold hover:bg-gray-50 transition-colors"
                                    >
                                        <span>Keluar</span>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                    </button>
                                </li>
                            )}
                            {!user && (
                                <li>
                                    <Link
                                        to="/login"
                                        className="block py-4 text-base text-primary font-bold hover:bg-gray-50 transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;