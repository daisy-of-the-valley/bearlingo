import React, { useState } from "react";

/** Section 3: Tertiary Education — Tailwind only */
export default function TertiaryEducationCard() {
  const [form, setForm] = useState({
    university: "",
    degrees: "",
    startYear: "",
    endYear: "",
    current: false,
  });

  return (
    <section className="max-w-3xl mx-auto p-6">
      {/* Heading */}
      <h2 className="text-center text-[32px] md:text-4xl font-extrabold text-[#4f9cf9]">
        Section 3: Tertiary Education
      </h2>
      <p className="text-center text-gray-500 font-semibold mt-1">
        Please fill out your details
      </p>

      {/* Card */}
      <div className="mt-5 rounded-2xl border border-gray-300 p-6 md:p-7">
        <p className="text-gray-500 font-semibold mb-4">Tertiary Education</p>

        {/* University */}
        <label className="block text-base font-semibold mb-1">
          University Name
        </label>
        <input
          className="w-full h-10 rounded bg-gray-100 px-3 placeholder:text-gray-400 mb-5 focus:outline-none focus:ring-2 focus:ring-[#4f9cf9]"
          placeholder="Enter your university name"
          value={form.university}
          onChange={(e) => setForm({ ...form, university: e.target.value })}
        />

        {/* Degrees */}
        <label className="block text-base font-semibold mb-1">
          Degree (s) Name
        </label>
        <textarea
          className="w-full h-28 rounded bg-gray-100 px-3 py-2 placeholder:text-gray-400 mb-5 focus:outline-none focus:ring-2 focus:ring-[#4f9cf9]"
          placeholder="e.g., Bachelor of Science in Computer Science, Master of Business Administration"
          value={form.degrees}
          onChange={(e) => setForm({ ...form, degrees: e.target.value })}
        />

        {/* Years */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-base font-semibold mb-1">
              Start Year
            </label>
            <input
              className="w-full h-10 rounded bg-gray-100 px-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4f9cf9]"
              placeholder="2018"
              value={form.startYear}
              onChange={(e) => setForm({ ...form, startYear: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-base font-semibold mb-1">
              End Year
            </label>
            <input
              className={`w-full h-10 rounded bg-gray-100 px-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4f9cf9] ${
                form.current ? "opacity-50 cursor-not-allowed" : ""
              }`}
              placeholder="2022"
              value={form.endYear}
              onChange={(e) => setForm({ ...form, endYear: e.target.value })}
              disabled={form.current}
            />
          </div>
        </div>

        {/* Checkbox */}
        <label className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={form.current}
            onChange={(e) =>
              setForm({
                ...form,
                current: e.target.checked,
                endYear: e.target.checked ? "" : form.endYear,
              })
            }
          />
          Currently studying
        </label>
      </div>
    </section>
  );
}
