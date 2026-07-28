import { Link } from "react-router-dom";
import { PackageOpen } from "lucide-react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-bg-cream flex flex-col">
            <Navbar />
            <main className="flex-1 flex items-center justify-center px-6 py-12 relative overflow-hidden">
                <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
                <h1 className="absolute text-[220px] font-black text-primary/5 select-none pointer-events-none">
                    404
                </h1>
                <div className="relative bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-gray-100 max-w-xl w-full p-10 text-center">
                    <div className="w-24 h-24 rounded-3xl bg-primary-light flex items-center justify-center mx-auto mb-8">
                        <PackageOpen
                            size={48}
                            strokeWidth={1.8}
                            className="text-primary"
                        />
                    </div>
                    <h1 className="text-7xl font-black text-primary leading-none">
                        404
                    </h1>
                    <div className="w-20 h-1 bg-accent rounded-full mx-auto my-6"></div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4">
                        Halaman Tidak Ditemukan
                    </h2>
                    <p className="text-gray-600 leading-7 mb-10">
                        Maaf, halaman yang Anda cari tidak tersedia atau URL yang
                        dimasukkan tidak valid. Silakan kembali ke halaman utama
                        atau masuk ke akun Anda.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="px-8 py-3.5 bg-primary text-white rounded-xl font-bold transition-all hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(60,191,76,0.3)]"
                        >
                            Kembali ke Beranda
                        </Link>
                        <Link
                            to="/login"
                            className="px-8 py-3.5 bg-white border border-gray-200 rounded-xl font-bold text-gray-900 transition-all hover:bg-gray-50 hover:border-gray-400"
                        >
                            Login
                        </Link>
                    </div>
                    <div className="mt-10 pt-6 border-t border-gray-100">
                        <p className="text-sm text-gray-400">
                            Jika Anda yakin halaman ini seharusnya tersedia,
                            silakan hubungi administrator.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default NotFound;