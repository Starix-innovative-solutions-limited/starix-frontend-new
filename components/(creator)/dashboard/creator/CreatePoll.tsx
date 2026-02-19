"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import CustomInput from "@/components/CustomInput";
import { useModal } from "@/components/GlobalModal";
import FeedBack from "@/components/(creator)/dashboard/FeedBack";

interface PollOption {
  id: number;
  text: string;
}

interface CreatePollProps {
  onSubmit?: (data: { question: string; options: string[] }) => void;
}

const CreatePoll: React.FC<CreatePollProps> = ({
  onSubmit = (data) => console.log(data),
}) => {
  const { open } = useModal();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<PollOption[]>([
    { id: 1, text: "" },
    { id: 2, text: "" },
  ]);

  const addOption = () => {
    setOptions([...options, { id: Date.now(), text: "" }]);
  };

  const removeOption = (id: number) => {
    if (options.length > 2) {
      setOptions(options.filter((opt) => opt.id !== id));
    }
  };

  const updateOption = (id: number, value: string) => {
    setOptions(options.map((opt) => (opt.id === id ? { ...opt, text: value } : opt)));
  };

  const handleSubmit = () => {
    const formattedOptions = options.map((opt) => opt.text.trim());

    onSubmit({
      question: question.trim(),
      options: formattedOptions,
    });

    open(<FeedBack />);
  };

  return (
    <div className=" flex items-center justify-center md:min-w-lg">
      <div className="w-full rounded-2xl  p-8">
        <h2 className="text-xl text-center font-medium text-secondary-100 mb-6">
          Create Poll
        </h2>

        <div className="">
          {/* Question Input */}
          <CustomInput
            label="Question"
            placeholder="Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            
          />

          {/* Options */}
          {options.map((opt, index) => (
            <div key={opt.id} className="space-y-2">
              <div className="flex items-center justify-between ">
                {options.length > 2 && (
                  <button
                    onClick={() => removeOption(opt.id)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <CustomInput
                label={`Option ${index + 1}`}
                placeholder="Enter option"
                value={opt.text}
                onChange={(e) => updateOption(opt.id, e.target.value)}
              />

              {index < options.length - 1 && (
                <div className="border-b border-gray-100 pt-4"></div>
              )}
            </div>
          ))}

          {/* Add More Options */}
          <button
            onClick={addOption}
            className="w-full py-3 text-gray-500 text-base font-medium flex items-center justify-center gap-2 hover:text-gray-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Another Option
          </button>

          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" className="w-5 h-5 border border-dark" />
            <span className="text-secondary-100/70">Allow Multiple Answers.</span>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-950 text-white py-4 rounded-full text-base font-medium hover:bg-indigo-900 transition-colors mt-8"
          >
            Submit Poll
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePoll;
