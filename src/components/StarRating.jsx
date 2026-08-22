import { Star } from "lucide-react";

function StarRating({ value, size }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          fill={value >= star * 2 ? "var(--primary)" : "none"}
          color="var(--primary)"
        />
      ))}
    </div>
  );
}

export default StarRating;