"use client";

import React, { useState, DragEvent, ChangeEvent } from "react";
import { RiCloseLine } from "react-icons/ri";

import Image from "next/image";

interface ImageUploaderProps {
    value?: string | null; // preview URL from parent
    onChange?: (file: File) => void;
    label?: string;
    height?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
    value,
    onChange,
    label = "Select From Computer",
    height = 300,
}) => {
    const [localPreview, setLocalPreview] = useState<string | null>(value || null);

    const handleFile = (file: File) => {
        if (!file.type.startsWith("image/")) return;

        const url = URL.createObjectURL(file);
        setLocalPreview(url);

        onChange?.(file);
    };

    const onDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    };

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    return (
        <div className="w-full">
            {localPreview ? (
                <div className="relative">
                    <Image
                        src={localPreview}
                        alt="Uploaded preview"
                        width={100}
                        height={100}
                        className="w-full object-cover rounded-lg border cursor-pointer"
                        style={{ maxHeight: height }}
                        onClick={() => document.getElementById("image-input")?.click()}
                    />

                    <span className="absolute top-3 left-3 bg-secondary-100/20 rounded-full p-2 " onClick={() => setLocalPreview(null)}>
                        <RiCloseLine size={24} color="#fcf4f4" />
                    </span>
                </div>
            ) : (
                <div
                    onDrop={onDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => document.getElementById("image-input")?.click()}
                    className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition cursor-pointer w-full px-3 md:px-5"
                    style={{ minHeight: height }}
                >
                    {/* <HiOutlineDocumentAdd size={64} className="text-gray-400 mb-4" /> */}
                    <Image src="/file-upload.png" alt="fil-upload" width={80} height={80} className="mb-3" />
                    <p className=" text-lg md:text-xl font-medium text-secondary-100 mb-2 text-center">{label}</p>
                    <p className="text-base text-dark">Drop or paste file here</p>

                    <input
                        id="image-input"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={onInputChange}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
