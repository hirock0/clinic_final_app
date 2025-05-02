import React from 'react';
import { FiFilter, FiX } from 'react-icons/fi';

const FilterSidebar = () => {

    return (
      <section className="max-w-[1440px] w-11/12 mx-auto gap-6 mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4 ">
        <h3 className="text-lg font-semibold flex items-center third-text-color">
          <FiFilter className="mr-2" /> Filter Jobs
        </h3>
        <button 
          className="text-sm text-red-500 hover:text-red-700 flex items-center cursor-pointer main-bg-color px-4 py-2 rounded-full "
        >
          <FiX className="mr-1" /> Reset All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Facility Type Filter */}
        <div>
          <label className="block text-sm font-medium third-text-color mb-1">Facility Type</label>
          <select

            className="w-full px-3 py-2 border border-gray-300 main-bg-color rounded-md"
          >
            <option value="">All Types</option>
          <option key='one1' value='Hospital'>Hospital</option>
          <option key='one2' value='Hospital'>Hospital</option>
          <option key='one3' value='Hospital'>Hospital</option>
      
          </select>
        </div>

        {/* Position Filter */}
        <div>
          <label className="block text-sm font-medium third-text-color mb-1">Position</label>
          <select
 
            className="w-full px-3 py-2 border border-gray-300 rounded-md main-bg-color"
          >
            <option value="">All Positions</option>
              <option key='one4' value='Nurse'>Nurse</option>
              <option key='one5' value='Nurse'>Nurse</option>
              <option key='one6' value='Nurse'>Nurse</option>

          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label className="block text-sm font-medium third-text-color mb-1 ">Location</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md main-bg-color"
          >
            <option value="">All Locations</option>
              <option key='one7' value='Dhaka, Bangladesh'>Dhaka, Bangladesh</option>
              <option key='one8' value='Dhaka, Bangladesh'>Dhaka, Bangladesh</option>
              <option key='one9' value='Dhaka, Bangladesh'>Dhaka, Bangladesh</option>
          </select>
        </div>

        {/* Shift Filter */}
        <div>
          <label className="block text-sm font-medium third-text-color mb-1">Shift</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md main-bg-color"
          >
            <option value="">All Shifts</option>
              <option key='Day1' value='Day'>Day</option>
              <option key='Day2' value='Day'>Night</option>
              <option key='Day3' value='Day'>Fexible</option>
          
          </select>
        </div>

        {/* Start Date Filter */}
        <div>
          <label className="block text-sm font-medium third-text-color mb-1">Start After</label>
          <input
            type="date"
            className="w-full px-3 py-2 border border-gray-300 rounded-md main-bg-color"
          />
        </div>

        {/* Remote Only Toggle */}
        {/* <div className="flex items-end">
          <div className="flex items-center h-[42px]">
            <input
              type="checkbox"
              id="remoteOnly"
              className="h-4 w-4 border-gray-300 rounded"
            />
            <label htmlFor="remoteOnly" className="ml-2 block text-sm third-text-color">
              Remote Only
            </label>
          </div>
        </div> */}
      </div>
    </section>
    );
};

export default FilterSidebar;