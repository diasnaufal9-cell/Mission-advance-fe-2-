import { useState } from "react";
import Toast from "../../components/ui/Toast";

const Users = () => {
    const [toast, setToast] = useState({ show: false, message: "", type: "success" });
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "admin",
            email: "admin@gmail.com",
            phone: "343.366.4866 x822",
            avatar: "https://i.pravatar.cc/40?img=1",
            password: "********",
        },
        {
            id: 2,
            name: "Tes",
            email: "tes@gm.kk",
            phone: "98777778889",
            avatar: "https://i.pravatar.cc/40?img=2",
            password: "********",
        },
        {
            id: 3,
            name: "Tes",
            email: "tes@gm.kk",
            phone: "98777778889",
            avatar: "https://i.pravatar.cc/40?img=3",
            password: "********",
        },
        {
            id: 4,
            name: "Danu",
            email: "window.@gmail.com",
            phone: "81210190374",
            avatar: "https://i.pravatar.cc/40?img=4",
            password: "********",
        },
    ]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        avatar: "",
        password: "",
    });
    const [editingId, setEditingId] = useState(null);
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
    const handleAddUser = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email) {
            showToast("Nama dan Email wajib diisi!", "error");
            return;
        }
        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            avatar: formData.avatar || `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70)}`,
            password: formData.password || "********",
        };
        setUsers([...users, newUser]);
        setFormData({
            name: "",
            email: "",
            phone: "",
            avatar: "",
            password: "",
        });
        
        showToast("User berhasil ditambahkan!", "success");
    };
    const handleEdit = (user) => {
        setFormData({
            name: user.name,
            email: user.email,
            phone: user.phone,
            avatar: user.avatar,
            password: "",
        });
        setEditingId(user.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        const updatedUsers = users.map((user) =>
            user.id === editingId
                ? {
                    ...user,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    avatar: formData.avatar || user.avatar,
                    password: formData.password ? formData.password : user.password,
                }
                : user
        );
        setUsers(updatedUsers);
        setFormData({
            name: "",
            email: "",
            phone: "",
            avatar: "",
            password: "",
        });
        setEditingId(null);
        
        showToast("User berhasil diupdate!", "success");
    };
    const handleDelete = (id) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        showToast("User berhasil dihapus!", "success");
    };
    const handleCancel = () => {
        setFormData({
            name: "",
            email: "",
            phone: "",
            avatar: "",
            password: "",
        });
        setEditingId(null);
    };
    return (
        <div>
            <Toast 
                show={toast.show} 
                message={toast.message} 
                type={toast.type} 
                onClose={hideToast} 
            />
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Manajemen Pengguna</h1>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                    {editingId ? "Edit User" : "Tambah User Baru"}
                </h2>
                <form onSubmit={editingId ? handleUpdate : handleAddUser}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nama Lengkap <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Masukkan nama lengkap"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="email@example.com"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                No. Telepon <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="08123456789"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Avatar URL
                            </label>
                            <input
                                type="url"
                                name="avatar"
                                value={formData.avatar}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password {editingId && <span className="text-gray-400">(kosongkan jika tidak ingin mengubah)</span>}
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder={editingId ? "Masukkan password..." : "Masukkan password..."}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
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
                            {editingId ? "Update User" : "Tambah User"}
                        </button>
                    </div>
                </form>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                    Daftar User ({users.length})
                </h2>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">NO</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">USER INFO</th>
                                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">KONTAK</th>
                                <th className="text-center py-3 px-4 text-sm font-semibold text-gray-600">AKSI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-4 px-4 text-sm text-gray-600">{index + 1}</td>
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={user.avatar}
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-800">{user.name}</p>
                                                <p className="text-xs text-gray-500">User ID: {user.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-4">
                                        <p className="text-sm text-gray-800">{user.email}</p>
                                        <p className="text-xs text-gray-500">{user.phone}</p>
                                    </td>
                                    <td className="py-4 px-4">
                                        <div className="flex gap-2 justify-center">
                                            <button
                                                onClick={() => handleEdit(user)}
                                                className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(user.id)}
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
                    {users.length === 0 && (
                        <p className="text-center text-gray-400 py-8">Belum ada user.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Users;