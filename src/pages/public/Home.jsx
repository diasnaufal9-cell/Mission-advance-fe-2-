import Navbar from '../../components/layout/Navbar';
import Hero from '../../components/ui/Hero';
import CourseSection from '../../components/ui/CourseSection';
import Newsletter from '../../components/ui/Newsletter';
import Footer from '../../components/layout/Footer';

const Home = () => {
    return (
        <div className="bg-bg-cream min-h-screen">
            <Navbar />
            <Hero />
            <CourseSection />
            <Newsletter />
            <Footer />
        </div>
    );
};

export default Home;