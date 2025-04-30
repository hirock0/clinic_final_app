

import FilterSidebar from '@/components/filters-Sidebar/FilterSidebar';
import React from 'react';

const SearchLayoutPage = ({children}: {children: React.ReactNode}) => {


    return (
        <div className='flex flex-row gap-6 max-w-[1440px] mx-auto w-11/12 py-12 lg:py-20'>
            {/* Filter Sidebar - Fixed height */}
            <div className='w-full lg:w-1/4 h-full sticky top-[180px]'>
                <FilterSidebar />
            </div>
            
            {/* Main Content - Scrollable */}
            <main className='w-full lg:w-3/4 h-full overflow-y-auto'>
                {children}
            </main>
        </div>
    );
};

export default SearchLayoutPage;