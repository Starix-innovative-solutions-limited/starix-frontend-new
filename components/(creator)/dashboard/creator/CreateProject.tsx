"use client";
import React, { useState } from "react";
import CustomInput from "@/components/CustomInput";
import ImageUploader from "@/components/ImageUploader";
import useBreakpoint from "@/hooks/useBreakPoint";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CreateProject = () => {
  const [formPart, setFormPart] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const { isMobile } = useBreakpoint();

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleImage = (file: File) => {
    const url = URL.createObjectURL(file);
    setImage(url);
  };

  const formattedRange = `${range[0].startDate.toLocaleDateString()} - ${range[0].endDate.toLocaleDateString()}`;

  return (
    <div className="bg-white rounded-lg w-full max-md:max-w-[90vw] md:min-w-lg mx-auto min-h-full flex flex-col justify-between md:max-w-2xl">
      {/* Header */}
      <h2 className="text-2xl text-center font-medium text-secondary-100 p-4">
        Create Project
      </h2>

      <div className="px-6 md:px-8 pb-8 flex flex-col gap-4">

        {formPart === 0 ? (
          <>
            <div className="flex p-4 min-w-full">
              <ImageUploader
                height={isMobile ? 230 : 200}
                value={image}
                onChange={handleImage}
                label="Drop or Paste File here"
              />
            </div>

            <CustomInput
              label="Work Description"
              placeholder="Work Description"
              onChange={() => {}}
              className="rounded-lg"
            />

            <CustomInput
              label="Brand Name"
              placeholder="Brand Name"
              onChange={() => {}}
              className="rounded-lg"
            />
          </>
        ) : (
          <>
            <CustomInput
              label="Timeline"
              placeholder="0 weeks"
              onChange={() => {}}
              className="rounded-lg"
            />

            <CustomInput
              label="Project Link"
              placeholder="https://www.example.com/"
              onChange={() => {}}
              className="rounded-lg"
            />

            
<div className="flex flex-col gap-2 relative">
  <label className="text-sm text-secondary-100 font-medium">
    Date Range
  </label>

  <button
    type="button"
    onClick={() => setShowCalendar((p) => !p)}
    className="
      w-full border rounded-lg px-4 py-3
      text-left text-gray-600
      hover:bg-gray-50 transition
      bg-white
    "
  >
    {formattedRange}
  </button>

  {showCalendar && (
    <div
      className="
        absolute z-50 mt-2
        w-full
        max-w-[95vw] md:max-w-[620px]
        bg-white shadow-xl
        rounded-xl border
        overflow-hidden
      "
    >
      {/* CALENDAR WRAPPER */}
      <div className="p-2 md:p-3">
        <DateRange
          editableDateInputs
          onChange={(item: any) => setRange([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={range}
          rangeColors={["#1A1F6B"]}
          direction={isMobile ? "vertical" : "horizontal"}
          className="!w-full"
        />
      </div>

      {/* ACTION FOOTER */}
      <div className="flex justify-end gap-3 border-t p-3 bg-gray-50">
        <button
          type="button"
          onClick={() => setShowCalendar(false)}
          className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={() => {
            if (!range[0].startDate || !range[0].endDate) return;
            setShowCalendar(false);
          }}
          className="
            px-5 py-2 text-sm
            bg-secondary-100 text-white
            rounded-lg
            hover:opacity-95 transition
          "
        >
          Apply Date
        </button>
      </div>
    </div>
  )}
</div>

          </>
        )}

        {/* BUTTONS */}
        {formPart === 0 ? (
          <button
            onClick={() => setFormPart(1)}
            className="
              w-full mt-10
              bg-secondary-100 text-white
              py-5 rounded-full
              text-lg font-medium
              hover:opacity-95 transition
            "
          >
            Next
          </button>
        ) : (
          <>
            <button
              onClick={() => setFormPart(0)}
              className="
                w-full mt-10
                bg-white border border-secondary-100
                text-secondary-100
                py-4 rounded-full
                text-lg font-medium
                hover:bg-gray-50 transition
              "
            >
              Back
            </button>

            <button
              className="
                w-full mt-4
                bg-secondary-100 text-white
                py-4 rounded-full
                text-lg font-medium
                hover:opacity-95 transition
              "
            >
              Save
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateProject;
