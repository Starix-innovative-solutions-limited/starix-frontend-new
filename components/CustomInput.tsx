/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, EyeOff, Plus, X } from "lucide-react";
import React, { useState } from "react";

type CustomInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  value?: string;
  onChange: (e: any) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  multiple?: boolean;
  tags?: string[]; // ✅ new: controlled tags
  setTags?: React.Dispatch<React.SetStateAction<string[]>>; // ✅ updater for tags
  suggestions?: string[]; // ✅ optional list to suggest from
  options?: string[];
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

  // Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "file" && e.target.files) {
      setFileName(
        multiple
          ? Array?.from(e.target.files)
            .map((f) => f.name)
            .join(", ")
          : e.target.files[0]?.name || ""
      );
    }
    onChange(e);
  };

  // Handle tags input
  const addTag = (tag: string) => {
    if (tag && setTags && tags && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setInputValue("");
  };

  const removeTag = (tag: string) => {
    if (setTags && tags) {
      setTags(tags.filter((t) => t !== tag));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue.trim());
    }
  };

  return (
    <div className="my-4.5">
      <label className="flex flex-col gap-0.5">
        {label && (
          <span className="block mb-1  text-black text-base tracking-normal md:text-lg font-light">
            {label}
          </span>
        )}

        {/* 🔹 File input */}
        {type === "file" ? (
          <div>
            <input
              type="file"
              onChange={handleFileChange}
              multiple={multiple}
              disabled={disabled}
              className="hidden"
              id={label}
              {...rest}
            />
            <p
              className={`flex items-center gap-2 text-sm text-[#999999] bg-[#F5F5F5] border-[0.5px] border-dark/40 w-full rounded-xl px-3 py-2.5 cursor-pointer focus:outline-none focus:ring-0 focus:border-neutral-50 ${className}`}
            >
              <Plus size={18} />
              {fileName || placeholder}
            </p>
          </div>
        ) : type === "tags" ? (
          /* 🔹 Tags input */
          <div className="flex flex-col max-w-fit p-2 gap-2 bg-[#F5F5F5] border-[0.5px] text-sm border-[#99999966] text-[#444] w-full rounded">
            {/* Selected tags */}

            {tags && tags.length > 0 && (
              <span className="mt-1 w-full">
                <span className="grid grid-cols-2 gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full"
                    >
                      {tag}
                      <X
                        size={14}
                        className="cursor-pointer"
                        onClick={() => removeTag(tag)}
                      />
                    </span>
                  ))}
                </span>
              </span>
            )}
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              type="text"
              disabled={disabled}
              className={` px-3 py-2.5 focus:outline-none focus:ring-0 focus:border-neutral-50 ${className}`}
              {...rest}
            />

            {/* Suggestions */}
            {inputValue && suggestions.length > 0 && (
              <div className="bg-white border border-gray-300 rounded shadow-md max-h-40 overflow-y-auto">
                {suggestions
                  .filter(
                    (s) =>
                      s.toLowerCase().includes(inputValue.toLowerCase()) &&
                      !(tags || []).includes(s)
                  )
                  .map((s) => (
                    <div
                      key={s}
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                      onClick={() => addTag(s)}
                    >
                      {s}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ) : type === "select" ? (
          <select
            onChange={onChange}
            className={`bg-[#FFFFFF] rounded-xl border-[0.5px] text-sm border-dark/40 text-[#444] w-full px-3 py-3.5 focus:outline-none focus:ring-0 focus:border-neutral-50 ${className}`}
          >
            {
              options?.map((item: any, i) => (
                <option key={i} value={item?.code}>
                  {item?.name ? item?.name : item}
                </option>
              ))
            }
          </select>
        ) : type === "password" ? (
          <div className="relative">
            <input
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              type={show ? 'text' : "password"}
              disabled={disabled}
              className={`bg-[#FFFFFF] rounded-xl border-[0.5px] text-sm border-dark/40 text-[#444] w-full px-3 py-3.5 focus:outline-[0.7px]  focus:border-neutral-50 ${className}`}
              {...rest}
            />

            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
              tabIndex={-1}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

          </div>
        ) : (
          /* 🔹 Normal input */
          <input
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            className={`bg-[#FFFFFF] rounded-xl border-[0.5px] text-sm border-dark/40 text-[#444] w-full px-3 py-3.5 focus:outline-[0.7px]  focus:border-neutral-50 ${className}`}
            {...rest}
          />
        )}
      </label>
    </div>
  );
};

export default CustomInput;
