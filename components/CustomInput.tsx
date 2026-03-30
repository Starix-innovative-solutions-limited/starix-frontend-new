/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, EyeOff, Plus, X, ChevronDown } from "lucide-react";
import React, { useState } from "react";

type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any> & {
  label?: string;
  value?: string;
  onChange: (e: any) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
  tags?: string[];
  setTags?: React.Dispatch<React.SetStateAction<string[]>>;
  suggestions?: string[];
  options?: any[];
};

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
  disabled = false,
  className = "",
  multiple = false,
  tags,
  setTags,
  suggestions = [],
  options,
  ...rest
}) => {
  const [fileName, setFileName] = useState<string>("");
  const [inputValue, setInputValue] = useState("");
  const [show, setShow] = useState(false);

  // Unified styles to ensure identical height/size across all types
  const baseStyles = `
    w-full bg-white rounded-xl border border-[#E5E7EB] 
    text-sm text-[#444] px-4 py-3.5 
    focus:outline-none focus:ring-2 focus:ring-[#0033FF] focus:border-transparent 
    transition-all duration-200 disabled:bg-gray-50
    ${className}
  `;

  return (
    <div className="w-full">
      <label className="flex flex-col gap-1.5">
        {label && (
          <span className="text-[15px] font-semibold text-[#4B5563]">
            {label}
          </span>
        )}

        {type === "select" ? (
          <div className="relative w-full">
            <select
              value={value}
              onChange={onChange}
              disabled={disabled}
              className={`${baseStyles} appearance-none pr-10`}
              {...rest}
            >
              {options?.map((item: any, i) => (
                <option key={i} value={item?.code ?? item}>
                  {item?.name ?? item}
                </option>
              ))}
            </select>
            {/* THIS IS THE FIX: Positioned absolute inside the relative container */}
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-[#9CA3AF]">
              <ChevronDown size={18} strokeWidth={2.5} />
            </div>
          </div>
        ) : type === "password" ? (
          <div className="relative w-full">
            <input
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              type={show ? "text" : "password"}
              className={baseStyles}
              disabled={disabled}
              {...rest}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
            >
              {show ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        ) : (
          <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            className={baseStyles}
            disabled={disabled}
            {...rest}
          />
        )}
      </label>
    </div>
  );
};

export default CustomInput;