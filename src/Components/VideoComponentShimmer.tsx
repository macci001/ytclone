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

const VideoComponentShimmer = () => {
    return (
        <div className='grid grid-cols-9 w-[98vw] overflow-x-hidden'>
            {
                [1,2,3,4,5].map((ele)=><>
                    <div className='col-span-9 md:col-span-3'>
                        <VideoCardShimmer key={ele*10 + 1}/>
                    </div>
                    <div className='col-span-9 md:col-span-3'>
                        <VideoCardShimmer key={ele*10 + 2}/>
                    </div>
                    <div className='col-span-9 md:col-span-3'>
                        <VideoCardShimmer key={ele*10 + 3}/>
                    </div>
                </>)
            }
        </div>
    )
}

export default VideoComponentShimmer;