import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourses } from "../../store/redux/courseSlice";
import CourseCard from "./CourseCard";

const CourseSection = () => {
    const dispatch = useDispatch();
    const { courses, loading, error } = useSelector((state) => state.courses);
    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);
    if (loading) {
        return (
            <section id="courses" className="py-12 px-6">
                <div className="max-w-300 mx-auto text-center">
                    <p className="text-gray-600 font-semibold">Memuat data kelas...</p>
                </div>
            </section>
        );
    }
    if (error) {
        return (
            <section id="courses" className="py-12 px-6">
                <div className="max-w-300 mx-auto text-center">
                    <p className="text-red-500 font-semibold">Error: {error}</p>
                </div>
            </section>
        );
    }
    const coursesArray = Array.isArray(courses) ? courses : [];
    return (
        <section id="courses" className="py-12 px-6">
            <div className="max-w-300 mx-auto">
                <div className="mb-8">
                    <h2 className="text-3xl font-black text-gray-900 mb-2">
                        Koleksi Video Pembelajaran Unggulan
                    </h2>
                    <p className="text-base text-gray-600">
                        Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
                    </p>
                </div>
                <div className="flex gap-8 mb-8 border-b border-gray-200">
                    <a
                        href="#"
                        className="text-[15px] font-bold text-accent pb-3 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.75 after:bg-accent after:rounded-t-sm"
                    >
                        Semua Kelas
                    </a>
                    <a
                        href="#"
                        className="text-[15px] font-normal text-gray-600 pb-3 hover:text-gray-900 transition-colors"
                    >
                        Programming
                    </a>
                    <a
                        href="#"
                        className="text-[15px] font-normal text-gray-600 pb-3 hover:text-gray-900 transition-colors"
                    >
                        Desain
                    </a>
                    <a
                        href="#"
                        className="text-[15px] font-normal text-gray-600 pb-3 hover:text-gray-900 transition-colors"
                    >
                        Marketing
                    </a>
                    <a
                        href="#"
                        className="text-[15px] font-normal text-gray-600 pb-3 hover:text-gray-900 transition-colors"
                    >
                        Bisnis
                    </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {coursesArray.slice(0, 6).map((course) => (
                        <Link key={course.id} to={`/course/${course.id}`} className="block">
                            <CourseCard
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
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CourseSection;