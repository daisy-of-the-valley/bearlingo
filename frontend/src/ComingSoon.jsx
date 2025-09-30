import React from 'react'
import TopNavbar from './components/TopNavbar.jsx';
import SideNavbar from './components/SideNavbar';

const ComingSoon = () => {
  

  return (
    <div className="relative bg-blue-200 min-h-screen">
        <TopNavbar />
      

        <div className="flex relative">
            <div className="mt-4">
                <SideNavbar />
            </div>

            <div className="min-h-screen w-full p-4 flex items-center justify-center">
                <div className="w-full max-w-2xl space-y-8">
                    {/* Coming Soon Content */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md p-12 py-30 px-40 text-center">
                    <div className="space-y-6">
                        <div className="text-6xl" role="img" aria-label="Under construction">
                        🚧
                        </div>

                        <h3 className="text-2xl font-semibold">Coming Soon!</h3>

                        <p className="text-black max-w-md mx-auto">
                        This task is currently under development. Complete Tasks 1 and 2 first
                        and check back soon for more networking challenges!
                        </p>
                    </div>
                    </div>
                </div>
            </div>

        </div>

      
    </div>
  );
};

export default ComingSoon;
