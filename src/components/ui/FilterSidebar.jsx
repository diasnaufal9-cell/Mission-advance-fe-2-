import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleCategory, setDuration, setPrice, resetFilters } from '../../store/redux/courseSlice';

const FilterSidebar = ({ onToggleCategory, onSetDuration, onSetPrice, onReset }) => {
    const dispatch = useDispatch();
    const [localCategories, setLocalCategories] = useState([]);
    const [localDuration, setLocalDuration] = useState(null);
    const [localPrice, setLocalPrice] = useState('Semua');
    const categories = [
        'Digital & Teknologi',
        'Desain & Kreatif',
        'Pemasaran',
        'Bisnis & Keuangan',
        'Bahasa'
    ];
    const durations = [
        'Kurang dari 4 Jam',
        '4 - 8 Jam',
        'Lebih dari 8 Jam'
    ];
    const prices = ['Semua', 'Gratis', 'Berbayar'];
    const handleToggleCategory = (cat) => {
        setLocalCategories(prev => 
            prev.includes(cat) 
                ? prev.filter(c => c !== cat) 
                : [...prev, cat]
        );
        dispatch(toggleCategory(cat));
        if (onToggleCategory) onToggleCategory(cat);
    };
    const handleSetDuration = (dur) => {
        setLocalDuration(dur);
        dispatch(setDuration(dur));
        if (onSetDuration) onSetDuration(dur);
    };
    const handleSetPrice = (price) => {
        setLocalPrice(price);
        dispatch(setPrice(price));
        if (onSetPrice) onSetPrice(price);
    };
    const handleReset = () => {
        setLocalCategories([]);
        setLocalDuration(null);
        setLocalPrice('Semua');
        dispatch(resetFilters());
        if (onReset) onReset();
    };
    return (
        <aside className="w-72 shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base font-bold text-gray-900">Filter</h3>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="text-sm font-bold text-accent hover:text-accent-dark transition-colors"
                    >
                        Reset
                    </button>
                </div>
                <div className="mb-5">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-bold text-primary">Bidang Studi</span>
                    </div>
                    <div className="space-y-2.5 pl-6">
                        {categories.map((cat) => {
                            const isChecked = localCategories.includes(cat);
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => handleToggleCategory(cat)}
                                    className="flex items-center gap-3 w-full text-left group"
                                >
                                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                                        isChecked 
                                            ? 'bg-primary border-primary' 
                                            : 'bg-white border-gray-300 group-hover:border-primary'
                                    }`}>
                                        {isChecked && (
                                            <span className="text-white text-sm font-bold leading-none">✓</span>
                                        )}
                                    </div>
                                    <span className={`text-sm transition-colors ${
                                        isChecked ? 'text-gray-900 font-semibold' : 'text-gray-600 group-hover:text-gray-900'
                                    }`}>
                                        {cat}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="mb-5 pt-5 border-t border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-bold text-primary">Harga</span>
                    </div>
                    <div className="space-y-2.5 pl-6">
                        {prices.map((price) => {
                            const isChecked = localPrice === price;
                            return (
                                <button
                                    key={price}
                                    type="button"
                                    onClick={() => handleSetPrice(price)}
                                    className="flex items-center gap-3 w-full text-left group"
                                >
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                        isChecked
                                            ? 'border-primary'
                                            : 'border-gray-300 group-hover:border-primary'
                                    }`}>
                                        {isChecked && (
                                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                                        )}
                                    </div>
                                    <span className={`text-sm transition-colors ${
                                        isChecked ? 'text-gray-900 font-semibold' : 'text-gray-600 group-hover:text-gray-900'
                                    }`}>
                                        {price}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="pt-5 border-t border-gray-200">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm font-bold text-primary">Durasi</span>
                    </div>
                    <div className="space-y-2.5 pl-6">
                        {durations.map((dur) => {
                            const isChecked = localDuration === dur;
                            return (
                                <button
                                    key={dur}
                                    type="button"
                                    onClick={() => handleSetDuration(dur)}
                                    className="flex items-center gap-3 w-full text-left group"
                                >
                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                                        isChecked
                                            ? 'border-primary'
                                            : 'border-gray-300 group-hover:border-primary'
                                    }`}>
                                        {isChecked && (
                                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                                        )}
                                    </div>
                                    <span className={`text-sm transition-colors ${
                                        isChecked ? 'text-gray-900 font-semibold' : 'text-gray-600 group-hover:text-gray-900'
                                    }`}>
                                        {dur}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default FilterSidebar;