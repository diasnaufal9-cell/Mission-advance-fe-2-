import { create } from 'zustand';

const getStorage = (key, fallback) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    } catch {
        return fallback;
    }
};

const useAuthStore = create((set, get) => ({
    user: getStorage('user', null),
    registeredUsers: getStorage('registeredUsers', []),
    login: (email, password) => {
        const { registeredUsers } = get();
        const normalizedEmail = email.toLowerCase().trim();
        const foundUser = registeredUsers.find(
            (user) =>
                user.email === normalizedEmail &&
                user.password === password
        );
        if (!foundUser) {
            return {
                success: false,
                message: 'Email atau kata sandi salah, atau akun belum terdaftar.'
            };
        }
        const userData = {
            email: foundUser.email,
            name: foundUser.name,
            phone: foundUser.phone
        };
        localStorage.setItem(
            'user',
            JSON.stringify(userData)
        );
        set({
            user: userData
        });
        return {
            success: true,
            message: 'Login berhasil!'
        };
    },
    register: (data) => {
        const { registeredUsers } = get();
        const normalizedEmail = data.email
            .toLowerCase()
            .trim();
        const emailExists = registeredUsers.some(
            (user) => user.email === normalizedEmail
        );
        if (emailExists) {
            return {
                success: false,
                message: 'Email sudah terdaftar! Silakan login.'
            };
        }
        const newUser = {
            name: data.name.trim(),
            email: normalizedEmail,
            phone: data.phone.trim(),
            password: data.password
        };
        const updatedUsers = [
            ...registeredUsers,
            newUser
        ];
        localStorage.setItem(
            'registeredUsers',
            JSON.stringify(updatedUsers)
        );
        const userData = {
            email: newUser.email,
            name: newUser.name,
            phone: newUser.phone
        };
        localStorage.setItem(
            'user',
            JSON.stringify(userData)
        );
        set({
            user: userData,
            registeredUsers: updatedUsers
        });
        return {
            success: true,
            message: 'Pendaftaran berhasil!'
        };
    },
    logout: () => {
        localStorage.removeItem('user');
        set({
            user: null
        });
    }
}));

export default useAuthStore;