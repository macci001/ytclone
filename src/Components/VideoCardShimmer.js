const VideoCardShimmer = () => {
    return (
        <div>
            <div className="w-[92vw] h-[25vh] bg-gray-200 m-1 p-4"></div>
            <div className="flex justify-between items-center" >
                <div className="rounded w-10 h-10 rounded-full my-3 mr-1 ml-2 md:my-2 bg-gray-200"></div>
                <div>
                    <div className="w-[60vw] 20 bg-gray-200 m-1 p-2"></div>
                    <div className="w-[60vw] 20 bg-gray-200 m-1 p-2"></div>
                </div>
            </div>
        </div>
    )
};

export default VideoCardShimmer;