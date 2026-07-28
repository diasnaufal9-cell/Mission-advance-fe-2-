import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
    FaChevronDown, FaChevronUp, FaCheckCircle, FaClock, 
    FaFileAlt, FaAward, FaGlobe, FaCreditCard, FaWallet
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { getCourses } from '../../services/api';
import bcaLogo from '../../assets/BCA.png';
import bniLogo from '../../assets/BNI.png';
import briLogo from '../../assets/BRI.png';
import danaLogo from '../../assets/DANA.png';
import linkAjaLogo from '../../assets/LinkAja.png';
import mandiriLogo from '../../assets/MANDIRI.png';
import ovoLogo from '../../assets/Ovo.png';
import shopeePayLogo from '../../assets/ShopeePay.png';
import visaLogo from '../../assets/visa.png';

const PaymentMethod = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('bank');
    const [selectedMethod, setSelectedMethod] = useState(null);
    const adminFee = 7000;
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const allCourses = await getCourses();
                const foundCourse = allCourses.find(c => c.id === parseInt(id));
                if (foundCourse) {
                    setCourse(foundCourse);
                } else {
                    toast.error('Course tidak ditemukan');
                    navigate('/courses');
                }
            } catch (error) {
                console.log(error)
                toast.error('Gagal memuat data');
                navigate('/courses');
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
        window.scrollTo(0, 0);
    }, [id, navigate]);
    if (loading) {
        return (
            <div className="min-h-screen bg-bg-cream flex items-center justify-center">
                <p className="text-lg font-semibold text-gray-600">Memuat...</p>
            </div>
        );
    }
    if (!course) return null;
    const totalPrice = course.price + adminFee;
    const banks = [
        { id: 'BCA', name: 'Bank BCA', logo: bcaLogo },
        { id: 'BNI', name: 'Bank BNI', logo: bniLogo },
        { id: 'BRI', name: 'Bank BRI', logo: briLogo },
        { id: 'Mandiri', name: 'Bank Mandiri', logo: mandiriLogo },
    ];

    const eWallets = [
        { id: 'Dana', name: 'Dana', logo: danaLogo },
        { id: 'OVO', name: 'OVO', logo: ovoLogo },
        { id: 'LinkAja', name: 'LinkAja', logo: linkAjaLogo },
        { id: 'ShopeePay', name: 'Shopee Pay', logo: shopeePayLogo },
    ];

    const handleContinue = () => {
        if (selectedMethod) {
            navigate(`/checkout/${id}?method=${selectedMethod}`);
        } else {
            toast.error('Silakan pilih metode pembayaran terlebih dahulu');
        }
    };
    const toggleCategory = (category) => {
        setSelectedCategory(selectedCategory === category ? null : category);
    };
    return (
        <div className="bg-bg-cream min-h-screen">
            <Navbar />
            <div className="bg-white border-b border-gray-200 py-4">
                <div className="max-w-300 mx-auto px-6">
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                <FaCheckCircle className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-bold text-primary">Pilih Metode</span>
                        </div>
                        <div className="w-16 h-0.5 bg-gray-300"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-xs text-white">2</span>
                            </div>
                            <span className="text-sm font-medium text-gray-400">Bayar</span>
                        </div>
                        <div className="w-16 h-0.5 bg-gray-300"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                                <span className="text-xs text-white">3</span>
                            </div>
                            <span className="text-sm font-medium text-gray-400">Selesai</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-300 mx-auto px-4 sm:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Metode Pembayaran</h2>
                        <div className="mb-4">
                            <button
                                onClick={() => toggleCategory('bank')}
                                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <FaCreditCard className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm font-bold text-gray-900">Transfer Bank</span>
                                </div>
                                {selectedCategory === 'bank' ? (
                                    <FaChevronUp className="w-4 h-4 text-gray-400" />
                                ) : (
                                    <FaChevronDown className="w-4 h-4 text-gray-400" />
                                )}
                            </button>
                            {selectedCategory === 'bank' && (
                                <div className="mt-3 space-y-2">
                                    {banks.map((bank) => (
                                        <button
                                            key={bank.id}
                                            onClick={() => setSelectedMethod(bank.id)}
                                            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
                                                selectedMethod === bank.id
                                                    ? 'border-primary bg-primary/5' 
                                                    : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {bank.logo ? (
                                                    <img src={bank.logo} alt={bank.name} className="w-8 h-8 object-contain" />
                                                ) : (
                                                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-[10px] font-bold text-gray-600">
                                                        {bank.name.split(' ')[1]}
                                                    </div>
                                                )}
                                                <span className="text-sm font-medium text-gray-900">{bank.name}</span>
                                            </div>
                                            {selectedMethod === bank.id && (
                                                <FaCheckCircle className="w-5 h-5 text-primary" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="mb-4">
                            <button
                                onClick={() => toggleCategory('ewallet')}
                                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <FaWallet className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm font-bold text-gray-900">E-Wallet</span>
                                </div>
                                {selectedCategory === 'ewallet' ? (
                                    <FaChevronUp className="w-4 h-4 text-gray-400" />
                                ) : (
                                    <FaChevronDown className="w-4 h-4 text-gray-400" />
                                )}
                            </button>
                            {selectedCategory === 'ewallet' && (
                                <div className="mt-3 space-y-2">
                                    {eWallets.map((wallet) => (
                                        <button
                                            key={wallet.id}
                                            onClick={() => setSelectedMethod(wallet.id)}
                                            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
                                                selectedMethod === wallet.id
                                                    ? 'border-primary bg-primary/5' 
                                                    : 'border-gray-200 hover:bg-gray-50'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {wallet.logo ? (
                                                    <img src={wallet.logo} alt={wallet.name} className="w-8 h-8 object-contain" />
                                                ) : (
                                                    <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-[10px] font-bold text-gray-600">
                                                        {wallet.name.charAt(0)}
                                                    </div>
                                                )}
                                                <span className="text-sm font-medium text-gray-900">{wallet.name}</span>
                                            </div>
                                            {selectedMethod === wallet.id && (
                                                <FaCheckCircle className="w-5 h-5 text-primary" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <button
                                onClick={() => toggleCategory('card')}
                                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex items-center gap-2">
                                    <FaCreditCard className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm font-bold text-gray-900">Kartu Kredit/Debit</span>
                                </div>
                                {selectedCategory === 'card' ? (
                                    <FaChevronUp className="w-4 h-4 text-gray-400" />
                                ) : (
                                    <FaChevronDown className="w-4 h-4 text-gray-400" />
                                )}
                            </button>
                            {selectedCategory === 'card' && (
                                <div className="mt-3 px-4 py-3 rounded-lg border border-gray-200">
                                    <img 
                                        src={visaLogo} 
                                        alt="Mastercard, Visa, JCB" 
                                        className="h-10 object-contain" 
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <img
                                src={course.image}
                                alt={course.title}
                                className="w-full h-40 object-cover rounded-lg mb-4"
                            />
                            <h3 className="text-base font-bold text-gray-900 mb-3 leading-snug">
                                {course.title}
                            </h3>
                            <div className="flex items-baseline gap-2 mb-3">
                                <span className="text-xl font-black text-primary">Rp {course.price.toLocaleString('id-ID')}</span>
                                {course.originalPrice && (
                                    <span className="text-sm text-gray-400 line-through">Rp {course.originalPrice.toLocaleString('id-ID')}</span>
                                )}
                            </div>
                            {course.originalPrice && (
                                <div className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full mb-4">
                                    Diskon {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}%
                                </div>
                            )}
                            <div className="space-y-3 pt-4 border-t border-gray-200">
                                <p className="text-sm font-bold text-gray-900">Kelas Ini Sudah Termasuk</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <FaCheckCircle className="w-4 h-4 text-gray-400" />
                                        <span>Ujian Akhir</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <FaClock className="w-4 h-4 text-gray-400" />
                                        <span>49 Video</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <FaFileAlt className="w-4 h-4 text-gray-400" />
                                        <span>7 Dokumen</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <FaAward className="w-4 h-4 text-gray-400" />
                                        <span>Sertifikat</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-600 col-span-2">
                                        <FaCheckCircle className="w-4 h-4 text-gray-400" />
                                        <span>Pretest</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-gray-200 mt-4">
                                <p className="text-sm font-bold text-gray-900 mb-2">Bahasa Pengantar</p>
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <FaGlobe className="w-4 h-4 text-gray-400" />
                                    <span>Bahasa Indonesia</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Ringkasan Pesanan</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Video Learning: {course.title}</span>
                                    <span className="font-medium text-gray-900">Rp {course.price.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Biaya Admin</span>
                                    <span className="font-medium text-gray-900">Rp {adminFee.toLocaleString('id-ID')}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3 mt-3">
                                    <div className="flex justify-between">
                                        <span className="font-bold text-gray-900">Total Pembayaran</span>
                                        <span className="text-xl font-black text-primary">Rp {totalPrice.toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <button
                                onClick={handleContinue}
                                disabled={!selectedMethod}
                                className={`w-full mt-6 py-3.5 rounded-lg text-base font-bold transition-all ${
                                    selectedMethod
                                        ? 'bg-primary text-white hover:bg-primary-dark'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                            >
                                Lanjutkan Pembayaran
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PaymentMethod;