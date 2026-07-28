import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchCourses,
    createCourse,
    updateCourse,
    removeCourse
} from "../../store/redux/courseSlice";
import Toast from "../../components/ui/Toast";

const Products = () => {
    const dispatch = useDispatch();
    const { courses, loading } = useSelector((state) => state.courses);
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        instructor: "",
        role: "",
        category: "Digital & Teknologi",
        duration: "4 - 8 Jam"
    });
    const [editingId, setEditingId] = useState(null);
    useEffect(() => {
        dispatch(fetchCourses());
    }, [dispatch]);
    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
    };
    const hideToast = () => {
        setToast({ ...toast, show: false });
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleAddProduct = async (e) => {
        e.preventDefault();
        if (!formData.title || !formData.price) {
            showToast("Judul dan Harga wajib diisi!", "error");
            return;
        }
        const newProductData = {
            ...formData,
            price: Number(formData.price),
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
            instructorImage: "https://i.pravatar.cc/150?img=11",
            rating: 0,
            reviews: 0
        };
        try {
            await dispatch(createCourse(newProductData)).unwrap();
            setFormData({
                title: "",
                description: "",
                price: "",
                instructor: "",
                role: "",
                category: "Digital & Teknologi",
                duration: "4 - 8 Jam"
            });
            showToast("Course berhasil ditambahkan!", "success");
        } catch (error) {
            showToast("Gagal menambahkan course: " + error, "error");
        }
    };
    const handleEdit = (product) => {
        setFormData({
            title: product.title,
            description: product.description || "",
            price: product.price.toString(),
            instructor: product.instructor || "",
            role: product.role || "",
            category: product.category || "Digital & Teknologi",
            duration: product.duration || "4 - 8 Jam"
        });
        setEditingId(product.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editingId) return;
        const updatedData = {
            ...formData,
            price: Number(formData.price)
        };
        try {
            await dispatch(updateCourse({ id: editingId, courseData: updatedData })).unwrap();
            setFormData({
                title: "",
                description: "",
                price: "",
                instructor: "",
                role: "",
                category: "Digital & Teknologi",
                duration: "4 - 8 Jam"
            });
            setEditingId(null);
            showToast("Course berhasil diupdate!", "success");
        } catch (error) {
            showToast("Gagal mengupdate course: " + error, "error");
        }
    };
    const handleDelete = async (id) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus course ini?")) return;
        try {
            await dispatch(removeCourse(id)).unwrap();
            showToast("Course berhasil dihapus!", "success");
        } catch (error) {
            showToast("Gagal menghapus course: " + error, "error");
        }
    };
    const handleCancel = () => {
        setFormData({
            title: "",
            description: "",
            price: "",
            instructor: "",
            role: "",
            category: "Digital & Teknologi",
            duration: "4 - 8 Jam"
        });
        setEditingId(null);
    };
    const formatRupiah = (angka) => {
        return "Rp " + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };
    if (loading && courses.length === 0) {
        return <div className="p-8 text-center text-gray-600">Memuat data produk...</div>;
    }
    return (
        <div>
            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={hideToast}
            />
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Manajemen Produk</h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                    {editingId ? "Edit Produk" : "Tambah Produk Baru"}
                </h2>
                <form onSubmit={editingId ? handleUpdate : handleAddProduct}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Judul Produk <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Contoh: Belajar React JS"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nama Instruktur
                            </label>
                            <input
                                type="text"
                                name="instructor"
                                value={formData.instructor}
                                onChange={handleChange}
                                placeholder="Nama Instruktur"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Role Instruktur
                            </label>
                            <input
                                type="text"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                placeholder="Contoh: Software Engineer"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Harga (IDR) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Kategori
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            >
                                <option value="Digital & Teknologi">Digital & Teknologi</option>
                                <option value="Desain & Kreatif">Desain & Kreatif</option>
                                <option value="Pemasaran">Pemasaran</option>
                                <option value="Bisnis & Keuangan">Bisnis & Keuangan</option>
                                <option value="Bahasa">Bahasa</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Durasi
                            </label>
                            <select
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            >
                                <option value="Kurang dari 4 Jam">Kurang dari 4 Jam</option>
                                <option value="4 - 8 Jam">4 - 8 Jam</option>
                                <option value="Lebih dari 8 Jam">Lebih dari 8 Jam</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Deskripsi
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Deskripsi lengkap produk..."
                                rows="3"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                            ></textarea>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-6 justify-end">
                        {editingId && (
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                        )}
                        <button
                            type="submit"
                            className="px-6 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                        >
                            {editingId ? "Update Produk" : "Tambah Produk"}
                        </button>
                    </div>
                </form>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                    Daftar Produk ({courses.length})
                </h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">NO</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">PRODUK</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">HARGA</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">INSTRUKTUR</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">AKSI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((product, index) => (
                                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 px-4 text-sm text-gray-600">{index + 1}</td>
                                    <td className="py-4 px-4">
                                        <h3 className="font-semibold text-gray-800">{product.title}</h3>
                                        <p className="text-sm text-gray-500 mt-1 line-clamp-1">{product.description}</p>
                                    </td>
                                    <td className="py-4 px-4">
                                        <span className="text-primary font-semibold">{formatRupiah(product.price)}</span>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div>
                                            <p className="font-medium text-gray-800">{product.instructor || '-'}</p>
                                            <p className="text-sm text-gray-500">{product.role || '-'}</p>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex gap-2 justify-center">
                                            <button
                                                onClick={() => handleEdit(product)}
                                                className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="px-3 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {courses.length === 0 && (
                        <p className="text-center text-gray-400 py-8">Belum ada produk.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Products;