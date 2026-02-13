import { useState } from "react";
import clsx from "clsx";

const Counter = ({ label }: { label: string }) => {
  const [count, setCount] = useState(1);
  const [active, setActive] = useState<"minus" | "plus" | null>(null);

  const handleMinus = () => {
    setActive("minus");
    setCount((p) => Math.max(1, p - 1));
  };

  const handlePlus = () => {
    setActive("plus");
    setCount((p) => p + 1);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="block mb-1  text-black text-base tracking-normal md:text-lg font-light">{label}</label>

      {/* Wrapper */}
      <div className="flex items-center justify-between w-full">
        
        {/* MINUS */}
        <button
          type="button"
          onClick={handleMinus}
          className={clsx(
            "w-12 h-12 flex items-center justify-center rounded-xl text-xl font-normal transition",
            active === "minus"
              ? "border-1 border-dark-navy"
              : "border border-transparent"
          )}
        >
          −
        </button>

        {/* NUMBER (always bordered) */}
        <span className="w-16 h-12 flex items-center justify-center rounded-xl border-1 border-dark-navy text-lg font-medium">
          {count}
        </span>

        {/* PLUS */}
        <button
          type="button"
          onClick={handlePlus}
          className={clsx(
            "w-12 h-12 flex items-center justify-center rounded-xl text-xl font-normal transition",
            active === "plus"
              ? "border-1 border-dark-navy"
              : "border border-transparent"
          )}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
