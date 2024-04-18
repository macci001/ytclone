import * as React from 'react';

const VideoCardShimmer = () => {
    return (
        <div className='w-full animate-pulse'>
            <div className="h-[25vh] bg-gray-200 m-1 p-4"></div>
            <div className="flex justify-between items-center" >
                <div className="rounded w-10 h-10 rounded-full my-3 mr-1 ml-2 md:my-2 bg-gray-200"></div>
                <div className='w-4/5'>
                    <div className="bg-gray-200 m-1 p-2"></div>
                    <div className="bg-gray-200 m-1 p-2"></div>
                </div>
            </div>
        </div>
    )
};

export default VideoCardShimmer;