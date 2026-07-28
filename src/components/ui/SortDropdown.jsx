import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSortBy } from '../../store/redux/courseSlice';

const SortDropdown = ({ onSort }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();
    const sortOptions = [
        { value: 'default', label: 'Urutkan' },
        { value: 'price-low', label: 'Harga Rendah' },
        { value: 'price-high', label: 'Harga Tinggi' },
        { value: 'a-z', label: 'A to Z' },
        { value: 'z-a', label: 'Z to A' },
        { value: 'rating-high', label: 'Rating Tertinggi' },
    ];
    const [currentSort, setCurrentSort] = useState('default');
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleSelect = (option) => {
        setCurrentSort(option.value);
        dispatch(setSortBy(option.value));
        if (onSort) {
            onSort(option.value);
        }
        setIsOpen(false);
    };
    const getSelectedLabel = () => {
        const option = sortOptions.find(opt => opt.value === currentSort);
        return option ? option.label : 'Urutkan';
    };
    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-normal text-gray-700 hover:border-gray-300 transition-colors"
            >
                {getSelectedLabel()}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {isOpen && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                    {sortOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleSelect(option)}
                            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${currentSort === option.value ? 'bg-primary-light text-primary font-semibold' : 'text-gray-700'
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SortDropdown;