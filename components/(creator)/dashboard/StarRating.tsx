"use client";

import { useState } from "react";
import { Star } from "lucide-react";

type StarRatingProps = {
  totalStars?: number;
  initialRating?: number;
  onRate?: (rating: number) => void;
  readOnly?: boolean;
  size?: number; // base size
};

export default function StarRating({
  totalStars = 5,
  initialRating = 0,
  onRate,
  readOnly = false,
  size = 20,
}: StarRatingProps) {
  const [rating, setRating] = useState(initialRating);
  const [hovered, setHovered] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (readOnly) return;
    setRating(index);
    onRate?.(index);
  };

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {Array.from({ length: totalStars }).map((_, index) => {
        const starIndex = index + 1;
        const isFilled = hovered ? starIndex <= hovered : starIndex <= rating;

        return (
          <Star
            key={index}
            onClick={() => handleClick(starIndex)}
            onMouseEnter={() => !readOnly && setHovered(starIndex)}
            onMouseLeave={() => !readOnly && setHovered(null)}
            className={`
              transition-colors duration-200
              ${isFilled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
              ${readOnly ? "cursor-default" : "cursor-pointer"}
              
              /* RESPONSIVE SIZE */
              w-[${size}px] h-[${size}px]
              sm:w-[${size + 4}px] sm:h-[${size + 4}px]
              md:w-[${size + 8}px] md:h-[${size + 8}px]
              lg:w-[${size + 10}px] lg:h-[${size + 10}px]
            `}
          />
        );
      })}
    </div>
  );
}
