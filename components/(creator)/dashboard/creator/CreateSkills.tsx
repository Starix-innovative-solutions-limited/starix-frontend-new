"use client";

import React, { useState } from "react";
import CustomInput from "@/components/CustomInput";

import { MdOutlineClose } from "react-icons/md";





const CreateSkills = () => {


    const [skills, setSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addSkill();
        }
    };


    const addSkill = () => {
        const value = skillInput.trim();
        if (!value) return;

        const exists = skills.some(
            (skill) => skill.toLowerCase() === value.toLowerCase()
        );
        if (exists) return;

        setSkills((prev) => [...prev, value]);
        setSkillInput("");
    };


    const removeSkill = (skillToRemove: string) => {
        setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
    };



    return (
        <div className="bg-gray-50 flex items-center justify-center md:min-w-lg">
            <div className="w-full rounded-2xl p-8">
                <h2 className="text-xl text-center font-medium text-secondary-100 mb-6">
                    Edit Skills
                </h2>

                <div className="space-y-1">
                    {/* Question Input */}
                    <CustomInput
                        label="Add skills"
                        placeholder="Enter Skills"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        className="mb-2"
                        onKeyDown={handleKeyDown}
                    />



                    <div className="flex flex-wrap gap-3">
                        {
                            skills?.map((item, i) => (
                                <span key={i} className="bg-[#E0E0E099] rounded text-dark px-2 py-1 flex-center gap-3 w-fit">
                                    <span className="text-sm">{item} </span> <MdOutlineClose onClick={() => removeSkill(item)} />
                                </span>
                            ))
                        }
                    </div>



                    <button
                        onClick={addSkill}
                        className="w-full bg-dark-navy text-white py-4 rounded-full text-base font-medium hover:bg-indigo-900 transition-colors mt-8"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateSkills;
