import * as React from "react";
import { SearchedVideoType } from "../Utils/TypeDefinations";
import VideoCardShimmer from "./VideoCardShimmer";
import VideoCardHorizontal from "./VideoCardHorizontal";
import errorMark from "../public/errorMark.png";

const QueriedVideosComponent = ({videoList, shouldShowShimmer}: {
    videoList: Array<SearchedVideoType> | undefined,
    shouldShowShimmer: boolean
}) => {
    if(videoList==undefined) {
        return <div className="bg-red-200 p-[2vw] w-[100vw] shadow-inner flex justify-center items-center">
            <img src={errorMark} className="w-[2vw] h-[2vw] m-[1vw]"></img>
            Failed To Load Videos
        </div>
    }
    if (shouldShowShimmer || videoList.length == 0) {
        return (
            <div className="mt-[8vh] md:mt-[12vh] w-full overflow-hidden">
                {
                    [1,2,3,4,5].map((e) => 
                        <div className='flex flex-col w-full'>
                            <div className='w-full'><VideoCardShimmer key={e}/></div>
                        </div>
                    )
                }
            </div>
        )
    }
    return (
        <>
            {
                videoList.map((video: SearchedVideoType) => {
                    return <div className='w-11/12'><VideoCardHorizontal video={video} key={video.id.videoId} /></div>
                })
            }
        </>
    )
}
export default QueriedVideosComponent;