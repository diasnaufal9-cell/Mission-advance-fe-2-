import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaExclamationCircle, FaEnvelope } from 'react-icons/fa';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const status = searchParams.get('status') || 'success';
    const isSuccess = status === 'success';
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
                            <span className="text-sm font-medium text-gray-900">Bayar</span>
                        </div>
                        <div className="w-16 h-0.5 bg-primary"></div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                <FaCheckCircle className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-bold text-primary">Selesai</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-300 mx-auto px-4 sm:px-6 py-12">
                <div className="max-w-md mx-auto bg-white rounded-xl border border-gray-200 p-8 text-center">
                    <div className="mb-6">
                        {isSuccess ? (
                            <FaCheckCircle className="w-24 h-24 mx-auto text-green-500" />
                        ) : (
                            <FaExclamationCircle className="w-24 h-24 mx-auto text-yellow-500" />
                        )}
                    </div>
                    <h1 className="text-2xl font-black text-gray-900 mb-3">
                        {isSuccess ? 'Pembayaran Berhasil!' : 'Pembayaran Tertunda!'}
                    </h1>
                    <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                        Silakan cek email kamu untuk informasi lebih lanjut. Hubungi kami jika ada kendala.
                    </p>
                    <div className="flex items-center justify-center gap-2 mb-8 text-gray-400">
                        <FaEnvelope className="w-5 h-5" />
                        <span className="text-sm">Email konfirmasi telah dikirim</span>
                    </div>
                    <button
                        onClick={() => navigate('/my-courses')}
                        className="w-full py-3.5 bg-primary text-white rounded-lg text-base font-bold hover:bg-primary-dark transition-colors"
                    >
                        Lihat Detail Pesanan
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PaymentSuccess;