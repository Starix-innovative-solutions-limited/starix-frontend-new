"use client";

import { useState } from "react";
import { Star } from "lucide-react";

type StarRatingProps = {
  totalStars?: number; // total number of stars
  initialRating?: number; // default rating
  onRate?: (rating: number) => void; // callback when user clicks
  readOnly?: boolean; // disable interactions
  size?: number; // star size
};

export default function StarRating({
  totalStars = 5,
  initialRating = 0,
  onRate,
  readOnly = false,
  size = 24,
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hovered, setHovered] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (readOnly) return;
    setRating(index);
    onRate?.(index);
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: totalStars }).map((_, index) => {
        const starIndex = index + 1;
        const isFilled = hovered ? starIndex <= hovered : starIndex <= rating;

        return (
          <Star
            key={index}
            onClick={() => handleClick(starIndex)}
            onMouseEnter={() => !readOnly && setHovered(starIndex)}
            onMouseLeave={() => !readOnly && setHovered(null)}
            className={`cursor-pointer transition-colors duration-200 ${
              isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            } ${readOnly ? "cursor-default" : ""}`}
            size={size}
          />
        );
      })}
    </div>
  );
}
