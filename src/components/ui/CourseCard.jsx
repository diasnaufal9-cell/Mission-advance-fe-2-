const CourseCard = ({
    image,
    title,
    desc,
    instructorImage,
    instructorName,
    instructorRole,
    rating,
    reviews,
    price,
    originalPrice,
    onClick,
}) => {
    const getStars = (rating) => {
        if (rating >= 4.5) return "★★★★★";
        if (rating >= 3.5) return "★★★★☆";
        if (rating >= 2.5) return "★★★☆☆";
        return "★★☆☆☆";
    };
    const formatRupiahShort = (angka) => {
        if (angka >= 1000000) {
            return "Rp " + (angka / 1000000).toFixed(1) + "JT";
        }
        return "Rp " + (angka / 1000) + "K";
    };
    return (
        <div 
            onClick={onClick}
            className={`bg-white rounded-xl overflow-hidden border border-gray-200 hover:-translate-y-1 hover:shadow-xl transition-all ${onClick ? 'cursor-pointer' : ''}`}
        >
            <div className="w-full h-50 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
                    {desc}
                </p>
                <div className="flex items-center gap-3 mb-4">
                    <img
                        src={instructorImage}
                        alt={instructorName}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900">
                            {instructorName}
                        </span>
                        <span className="text-xs text-gray-400">
                            {instructorRole}
                        </span>
                    </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                        <span className="text-secondary text-sm">
                            {getStars(Number(rating))}
                        </span>
                        <span className="text-xs text-gray-400">
                            {rating} ({reviews})
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        {originalPrice && (
                            <span className="text-sm text-gray-400 line-through">
                                {formatRupiahShort(originalPrice)}
                            </span>
                        )}
                        <span className="text-lg font-black text-primary">
                            {formatRupiahShort(price)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;