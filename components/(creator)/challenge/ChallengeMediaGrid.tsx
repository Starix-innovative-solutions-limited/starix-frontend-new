"use client";

import Image from "next/image";

type ChallengeMediaGridProps = {
  images: string[];
  className?: string;
  emptyLabel?: string;
  roundedClassName?: string;
};

export default function ChallengeMediaGrid({
  images,
  className = "h-[157px]",
  emptyLabel = "No sample media yet",
  roundedClassName = "rounded-[20px] md:rounded-[24px]",
}: ChallengeMediaGridProps) {
  if (images.length === 0) {
    return (
      <div
        className={`flex items-center justify-center bg-[#F5F5F7] text-[11px] font-medium text-[#8B8D98] ${roundedClassName} ${className}`}
      >
        {emptyLabel}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-gray-50 ${roundedClassName} ${className}`}
    >
      <div
        className={`grid h-full w-full gap-0.5 ${
          images.length === 1 ? "grid-cols-1" : "grid-cols-2"
        } ${images.length > 2 ? "grid-rows-2" : "grid-rows-1"}`}
      >
        {images.slice(0, 4).map((img, index) => (
          <div
            key={`${img}-${index}`}
            className={`relative h-full w-full overflow-hidden ${
              images.length === 3 && index === 0 ? "row-span-2" : ""
            }`}
          >
            <Image
              src={img}
              alt="Challenge sample"
              fill
              className="object-cover transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
