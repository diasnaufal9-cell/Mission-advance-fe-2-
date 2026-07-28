import { useState } from 'react';
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaXTwitter,
    FaChevronRight,
} from 'react-icons/fa6';

const Footer = () => {
    const [openMenu, setOpenMenu] = useState(null);
    const toggleMenu = (menuName) => {
        setOpenMenu(openMenu === menuName ? null : menuName);
    };
    const companies = [
        'Tentang Kami',
        'FAQ',
        'Kebijakan',
        'Bantuan',
    ];
    const communities = [
        'Blog',
        'Tips Sukses',
    ];
    return (
        <footer className="bg-white py-12 px-6 border-t border-gray-200">
            <div className="max-w-300 mx-auto">
                <div className="md:hidden space-y-6">
                    <div>
                        <div className="text-2xl font-black mb-4">
                            <span className="text-secondary">video</span>
                            <span className="text-accent">belajar</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4 leading-relaxed font-semibold">
                            Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Jl. Usman Effendi No. 50 Lowokwaru, Malang
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed mt-1">
                            +62-877-7123-1234
                        </p>
                    </div>
                    <div className="border-t border-gray-200 pt-4 space-y-1">
                        <div>
                            <button
                                onClick={() => toggleMenu('perusahaan1')}
                                className="w-full flex items-center justify-between py-3 text-base font-bold text-gray-900"
                            >
                                <span>Perusahaan</span>
                                <FaChevronRight
                                    className={`w-4 h-4 text-gray-400 transition-transform ${openMenu === 'perusahaan1' ? 'rotate-90' : ''
                                        }`}
                                />
                            </button>
                            {openMenu === 'perusahaan1' && (
                                <ul className="pb-3 space-y-3">
                                    {companies.map((item, index) => (
                                        <li key={index}>
                                            <a href="#" className="text-sm text-gray-600 hover:text-primary">
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="border-t border-gray-200">
                            <button
                                onClick={() => toggleMenu('perusahaan2')}
                                className="w-full flex items-center justify-between py-3 text-base font-bold text-gray-900"
                            >
                                <span>Perusahaan</span>
                                <FaChevronRight
                                    className={`w-4 h-4 text-gray-400 transition-transform ${openMenu === 'perusahaan2' ? 'rotate-90' : ''
                                        }`}
                                />
                            </button>
                            {openMenu === 'perusahaan2' && (
                                <ul className="pb-3 space-y-3">
                                    {companies.map((item, index) => (
                                        <li key={index}>
                                            <a href="#" className="text-sm text-gray-600 hover:text-primary">
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <div className="border-t border-gray-200">
                            <button
                                onClick={() => toggleMenu('komunitas')}
                                className="w-full flex items-center justify-between py-3 text-base font-bold text-gray-900"
                            >
                                <span>Komunitas</span>
                                <FaChevronRight
                                    className={`w-4 h-4 text-gray-400 transition-transform ${openMenu === 'komunitas' ? 'rotate-90' : ''
                                        }`}
                                />
                            </button>
                            {openMenu === 'komunitas' && (
                                <ul className="pb-3 space-y-3">
                                    {communities.map((item, index) => (
                                        <li key={index}>
                                            <a href="#" className="text-sm text-gray-600 hover:text-primary">
                                                {item}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                        <a className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-primary hover:border-primary transition-colors">
                            <FaLinkedinIn size={18} />
                        </a>
                        <a className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-primary hover:border-primary transition-colors">
                            <FaFacebookF size={18} />
                        </a>
                        <a className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-primary hover:border-primary transition-colors">
                            <FaInstagram size={18} />
                        </a>
                        <a className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-primary hover:border-primary transition-colors">
                            <FaXTwitter size={18} />
                        </a>
                    </div>
                    <p className="text-sm text-gray-500 pt-4 border-t border-gray-200">
                        ©2026 CONSULATE PRIANGAN KNZT613.
                    </p>
                </div>
                <div className="hidden md:block">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
                        <div>
                            <div className="text-2xl font-black mb-4">
                                <span className="text-secondary">video</span>
                                <span className="text-accent">belajar</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                                Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                Jl. Usman Effendi No. 50 Lowokwaru, Malang<br />
                                +62-877-7123-1234
                            </p>
                        </div>
                        <div>
                            <h4 className="text-base font-bold text-gray-900 mb-4">Kategori</h4>
                            <ul className="flex flex-col gap-3">
                                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Digital & Teknologi</a></li>
                                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Pemasaran</a></li>
                                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Manajemen Bisnis</a></li>
                                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Desain</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-base font-bold text-gray-900 mb-4">Perusahaan</h4>
                            <ul className="flex flex-col gap-3">
                                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Tentang Kami</a></li>
                                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">FAQ</a></li>
                                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Kebijakan</a></li>
                                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Bantuan</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-base font-bold text-gray-900 mb-4">Komunitas</h4>
                            <ul className="flex flex-col gap-3">
                                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Blog</a></li>
                                <li><a href="#" className="text-sm text-gray-600 hover:text-primary">Tips Sukses</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-500">
                            © Async...
                            Asynchronous...
                            Promise pending...
                            Life mysterious...
                        </p>
                        <div className="flex gap-3">
                            <a className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-primary hover:border-primary transition-colors">
                                <FaLinkedinIn size={18} />
                            </a>
                            <a className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-primary hover:border-primary transition-colors">
                                <FaFacebookF size={18} />
                            </a>
                            <a className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-primary hover:border-primary transition-colors">
                                <FaInstagram size={18} />
                            </a>
                            <a className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-primary hover:border-primary transition-colors">
                                <FaXTwitter size={18} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;