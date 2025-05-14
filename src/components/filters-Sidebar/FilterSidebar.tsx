import React from "react";
import { FiFilter, FiRefreshCw } from "react-icons/fi";


export default function FilterSidebar({ 
  handleReset,
  showFilter,
  setShowFilter,
  cities,
  selectedFacility,
  selectedFacilityType,
  setSelectedFacilityType,
  facilities,
  jobTypes,
  selectedRole,
  setSelectedRole,
  selectedJobType,
  setSelectedJobType,
  selectedCity,
  setSelectedCity }: any) {

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <button
          className="text-gray-50 cursor-pointer px-4 py-2 rounded flex items-center gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          <FiFilter />
          {showFilter ? "Hide Filters" : "Show Filters"}
        </button>

        <button
          className="text-gray-50 cursor-pointer px-4 py-2 rounded flex items-center gap-2"
          onClick={handleReset}
        >
          <FiRefreshCw />
          Reset All
        </button>
      </div>

      {showFilter && (
        <div className="accent-bg-color p-5 mt-4 rounded gap-5 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4">
          {/* Location */}
          <div>
            <label className="block text-sm font-semibold mb-1">Location</label>
            <input
              name="location"
              list="city-options"
              className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200"
              placeholder="Type or select a city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            />
            <datalist id="city-options">
              {cities.map((city: any, index: any) => (
                <option key={index} value={city} />
              ))}
            </datalist>
          </div>

          {/* Facility Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Job Facility Type*
            </label>
            <select
              value={selectedFacilityType}
              onChange={(e) => setSelectedFacilityType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200 "
            >
              <option value="">Select job facility type</option>
              {facilities.map((type: any, index: any) => (
                <option key={index} value={type.label}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-semibold  text-gray-700 mb-1">
              Job Facility Role*
            </label>
            <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200">
              <option value="">Select job facility role</option>
              {selectedFacility?.options.map((role: any, index: number) => (
                <option key={index} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-semibold mb-1">Job Type</label>
            <select
            value={selectedJobType}
            onChange={(e) => setSelectedJobType(e.target.value)}
            name="jobType" className="w-full px-4 py-2 border border-gray-200 bg-gray-50 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-200">
              <option value="">Select Job Type</option>
              {jobTypes.map((type: any, index: number) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
