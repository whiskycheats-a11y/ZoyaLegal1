import React from 'react';

const SkeletonAct: React.FC = () => {
    return (
        <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm animate-pulse">
            <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-gray-100 rounded-2xl w-12 h-12"></div>
                <div className="h-6 bg-gray-100 rounded-full w-20"></div>
            </div>
            <div className="h-6 bg-gray-100 rounded-lg w-full mb-4"></div>
            <div className="h-6 bg-gray-100 rounded-lg w-2/3 mb-6"></div>
            <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-100 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-100 rounded w-1/2 mb-6"></div>

            <div className="flex gap-2">
                <div className="flex-1 h-12 bg-gray-100 rounded-xl"></div>
                <div className="w-12 h-12 bg-gray-100 rounded-xl"></div>
            </div>
        </div>
    );
};

export default SkeletonAct;
