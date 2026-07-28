import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaChevronDown, FaFilter } from 'react-icons/fa6';
import { FaRegSadTear } from 'react-icons/fa'; // Ganti dengan icon ini
import { toast } from 'react-toastify';

import {
    fetchCourses,
    toggleCategory,
    setDuration,
    setPrice,
    setSearchQuery,
    setSortBy,
    resetFilters
} from '../../store/redux/courseSlice';
import { selectFilteredCourses } from '../../store/redux/courseSlice';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import FilterSidebar from '../../components/ui/FilterSidebar';
import CourseCard from '../../components/ui/CourseCard';
import SortDropdown from '../../components/ui/SortDropdown';
import SearchBox from '../../components/ui/SearchBox';
import Pagination from '../../components/ui/Pagination';

const Courses = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const itemsPerPage = 6;
    const { loading, error } = useSelector((state) => state.courses);
    const filteredCourses = useSelector(selectFilteredCourses);
    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);
    const safeFilteredCourses = Array.isArray(filteredCourses) ? filteredCourses : [];
    const totalPages = Math.ceil(safeFilteredCourses.length / itemsPerPage);
    const paginatedCourses = safeFilteredCourses.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const handleToggleCategory = (category) => {
        dispatch(toggleCategory(category));
        setCurrentPage(1);
        toast.success(`Filter kategori "${category}" diterapkan`);
    };
    const handleSetDuration = (duration) => {
        dispatch(setDuration(duration));
        setCurrentPage(1);
        toast.success(`Filter durasi "${duration}" diterapkan`);
    };
    const handleSetPrice = (price) => {
        dispatch(setPrice(price));
        setCurrentPage(1);
        toast.success(`Filter harga "${price}" diterapkan`);
    };
    const handleSearch = (query) => {
        dispatch(setSearchQuery(query));
        setCurrentPage(1);
        if (query.trim()) {
            toast.success(`Mencari: "${query}"`);
        }
    };
    const handleSort = (sortOption) => {
        dispatch(setSortBy(sortOption));
        setCurrentPage(1);
        toast.success('Urutan course berhasil diubah');
    };
    const handleReset = () => {
        dispatch(resetFilters());
        setCurrentPage(1);
        toast.success('Semua filter berhasil direset');
    };
    const handleCourseClick = (courseId) => {
        navigate(`/course/${courseId}`);
    };
    if (loading && safeFilteredCourses.length === 0) {
        return (
            <div className="min-h-screen bg-bg-cream flex items-center justify-center">
                <p className="text-lg font-semibold text-gray-600">Memuat data kelas...</p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="min-h-screen bg-bg-cream flex items-center justify-center">
                <p className="text-lg font-semibold text-red-500">Gagal memuat data: {error}</p>
            </div>
        );
    }
    return (
        <div className="bg-bg-cream min-h-screen">
            <Navbar />
            <div className="max-w-300 mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2">
                        Koleksi Video Pembelajaran Unggulan
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">
                        Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
                    </p>
                </div>
                <div className="lg:hidden mb-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-900"
                    >
                        <span>Filter</span>
                        <FaChevronDown
                            className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`}
                        />
                    </button>
                    {showFilters && (
                        <div className="mt-4">
                            <FilterSidebar
                                onToggleCategory={handleToggleCategory}
                                onSetDuration={handleSetDuration}
                                onSetPrice={handleSetPrice}
                                onReset={handleReset}
                            />
                        </div>
                    )}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="flex gap-3">
                        <SortDropdown onSort={handleSort} />
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-normal text-gray-700"
                        >
                            <FaFilter className="w-4 h-4" />
                            Filter
                        </button>
                    </div>
                    <div className="flex-1 sm:max-w-xs">
                        <SearchBox onSearch={handleSearch} />
                    </div>
                </div>
                <div className="hidden lg:flex gap-6">
                    <FilterSidebar
                        onToggleCategory={handleToggleCategory}
                        onSetDuration={handleSetDuration}
                        onSetPrice={handleSetPrice}
                        onReset={handleReset}
                    />
                    <div className="flex-1">
                        {paginatedCourses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {paginatedCourses.map((course) => (
                                    <CourseCard
                                        key={course.id}
                                        image={course.image}
                                        title={course.title}
                                        desc={course.description}
                                        instructorImage={course.instructorImage}
                                        instructorName={course.instructor}
                                        instructorRole={course.role}
                                        rating={course.rating}
                                        reviews={course.reviews}
                                        price={course.price}
                                        originalPrice={course.originalPrice}
                                        onClick={() => handleCourseClick(course.id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <FaRegSadTear className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Tidak Ada Kelas Ditemukan</h3>
                                <p className="text-sm text-gray-600">Coba ubah filter atau kata kunci pencarian Anda.</p>
                            </div>
                        )}
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </div>
                </div>
                <div className="lg:hidden">
                    {paginatedCourses.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4">
                            {paginatedCourses.map((course) => (
                                <CourseCard
                                    key={course.id}
                                    image={course.image}
                                    title={course.title}
                                    desc={course.description}
                                    instructorImage={course.instructorImage}
                                    instructorName={course.instructor}
                                    instructorRole={course.role}
                                    rating={course.rating}
                                    reviews={course.reviews}
                                    price={course.price}
                                    originalPrice={course.originalPrice}
                                    onClick={() => handleCourseClick(course.id)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <FaRegSadTear className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Tidak Ada Kelas Ditemukan</h3>
                            <p className="text-sm text-gray-600">Coba ubah filter atau kata kunci pencarian Anda.</p>
                        </div>
                    )}
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Courses;