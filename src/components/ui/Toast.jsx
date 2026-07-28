import { useEffect } from 'react';

const Toast = ({ show, message, type, onClose }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);
    if (!show) return null;
    const isSuccess = type === 'success';
    const bgColor = isSuccess ? 'bg-primary' : 'bg-red-500';
    const icon = isSuccess ? (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    ) : (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
    return (
        <div className={`fixed top-6 right-6 z-9999 flex items-center gap-3 px-5 py-3 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] text-white transform transition-all duration-300 ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'} ${bgColor}`}>
            {icon}
            <span className="text-sm font-semibold">{message}</span>
        </div>
    );
};

export default Toast;