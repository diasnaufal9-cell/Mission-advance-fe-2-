const Hero = () => {
    return (
        <section className="relative bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=500&fit=crop')] bg-cover bg-center max-w-300 mx-auto my-10 p-20 rounded-2xl overflow-hidden min-h-95 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/65 z-10"></div>
            <div className="relative z-20 text-center max-w-300 mx-auto text-white px-6">
                <h1 className="text-4xl font-black mb-5 leading-tight">
                    Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video Interaktif!
                </h1>
                <p className="text-[15px] mb-7 leading-relaxed text-white/95">
                    Temukan ilmu baru yang menarik dan mendalam melalui koleksi video pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat berpartisipasi dalam latihan interaktif yang akan meningkatkan pemahaman Anda.
                </p>
                <a
                    href="#courses"
                    className="inline-block bg-primary text-white px-7 py-3.5 rounded-xl text-[15px] font-bold hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-lg transition-all"
                >
                    Temukan Video Course untuk Dipelajari!
                </a>
            </div>
        </section>
    );
};

export default Hero;