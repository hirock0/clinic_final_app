import React from 'react';
import { FiSearch, FiMapPin, FiClock, FiBookmark, FiFilter } from 'react-icons/fi';
const FilterSidebar = () => {
    
    return (
          <div className="w-full bg-white p-6 rounded-lg shadow-sm">
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FiFilter className="mr-2" /> Filters
              </h2>
              
              {/* Search */}
              <div className="relative mb-4">
                <FiSearch className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                //   value={searchQuery}
                //   onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Location Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiMapPin className="mr-2" /> Location
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                //   value={filters.location}
                //   onChange={(e) => setFilters({...filters, location: e.target.value})}
                >
                  <option value="">All Locations</option>
                  <option value="New York">New York</option>
                  <option value="Remote">Remote</option>
                  <option value="Manhattan">Manhattan</option>
                  <option value="Brooklyn">Brooklyn</option>
                </select>
              </div>

              {/* Job Type Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiClock className="mr-2" /> Job Type
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                //   value={filters.jobType}
                //   onChange={(e) => setFilters({...filters, jobType: e.target.value})}
                >
                  <option value="">All Types</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              {/* Remote Only */}
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="remoteOnly"
                //   checked={filters.remoteOnly}
                //   onChange={(e) => setFilters({...filters, remoteOnly: e.target.checked})}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remoteOnly" className="ml-2 block text-sm text-gray-700">
                  Remote Only
                </label>
              </div>

              {/* Reset Filters */}
              <button
                // onClick={() => {
                //   setSearchQuery('');
                //   setFilters({
                //     location: '',
                //     jobType: '',
                //     experienceLevel: '',
                //     remoteOnly: false,
                //     salaryRange: ''
                //   });
                // }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Reset all filters
              </button>
            </div>

            {/* Saved Jobs Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <FiBookmark className="mr-2" /> Saved Jobs
              </h2>
              <p className="text-sm text-gray-500">You haven&apos;t saved any jobs yet.</p>
            </div>
          </div>
    );
};

export default FilterSidebar;