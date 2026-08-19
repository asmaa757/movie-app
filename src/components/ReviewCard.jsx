function ReviewCard({ review }){
    return(
        <div className="bg-[#1c1c1c] border border-[#2d2d2d] rounded-xl p-5">
            {/* Header */}
            <div className="flex justify-between items-start gap-4 mb-4">
                {/* User */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#ef1b23] text-white flex items-center justify-center font-bold">
                        {review.author?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">{review.author}</h3>
                        <span className="text-sm text-gray-400">
                        {new Date(review.created_at).toLocaleDateString()}
                        </span>
                    </div>
                </div>
                {/* Rating */}
                {review.author_details?.rating && (
                <div className="text-[#ef1b23] font-semibold">
                    ⭐ {review.author_details.rating}/10
                </div>
                )}
            </div>
            {/* Review */}
            <p className="text-gray-300 leading-7">
                {review.content}
            </p>
        </div>
    )
}
export default ReviewCard;