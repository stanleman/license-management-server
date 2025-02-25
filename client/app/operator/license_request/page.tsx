"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MultiValue } from "react-select";
import { customStyles, OptionType } from "@/app/components/multiSelectStyle";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

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
  const router = useRouter();
  const [selectedOptions, setSelectedOptions] = useState<
    MultiValue<OptionType>
  >([]);

  useEffect(() => {
    setFormData({ ...formData, "features": selectedOptions.map((option) => option.value) });
  }, [selectedOptions])

  const [formData, setFormData] = useState({
    title: "",
    duration_in_months: 0,
    type: "",
    features: [] as string[],
    notes: ""
  });

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const apiUrl = `http://127.0.0.1:5000/license/`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Something went wrong");

      router.push("/operator/approval_tracker");
      toast("License request submitted.", {type: 'success'})
    } catch (err: any) {
      toast(err.message, {type:"error"});
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="text-[#E9E9E9] w-full">
      <div className="m-6">
        <p className="font-semibold text-2xl">License Request</p>
        <p className="text-[#757575] mt-1">
          The OEM will get back to you within 3~5 working days.
        </p>
      </div>

      <div className="w-full px-6">
        <form className="bg-[#212529] shadow-md rounded-lg px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Title</label>
            <input
              className="shadow bg-[#181C1F] rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text" name="title" onChange={handleChange} value={formData.title} required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Duration (months)</label>
            <input
              className="shadow bg-[#181C1F] rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              type="number" name="duration_in_months" onChange={handleChange} value={formData.duration_in_months} required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Type</label>
            <select
              className="shadow bg-[#181C1F] text-white rounded w-full py-2 px-3 focus:ring-[#BCE29E]"
              name="type" onChange={handleChange} value={formData.type} required
            >
              <option disabled value="">Select a type</option>
              <option value="manufacturing">
                Manufacturing
              </option>
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
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-sm mb-2">Notes</label>
            <textarea
              rows={4}
              className="shadow bg-[#181C1F] rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              name="notes"
              onChange={handleChange}
              value={formData.notes}
              required
            />
          </div>

          <div className="flex items-center justify-between mt-5">
            <button
              className="bg-white hover:bg-white/80 text-[#181C1F] font-semibold py-2 px-6 rounded"
              type="submit"
            >
              {!loading? "Submit": "Loading..."}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
