const Newsletter = () => {
    return (
        <section className="relative bg-[url('https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&h=400&fit=crop')] bg-cover bg-center max-w-300 mx-auto my-12 p-16 rounded-2xl overflow-hidden text-center">
            <div className="absolute inset-0 bg-linear-to-br from-black/75 to-black/60 z-10"></div>
            <div className="relative z-20 max-w-125 mx-auto text-white px-6">
                <span className="block text-sm font-bold tracking-widest mb-4 opacity-90">NEWSLETTER</span>
                <h2 className="text-4xl font-black mb-4">Mau Belajar Lebih Banyak?</h2>
                <p className="text-[15px] mb-8 leading-relaxed opacity-95">
                    Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran spesial dari program-program terbaik hariesok.id
                </p>
                <form className="flex gap-2 max-w-125 mx-auto">
                    <input
                        type="email"
                        placeholder="Masukkan Emailmu"
                        className="flex-1 px-5 py-3.5 border-none rounded-lg text-[15px] outline-none placeholder:text-gray-400"
                    />
                    <button
                        type="submit"
                        className="bg-secondary text-gray-900 px-8 py-3.5 border-none rounded-lg text-sm font-bold hover:bg-[#FFC940] hover:-translate-y-0.5 transition-all"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;