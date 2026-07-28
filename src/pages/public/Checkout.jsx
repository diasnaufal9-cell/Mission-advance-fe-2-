import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaCopy, FaCheckCircle, FaClock, FaFileAlt, FaAward, FaGlobe } from 'react-icons/fa';
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

const Checkout = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [course, setCourse] = useState(null);
    const [expandedMethod, setExpandedMethod] = useState(0);
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 50, seconds: 55 });
    const [loading, setLoading] = useState(true);
    const selectedMethod = searchParams.get('method') || 'BCA';
    const adminFee = 7000;
    const getVirtualAccountNumber = (method) => {
        // random aja dulu 
        const vaNumbers = {
            'BCA': '11739 081234567890',
            'BNI': '8808 081234567890',
            'BRI': '0028 081234567890',
            'Mandiri': '8898 081234567890',
            'Dana': '081234567890',
            'OVO': '081234567890',
            'LinkAja': '081234567890',
            'ShopeePay': '081234567890',
            'Visa': '8808081234567890',
            'Mastercard': '8808081234567890',
            'JCB': '8808081234567890',
        };
        return vaNumbers[method] || '11739 081234567890';
    };
    const getMethodLogo = (method) => {
        const logos = {
            'BCA': bcaLogo,
            'BNI': bniLogo,
            'BRI': briLogo,
            'Mandiri': mandiriLogo,
            'Dana': danaLogo,
            'OVO': ovoLogo,
            'LinkAja': linkAjaLogo,
            'ShopeePay': shopeePayLogo,
        };
        return logos[method] || bcaLogo;
    };
    const getPaymentInstructions = (method) => {
        const instructions = {
            'BCA': [
                {
                    title: 'ATM BCA',
                    steps: [
                        'Masukkan kartu ATM dan PIN BCA Anda',
                        'Di menu utama, pilih "Transaksi Lainnya". Pilih "Transfer". Pilih "Ke BCA Virtual Account"',
                        'Masukkan nomor Virtual Account',
                        'Pastikan data Virtual Account Anda benar, kemudian masukkan angka yang perlu Anda bayarkan, kemudian pilih "Benar"',
                        'Cek dan perhatikan konfirmasi pembayaran dari layar ATM, jika sudah benar pilih "Ya", atau pilih "Tidak" jika data di layar masih salah',
                        'Transaksi Anda sudah selesai. Pilih "Tidak" untuk tidak melanjutkan transaksi lain'
                    ]
                },
                {
                    title: 'Mobile Banking BCA',
                    steps: [
                        'Buka Aplikasi BCA Mobile',
                        'Pilih "m-BCA", kemudian pilih "m-Transfer"',
                        'Pilih "BCA Virtual Account"',
                        'Masukkan nomor Virtual Account, lalu pilih "OK"',
                        'Klik tombol "Send" yang berada di sudut kanan atas aplikasi untuk melakukan transfer',
                        'Klik "OK" untuk melanjutkan pembayaran',
                        'Masukkan PIN Anda untuk meng-otorisasi transaksi',
                        'Transaksi Anda telah selesai'
                    ]
                },
                {
                    title: 'Internet Banking BCA',
                    steps: [
                        'Login ke KlikBCA Individual',
                        'Pilih "Transfer", kemudian pilih "Transfer ke BCA Virtual Account"',
                        'Masukkan nomor Virtual Account',
                        'Pilih "Lanjutkan" untuk melanjutkan pembayaran',
                        'Masukkan "RESPON KEYBCA APPLI 1" yang muncul pada Token BCA Anda, lalu klik tombol "Kirim"',
                        'Pembayaran telah selesai'
                    ]
                }
            ],
            'BNI': [
                {
                    title: 'ATM BNI',
                    steps: [
                        'Masukkan kartu ATM dan PIN BNI Anda',
                        'Pilih menu "Transfer"',
                        'Pilih "Virtual Account Billing"',
                        'Masukkan nomor Virtual Account',
                        'Masukkan jumlah pembayaran',
                        'Periksa detail transaksi dan pilih "Ya"',
                        'Transaksi selesai'
                    ]
                },
                {
                    title: 'Mobile Banking BNI',
                    steps: [
                        'Buka aplikasi BNI Mobile Banking',
                        'Pilih "Transfer"',
                        'Pilih "Virtual Account Billing"',
                        'Masukkan nomor Virtual Account',
                        'Masukkan nominal pembayaran',
                        'Konfirmasi transaksi',
                        'Masukkan PIN',
                        'Transaksi selesai'
                    ]
                }
            ],
            'BRI': [
                {
                    title: 'ATM BRI',
                    steps: [
                        'Masukkan kartu ATM dan PIN BRI Anda',
                        'Pilih menu "Transaksi Lainnya"',
                        'Pilih "Transfer"',
                        'Pilih "Ke Rek BRI Virtual"',
                        'Masukkan nomor Virtual Account',
                        'Masukkan nominal pembayaran',
                        'Konfirmasi transaksi',
                        'Transaksi selesai'
                    ]
                },
                {
                    title: 'Mobile Banking BRI',
                    steps: [
                        'Buka aplikasi BRImo',
                        'Pilih menu "Transfer"',
                        'Pilih "BRIVA"',
                        'Masukkan nomor Virtual Account',
                        'Masukkan nominal pembayaran',
                        'Konfirmasi transaksi',
                        'Masukkan PIN',
                        'Transaksi selesai'
                    ]
                }
            ],
            'Mandiri': [
                {
                    title: 'ATM Mandiri',
                    steps: [
                        'Masukkan kartu ATM dan PIN Mandiri Anda',
                        'Pilih menu "Bayar/Beli"',
                        'Pilih "Lain-lain"',
                        'Masukkan kode pembayaran (Virtual Account)',
                        'Masukkan nominal pembayaran',
                        'Konfirmasi transaksi',
                        'Transaksi selesai'
                    ]
                },
                {
                    title: 'Mobile Banking Mandiri',
                    steps: [
                        'Buka aplikasi Livin by Mandiri',
                        'Pilih menu "Bayar"',
                        'Pilih "Multi Payment"',
                        'Masukkan kode Virtual Account',
                        'Masukkan nominal pembayaran',
                        'Konfirmasi transaksi',
                        'Masukkan PIN',
                        'Transaksi selesai'
                    ]
                }
            ],
            'Dana': [
                {
                    title: 'Pembayaran via DANA',
                    steps: [
                        'Buka aplikasi DANA',
                        'Pilih menu "Kirim"',
                        'Pilih "Ke Rekening"',
                        'Masukkan nomor Virtual Account',
                        'Masukkan nominal pembayaran',
                        'Konfirmasi transaksi',
                        'Masukkan PIN DANA',
                        'Pembayaran selesai'
                    ]
                }
            ],
            'OVO': [
                {
                    title: 'Pembayaran via OVO',
                    steps: [
                        'Buka aplikasi OVO',
                        'Pilih menu "Transfer"',
                        'Pilih "Ke Rekening Bank"',
                        'Masukkan nomor Virtual Account',
                        'Masukkan nominal pembayaran',
                        'Konfirmasi transaksi',
                        'Masukkan PIN OVO',
                        'Pembayaran selesai'
                    ]
                }
            ],
            'LinkAja': [
                {
                    title: 'Pembayaran via LinkAja',
                    steps: [
                        'Buka aplikasi LinkAja',
                        'Pilih menu "Transfer"',
                        'Pilih "Ke Rekening Bank"',
                        'Masukkan nomor Virtual Account',
                        'Masukkan nominal pembayaran',
                        'Konfirmasi transaksi',
                        'Masukkan PIN LinkAja',
                        'Pembayaran selesai'
                    ]
                }
            ],
            'ShopeePay': [
                {
                    title: 'Pembayaran via ShopeePay',
                    steps: [
                        'Buka aplikasi Shopee',
                        'Pilih menu "ShopeePay"',
                        'Pilih "Transfer"',
                        'Masukkan nomor Virtual Account',
                        'Masukkan nominal pembayaran',
                        'Konfirmasi transaksi',
                        'Masukkan PIN ShopeePay',
                        'Pembayaran selesai'
                    ]
                }
            ],
            'Visa': [
                {
                    title: 'Pembayaran via Kartu Kredit/Debit Visa',
                    steps: [
                        'Masukkan nomor kartu kredit/debit Visa Anda (16 digit)',
                        'Masukkan tanggal kedaluwarsa (MM/YY)',
                        'Masukkan kode CVV (3 digit di belakang kartu)',
                        'Masukkan nama pemegang kartu sesuai yang tertera di kartu',
                        'Masukkan nominal pembayaran',
                        'Klik "Bayar Sekarang"',
                        'Masukkan kode OTP yang dikirim via SMS/email',
                        'Pembayaran berhasil. Simpan bukti transaksi Anda'
                    ]
                },
                {
                    title: 'Catatan Penting',
                    steps: [
                        'Pastikan kartu kredit/debit Anda aktif untuk transaksi online',
                        'Pastikan limit kartu mencukupi untuk nominal pembayaran',
                        'Transaksi akan diproses secara real-time',
                        'Pembayaran menggunakan teknologi enkripsi SSL untuk keamanan',
                        'Hubungi bank penerbit kartu jika transaksi ditolak'
                    ]
                }
            ],
            'Mastercard': [
                {
                    title: 'Pembayaran via Kartu Kredit/Debit Mastercard',
                    steps: [
                        'Masukkan nomor kartu kredit/debit Mastercard Anda (16 digit)',
                        'Masukkan tanggal kedaluwarsa (MM/YY)',
                        'Masukkan kode CVV (3 digit di belakang kartu)',
                        'Masukkan nama pemegang kartu sesuai yang tertera di kartu',
                        'Masukkan nominal pembayaran',
                        'Klik "Bayar Sekarang"',
                        'Masukkan kode OTP yang dikirim via SMS/email',
                        'Pembayaran berhasil. Simpan bukti transaksi Anda'
                    ]
                },
                {
                    title: 'Catatan Penting',
                    steps: [
                        'Pastikan kartu kredit/debit Anda aktif untuk transaksi online',
                        'Pastikan limit kartu mencukupi untuk nominal pembayaran',
                        'Transaksi akan diproses secara real-time',
                        'Pembayaran menggunakan teknologi enkripsi SSL untuk keamanan',
                        'Hubungi bank penerbit kartu jika transaksi ditolak'
                    ]
                }
            ],
            'JCB': [
                {
                    title: 'Pembayaran via Kartu Kredit/Debit JCB',
                    steps: [
                        'Masukkan nomor kartu kredit/debit JCB Anda (16 digit)',
                        'Masukkan tanggal kedaluwarsa (MM/YY)',
                        'Masukkan kode CVV (3 digit di belakang kartu)',
                        'Masukkan nama pemegang kartu sesuai yang tertera di kartu',
                        'Masukkan nominal pembayaran',
                        'Klik "Bayar Sekarang"',
                        'Masukkan kode OTP yang dikirim via SMS/email',
                        'Pembayaran berhasil. Simpan bukti transaksi Anda'
                    ]
                },
                {
                    title: 'Catatan Penting',
                    steps: [
                        'Pastikan kartu kredit/debit Anda aktif untuk transaksi online',
                        'Pastikan limit kartu mencukupi untuk nominal pembayaran',
                        'Transaksi akan diproses secara real-time',
                        'Pembayaran menggunakan teknologi enkripsi SSL untuk keamanan',
                        'Hubungi bank penerbit kartu jika transaksi ditolak'
                    ]
                }
            ],
        };
        return instructions[method] || instructions['BCA'];
    };
    const paymentInstructions = getPaymentInstructions(selectedMethod);
    const virtualAccountNumber = getVirtualAccountNumber(selectedMethod);
    const methodLogo = getMethodLogo(selectedMethod);
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
                console.log(error);
                toast.error('Gagal memuat data');
                navigate('/courses');
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
        window.scrollTo(0, 0);
    }, [id, navigate]);
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);
    const toggleMethod = (index) => {
        setExpandedMethod(expandedMethod === index ? -1 : index);
    };
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Nomor Virtual Account berhasil disalin!');
    };
    const handlePayment = () => {
        toast.success('Pembayaran berhasil dikonfirmasi!');
        setTimeout(() => {
            navigate('/payment-success');
        }, 1000);
    };
    if (loading) {
        return (
            <div className="min-h-screen bg-bg-cream flex items-center justify-center">
                <p className="text-lg font-semibold text-gray-600">Memuat halaman pembayaran...</p>
            </div>
        );
    }
    if (!course) return null;
    const totalPrice = course.price + adminFee;
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
                            <span className="text-sm font-medium text-gray-900">Pilih Metode</span>
                        </div>
                        <div className="w-16 h-0.5 bg-primary"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                <FaCheckCircle className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-bold text-primary">Bayar</span>
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
            <div className="bg-orange-50 border-b border-orange-200 py-3">
                <div className="max-w-300 mx-auto px-6 text-center">
                    <p className="text-sm text-gray-700">
                        Selesaikan pemesanan dalam{' '}
                        <span className="font-bold text-orange-600">
                            {String(timeLeft.hours).padStart(2, '0')} : {String(timeLeft.minutes).padStart(2, '0')} : {String(timeLeft.seconds).padStart(2, '0')}
                        </span>
                    </p>
                </div>
            </div>
            <div className="max-w-300 mx-auto px-4 sm:px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
                    <div className="space-y-6">
                        {/* Metode Pembayaran */}
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Metode Pembayaran</h2>
                            <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="bg-white px-4 py-2 rounded-lg">
                                        <img src={methodLogo} alt={selectedMethod} className="h-10 object-contain" />
                                    </div>
                                </div>
                                <p className="text-center text-sm font-medium text-gray-900 mb-2">
                                    Bayar Melalui {selectedMethod === 'BCA' || selectedMethod === 'BNI' || selectedMethod === 'BRI' ? 'Virtual Account ' : ''}{selectedMethod}
                                </p>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-lg font-bold text-gray-700">{virtualAccountNumber}</span>
                                    <button
                                        onClick={() => copyToClipboard(virtualAccountNumber.replace(/\s/g, ''))}
                                        className="text-sm font-bold text-orange-500 hover:text-orange-600 flex items-center gap-1"
                                    >
                                        <FaCopy className="w-3 h-3" />
                                        Salin
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6">
                                <h3 className="text-base font-bold text-gray-900 mb-4">Ringkasan Pesanan</h3>
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
                            </div>
                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => navigate(`/payment-method/${id}`)}
                                    className="flex-1 py-3 border-2 border-primary text-primary rounded-lg text-sm font-bold hover:bg-primary/5 transition-colors"
                                >
                                    Ganti Metode Pembayaran
                                </button>
                                <button
                                    onClick={handlePayment}
                                    className="flex-1 py-3 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors"
                                >
                                    Bayar Sekarang
                                </button>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Tata Cara Pembayaran</h2>
                            <div className="space-y-3">
                                {paymentInstructions.map((method, index) => (
                                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => toggleMethod(index)}
                                            className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                                        >
                                            <span className="text-sm font-bold text-gray-900">{method.title}</span>
                                            {expandedMethod === index ? (
                                                <FaChevronUp className="w-4 h-4 text-gray-400" />
                                            ) : (
                                                <FaChevronDown className="w-4 h-4 text-gray-400" />
                                            )}
                                        </button>
                                        {expandedMethod === index && (
                                            <div className="p-4 bg-white">
                                                <ol className="space-y-2">
                                                    {method.steps.map((step, stepIndex) => (
                                                        <li key={stepIndex} className="text-sm text-gray-600 leading-relaxed">
                                                            <span className="font-bold text-gray-900 mr-2">{stepIndex + 1}.</span>
                                                            {step}
                                                        </li>
                                                    ))}
                                                </ol>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="lg:sticky lg:top-24 lg:self-start">
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
                    </div>
                </div>
            </div>
            {/* OKE ROKO HABIS KOPI HABIS CODE MERAH BESOK LAGI */}
            <Footer />
        </div>
    );
};

export default Checkout;
