import React from 'react';

const SkeletonBlog: React.FC = () => {
    return (
        <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col h-full animate-pulse">
            <div className="relative h-64 bg-gray-200"></div>
            <div className="p-8 md:p-10 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded-lg w-full mb-4"></div>
                <div className="h-8 bg-gray-200 rounded-lg w-3/4 mb-6"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-auto"></div>

                <div className="pt-8 mt-8 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonBlog;
