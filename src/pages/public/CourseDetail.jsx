import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
    FaStar, FaClock, FaFileAlt, FaAward, FaCheckCircle, FaGlobe, 
    FaChevronDown, FaPlayCircle, FaLock 
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import CourseCard from '../../components/ui/CourseCard';
import { getCourses } from '../../services/api';
import useAuthStore from '../../store/useAuthStore';

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const [course, setCourse] = useState(null);
    const [relatedCourses, setRelatedCourses] = useState([]);
    const [expandedSections, setExpandedSections] = useState([0]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchCourseDetail = async () => {
            try {
                const allCourses = await getCourses();
                const foundCourse = allCourses.find(c => c.id === parseInt(id));
                if (foundCourse) {
                    setCourse(foundCourse);
                    const related = allCourses
                        .filter(c => c.category === foundCourse.category && c.id !== foundCourse.id)
                        .slice(0, 3);
                    setRelatedCourses(related);
                } else {
                    toast.error('Course tidak ditemukan');
                    navigate('/courses');
                }
            } catch (error) {
                toast.error('Gagal memuat detail course');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourseDetail();
        window.scrollTo(0, 0);
    }, [id, navigate]);
    const handleBuyClick = () => {
        if (!user) {
            toast.error('Silakan login terlebih dahulu untuk membeli kelas');
            navigate('/login');
        } else {
            navigate(`/payment-method/${id}`);
        }
    };

    const toggleSection = (index) => {
        setExpandedSections(prev => 
            prev.includes(index) 
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };
    const formatRupiah = (price) => {
        return new Intl.NumberFormat('id-ID', { 
            style: 'currency', 
            currency: 'IDR', 
            minimumFractionDigits: 0 
        }).format(price);
    };
    const curriculumSections = [
        {
            title: 'Pengenalan & Dasar-Dasar',
            lessons: [
                { title: 'Sambutan dari Instruktur', type: 'Video', duration: '5 Menit', isPreview: true },
                { title: 'Memahami Konsep Dasar', type: 'Video', duration: '15 Menit', isPreview: false },
                { title: 'Persiapan Environment Kerja', type: 'Dokumen', duration: '10 Menit', isPreview: false },
            ]
        },
        {
            title: 'Materi Inti & Studi Kasus',
            lessons: [
                { title: 'Implementasi Teknik A', type: 'Video', duration: '25 Menit', isPreview: false },
                { title: 'Implementasi Teknik B', type: 'Video', duration: '30 Menit', isPreview: false },
                { title: 'Kuis Materi Inti', type: 'Kuis', duration: '15 Menit', isPreview: false },
            ]
        },
        {
            title: 'Proyek Akhir & Sertifikasi',
            lessons: [
                { title: 'Panduan Pengerjaan Proyek', type: 'Dokumen', duration: '10 Menit', isPreview: false },
                { title: 'Ujian Akhir', type: 'Ujian', duration: '60 Menit', isPreview: false },
            ]
        }
    ];

    const reviews = [
        {
            name: 'Jokowi',
            batch: 'Alumni Batch 2',
            avatar: 'https://i.pravatar.cc/40?img=11',
            comment: 'Materinya sangat terstruktur dan mudah dipahami. Instrukturnya juga responsif saat ada pertanyaan di forum diskusi.',
            rating: 4.5
        },
        {
            name: 'Gibran',
            batch: 'Alumni Batch 21',
            avatar: 'https://i.pravatar.cc/40?img=22',
            comment: 'Sangat worth it! Proyek akhirnya benar-benar mengasah skill dan bisa langsung saya masukkan ke portofolio.',
            rating: 5.0
        }
    ];
    const renderStars = (rating) => {
        return (
            <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                        key={star}
                        className={`w-4 h-4 ${
                            star <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                    />
                ))}
            </div>
        );
    };
    if (loading) {
        return (
            <div className="min-h-screen bg-bg-cream flex items-center justify-center">
                <p className="text-lg font-semibold text-gray-600 animate-pulse">Memuat detail course...</p>
            </div>
        );
    }
    if (!course) return null;
    return (
        <div className="bg-bg-cream min-h-screen flex flex-col">
            <Navbar />
            <div className="max-w-300 w-full mx-auto px-4 sm:px-6 py-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Link to="/" className="hover:text-primary transition-colors">Beranda</Link>
                    <span>/</span>
                    <Link to="/courses" className="hover:text-primary transition-colors">{course.category}</Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium truncate">{course.title}</span>
                </div>
            </div>
            <div className="max-w-300 w-full mx-auto px-4 sm:px-6 mb-8">
                <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 bg-cover bg-center shadow-lg" style={{ backgroundImage: `url(${course.image})` }}>
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-8 text-white">
                        <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full w-fit mb-3">
                            {course.category}
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-black mb-3 max-w-3xl leading-tight">{course.title}</h1>
                        <p className="text-sm sm:text-base text-gray-200 mb-4 max-w-2xl">Belajar bersama tutor profesional. Akses selamanya, kapanpun, di manapun.</p>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded">
                                {renderStars(course.rating)}
                                <span className="text-sm font-bold ml-1">{course.rating}</span>
                            </div>
                            <span className="text-sm text-gray-300">({course.reviews} Ulasan)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-300 w-full mx-auto px-4 sm:px-6 pb-12 flex-1">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <FaFileAlt className="text-primary" /> Deskripsi Kelas
                            </h2>
                            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                {course.description || "Deskripsi kelas akan muncul di sini."}
                            </p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Belajar bersama Tutor Profesional</h2>
                            <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <img src={course.instructorImage || "https://i.pravatar.cc/80?img=12"} alt="Tutor" className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm" />
                                <div>
                                    <p className="text-base font-bold text-gray-900">{course.instructor}</p>
                                    <p className="text-sm text-primary font-medium mb-2">{course.role}</p>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        Berpengalaman lebih dari 3 tahun di industri. Telah membantu ratusan murid mencapai tujuan karir mereka melalui metode pembelajaran yang praktis dan terstruktur.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-xl font-bold text-gray-900">Kamu akan Mempelajari</h2>
                                <p className="text-sm text-gray-500 mt-1">Kurikulum komprehensif untuk memandu belajarmu.</p>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {curriculumSections.map((section, index) => {
                                    const isExpanded = expandedSections.includes(index);
                                    return (
                                        <div key={index} className="group">
                                            <button
                                                onClick={() => toggleSection(index)}
                                                className="w-full flex items-center justify-between px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
                                            >
                                                <span className={`text-sm font-semibold ${isExpanded ? 'text-primary' : 'text-gray-900'}`}>
                                                    {section.title}
                                                </span>
                                                <div className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
                                                    <FaChevronDown className="w-4 h-4 text-gray-400" />
                                                </div>
                                            </button>
                                            {isExpanded && (
                                                <div className="bg-gray-50/50 px-6 pb-4">
                                                    {section.lessons.length > 0 ? (
                                                        <div className="space-y-1">
                                                            {section.lessons.map((lesson, lessonIndex) => (
                                                                <div key={lessonIndex} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                                                    <div className="flex items-center gap-3 flex-1">
                                                                        {lesson.isPreview ? (
                                                                            <FaPlayCircle className="w-4 h-4 text-primary shrink-0" />
                                                                        ) : (
                                                                            <FaLock className="w-4 h-4 text-gray-400 shrink-0" />
                                                                        )}
                                                                        <span className="text-sm text-gray-700">{lesson.title}</span>
                                                                        {lesson.isPreview && (
                                                                            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Preview</span>
                                                                        )}
                                                                    </div>
                                                                    <div className="flex items-center gap-3 text-xs text-gray-500 shrink-0">
                                                                        <span className="flex items-center gap-1">
                                                                            <FaCheckCircle className="w-3 h-3" /> {lesson.type}
                                                                        </span>
                                                                        <span className="flex items-center gap-1">
                                                                            <FaClock className="w-3 h-3" /> {lesson.duration}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p className="text-sm text-gray-500 py-2 italic">Materi akan segera ditambahkan.</p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Rating dan Review Murid</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {reviews.map((review, index) => (
                                    <div key={index} className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                                        <div className="flex items-center gap-3 mb-3">
                                            <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                                            <div>
                                                <p className="text-sm font-bold text-gray-900">{review.name}</p>
                                                <p className="text-xs text-gray-500">{review.batch}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed mb-3">"{review.comment}"</p>
                                        {renderStars(review.rating)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="lg:sticky lg:top-24 lg:self-start">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 leading-snug">{course.title}</h3>
                            <div className="flex items-baseline gap-3 mb-2">
                                <span className="text-3xl font-black text-primary">{formatRupiah(course.price)}</span>
                                {course.originalPrice && course.originalPrice > course.price && (
                                    <span className="text-base text-gray-400 line-through">{formatRupiah(course.originalPrice)}</span>
                                )}
                            </div>
                            {course.originalPrice && course.originalPrice > course.price && (
                                <div className="inline-block px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full mb-4">
                                    Hemat {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}%
                                </div>
                            )}
                            <p className="text-xs text-gray-500 mb-6 flex items-center gap-1">
                                <FaClock className="w-3 h-3" /> Penawaran spesial berakhir dalam 2 hari!
                            </p>
                            
                            {/* TOMBOL BELI DENGAN LOGIKA ZUSTAND */}
                            <button
                                onClick={handleBuyClick}
                                className="w-full py-3.5 bg-primary text-white rounded-lg text-base font-bold hover:bg-primary-dark hover:shadow-lg hover:-translate-y-0.5 transition-all mb-6"
                            >
                                Beli Kelas Sekarang
                            </button>
                            
                            <div className="space-y-4 pt-6 border-t border-gray-200">
                                <p className="text-sm font-bold text-gray-900">Kelas Ini Termasuk:</p>
                                <div className="grid grid-cols-1 gap-3">
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <FaCheckCircle className="w-4 h-4 text-primary shrink-0" />
                                        <span>Akses selamanya (Lifetime)</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <FaPlayCircle className="w-4 h-4 text-primary shrink-0" />
                                        <span>49 Video Pembelajaran HD</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <FaFileAlt className="w-4 h-4 text-primary shrink-0" />
                                        <span>7 Dokumen & Source Code</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-gray-600">
                                        <FaAward className="w-4 h-4 text-primary shrink-0" />
                                        <span>Sertifikat Penyelesaian</span>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-6 border-t border-gray-200 mt-6">
                                <p className="text-sm font-bold text-gray-900 mb-2">Bahasa Pengantar</p>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <FaGlobe className="w-4 h-4 text-gray-400" />
                                    <span>Bahasa Indonesia</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {relatedCourses.length > 0 && (
                    <div className="mt-16 pt-12 border-t border-gray-200">
                        <h2 className="text-2xl font-black text-gray-900 mb-2">Rekomendasi Kelas Lainnya</h2>
                        <p className="text-sm text-gray-600 mb-8">Ekspansi pengetahuan Anda dengan pilihan spesial dari kami.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedCourses.map((related) => (
                                <Link key={related.id} to={`/course/${related.id}`} className="block">
                                    <CourseCard
                                        image={related.image}
                                        title={related.title}
                                        desc={related.description}
                                        instructorImage={related.instructorImage}
                                        instructorName={related.instructor}
                                        instructorRole={related.role}
                                        rating={related.rating}
                                        reviews={related.reviews}
                                        price={related.price}
                                        originalPrice={related.originalPrice}
                                    />
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default CourseDetail;