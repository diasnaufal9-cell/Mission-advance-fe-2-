import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";

const Dashboard = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const [stats] = useState([
        { label: "Total Users ", value: 7, icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z ", bgColor: "bg-blue-100 ", iconColor: "text-blue-500 " },
        { label: "Total Orders ", value: 567, icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z ", bgColor: "bg-green-100 ", iconColor: "text-green-500 " },
        { label: "Total Products ", value: 6, icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4 ", bgColor: "bg-purple-100 ", iconColor: "text-purple-500 " }
    ]);
    const [activities, setActivities] = useState([
        { id: 1, type: "user ", title: "New User Registration ", time: "Recently ", desc: "User 123 has registered. " },
        { id: 2, type: "user ", title: "New User Registration ", time: "Recently ", desc: "User 123 has registered. " },
        { id: 3, type: "product ", title: "Product Update ", time: "Recently ", desc: 'Product "testing " added to catalog.' },
        { id: 4, type: "user ", title: "New User Registration ", time: "Recently ", desc: "User Test has registered. " },
        { id: 5, type: "product ", title: "Product Update ", time: "Recently ", desc: 'Product "Legacy Quality Agent " added to catalog.' }
    ]);
    const handleLogout = () => {
        logout(); // Menggunakan action logout dari Zustand
        navigate('/login');
    };
    const handleDeleteActivity = (id) => {
        setActivities(activities.filter((act) => act.id !== id));
    };
    return (
        <div>
            <div className="flex justify-between items-center mb-8 ">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 ">Dashboard </h1>
                    <p className="text-gray-500 mt-1 ">
                        Selamat datang kembali, <span className="font-semibold text-primary ">{user?.name || 'User'}</span>!
                    </p>
                </div>
                <button onClick={handleLogout} className="px-4 py-2 border border-red-400 text-red-500 rounded-lg hover:bg-red-50 transition-colors ">
                    Logout
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 ">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center gap-4 ">
                        <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                            <svg className={`w-6 h-6 ${stat.iconColor}`} fill="none " stroke="currentColor " viewBox="0 0 24 24 ">
                                <path strokeLinecap="round " strokeLinejoin="round " strokeWidth={2} d={stat.icon} />
                            </svg>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 ">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-800 ">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 ">
                <div className="flex justify-between items-center mb-6 ">
                    <h2 className="text-xl font-bold text-gray-800 ">Recent Activities </h2>
                    <button className="text-sm text-blue-500 hover:underline ">View All Products </button>
                </div>
                <div className="space-y-6 ">
                    {activities.map((activity, index) => (
                        <div key={activity.id} className="flex gap-4 group ">
                            <div className="flex flex-col items-center ">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.type === "user" ? "bg-blue-100" : "bg-purple-100"}`}>
                                    <svg className={`w-4 h-4 ${activity.type === "user" ? "text-blue-500" : "text-purple-500"}`} fill="none " stroke="currentColor " viewBox="0 0 24 24 ">
                                        <path strokeLinecap="round " strokeLinejoin="round " strokeWidth={2} d={activity.type === "user " ? "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z " : "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z "} />
                                    </svg>
                                </div>
                                {index < activities.length - 1 && (<div className="w-px h-full bg-gray-200 mt-2 "></div>)}
                            </div>
                            <div className="flex-1 pb-6 ">
                                <div className="flex justify-between items-start ">
                                    <div>
                                        <h3 className="font-semibold text-gray-800 ">{activity.title}</h3>
                                        <p className="text-sm text-gray-400 ">{activity.time}</p>
                                        <p className="text-sm text-gray-500 mt-1 ">{activity.desc}</p>
                                    </div>
                                    <button onClick={() => handleDeleteActivity(activity.id)} className="text-xs text-red-400 opacity-0 group-hover:opacity-100 hover:text-red-600 transition-opacity ">Hapus</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {activities.length === 0 && (<p className="text-center text-gray-400 py-8 ">Tidak ada aktivitas terbaru. </p>)}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;