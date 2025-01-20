"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MultiValue } from "react-select";
import { customStyles, OptionType } from "@/app/components/multiSelectStyle";

const Select = dynamic(() => import("react-select"), {
  ssr: false,
});

const options: OptionType[] = [
  { value: "feature1", label: "Feature 1" },
  { value: "feature2", label: "Feature 2" },
  { value: "feature3", label: "Feature 3" },
  { value: "feature4", label: "Feature 4" },
];

export default function LicenseRequest() {
  const [selectedOptions, setSelectedOptions] = useState<
    MultiValue<OptionType>
  >([]);

  return (
    <main className="text-[#E9E9E9] w-full">
      <div className="m-6">
        <p className="font-semibold text-2xl">License Request</p>
        <p className="text-[#757575] mt-1">
          The OEM will get back to you within 3~5 working days.
        </p>
      </div>

      <div className="w-full px-6">
        <form className="bg-[#212529] shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Title</label>
            <input
              className="shadow bg-[#181C1F] rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Duration</label>
            <input
              className="shadow bg-[#181C1F] rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Type</label>
            <select
              defaultValue={"Select a type"}
              className="shadow  bg-[#181C1F] text-white rounded w-full py-2 px-3 focus:ring-[#BCE29E]"
            >
              <option disabled>Select a type</option>
              <option value="title1" className="">
                Type 1
              </option>
              <option value="title2">Type 2</option>
              <option value="title3">Type 3</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Feature</label>
            <Select
              isMulti
              value={selectedOptions}
              onChange={(newValue) => setSelectedOptions(newValue as any)}
              options={options}
              styles={customStyles as any}
              className="text-black"
              placeholder="Select a feature"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Notes</label>
            <textarea
              rows={4}
              className="shadow bg-[#181C1F] rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-between mt-5">
            <button
              className="bg-white hover:bg-white/80 text-[#181C1F] font-semibold py-2 px-6 rounded"
              type="button"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
