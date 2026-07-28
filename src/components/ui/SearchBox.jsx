import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../store/redux/courseSlice';

const SearchBox = ({ onSearch }) => {
    const dispatch = useDispatch();
    const handleSearch = (e) => {
        const query = e.target.value;
        dispatch(setSearchQuery(query));
        if (onSearch) {
            onSearch(query);
        }
    };
    return (
        <div className="relative">
            <input
                type="text"
                onChange={handleSearch}
                placeholder="Cari Kelas"
                className="w-64 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-normal text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
            />
            <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
    );
};

export default SearchBox;