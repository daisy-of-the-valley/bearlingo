import React from "react";

export default function SkillsView({
  selectedSkills, maxSkills,
  filteredSkills, query, setQuery,
  customSkill, setCustomSkill,
  toggleSkill, addCustomSkill,
}) {
  return (
    <section className="max-w-3xl mx-auto p-6">
      <h1 className="text-center text-4xl md:text-5xl font-extrabold text-[#4f9cf9]">
        Section 1: Skill Check List
      </h1>
      <p className="text-center text-gray-500 font-semibold mt-1">
        Please fill out your details
      </p>

      <div className="mt-5 rounded-2xl border border-gray-300 p-6 md:p-7">
        <div className="flex items-center justify-between mb-3">
          <p className="text-gray-600 font-semibold">
            Skill ({selectedSkills.length}/{maxSkills})
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <span className="absolute left-3 top-2.5 text-gray-400">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M21 21l-4.2-4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </span>
          <input
            className="w-full h-9 rounded bg-gray-100 pl-10 pr-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4f9cf9]"
            placeholder="Search skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* List */}
        <div className="max-h-64 sm:max-h-80 overflow-y-auto pr-1 space-y-2 mb-4">
          {filteredSkills.map((skill) => (
            <label key={skill} className="flex items-center gap-2 select-none">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-[#4f9cf9] focus:ring-[#4f9cf9]"
                checked={selectedSkills.includes(skill)}
                onChange={() => toggleSkill(skill)}
              />
              <span>{skill}</span>
            </label>
          ))}
          {filteredSkills.length === 0 && (
            <p className="text-sm text-gray-500">No skills match “{query}”.</p>
          )}
        </div>

        {/* Add custom */}
        <div className="flex items-center gap-2 mb-1 text-gray-600">
          Add your own
        </div>
        <div className="flex gap-2 mb-2">
          <input
            className="flex-1 h-9 rounded bg-gray-100 px-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4f9cf9]"
            placeholder="Enter a custom Skill"
            value={customSkill}
            onChange={(e) => setCustomSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCustomSkill()}
          />
          <button
            onClick={addCustomSkill}
            className="h-9 px-4 rounded bg-[#4f9cf9] text-white font-semibold hover:bg-[#4f9cf9]/90"
          >
            Add
          </button>
        </div>

        <p className="text-xs text-gray-500">
          Use short keywords only (e.g., ‘JavaScript’, ‘Teamwork’), not sentences.
        </p>

        {/* Chips */}
        {selectedSkills.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold mb-2">Selected Skills:</p>
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((s) => (
                <span key={s} className="inline-flex items-center gap-2 px-3 h-8 rounded bg-[#4f9cf9]/15 text-[#4f9cf9] font-semibold">
                  {s}
                  <button
                    className="text-[#4f9cf9]/80 hover:text-[#4f9cf9]"
                    onClick={() => toggleSkill(s)}
                    aria-label={`Remove ${s}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
