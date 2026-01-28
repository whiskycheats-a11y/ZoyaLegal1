import React from 'react';

const SkeletonAdvocate: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 animate-pulse">
            <div className="h-64 md:h-72 bg-gray-200"></div>
            <div className="p-6 md:p-8 space-y-4">
                <div className="h-8 bg-gray-200 rounded-lg w-3/4"></div>
                <div className="flex items-center space-x-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
                <div className="h-12 bg-gray-200 rounded-xl w-full"></div>
                <div className="flex space-x-3">
                    <div className="h-14 bg-gray-200 rounded-2xl flex-1"></div>
                    <div className="h-14 bg-gray-200 rounded-xl flex-1"></div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonAdvocate;
