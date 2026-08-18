function ReviewCard({ review }){
    return(
        <div className="review-card">
            <div className="review-header">
                <div className="review-user">
                    <div className="user-avatar">{review.author?.charAt(0).toUpperCase()}</div>
                    <div>
                        <h3>{review.author}</h3>
                        <span>
                        {new Date(review.created_at).toLocaleDateString()}
                        </span>
                    </div>
                </div>
                {review.author_details?.rating && (
                <div className="review-rating">
                    ⭐ {review.author_details.rating}/10
                </div>
                )}
            </div>
            <p className="review-content">
                {review.content}
            </p>
        </div>
    )
}
export default ReviewCard;