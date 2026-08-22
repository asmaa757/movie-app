import { useState } from "react";

function ReviewCard({ review }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongReview = review.content?.length > 300;

  return (
    <div
      className={`bg-(--bg-card) border border-(--review-border) rounded-xl p-5 ${
        isExpanded ? "" : "h-80"
      } flex flex-col`}
    >
      <div className="flex justify-between items-start gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-(--review-accent) text-(--text) flex items-center justify-center font-bold">
            {review.author?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3 className="text-(--text) font-semibold">
              {review.author}
            </h3>

            <span className="text-sm text-(--text-muted)">
              {new Date(review.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        {review.author_details?.rating && (
          <div className="text-(--review-accent) font-semibold">
            ⭐ {review.author_details.rating}/10
          </div>
        )}
      </div>

      <div
        className={`${
          isExpanded ? "" : "max-h-40 overflow-hidden"
        }`}
      >
        <p className="text-(--review-text) leading-7">
          {review.content}
        </p>
      </div>

      {isLongReview && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-auto text-(--review-accent) font-medium hover:underline text-left"
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
}

export default ReviewCard;