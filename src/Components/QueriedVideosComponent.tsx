import * as React from "react";
import { SearchedVideoType } from "../Utils/TypeDefinations";
import VideoCardHorizontal from "./VideoCardHorizontal";
import errorMark from "../public/errorMark.png";
import VideoComponentShimmer from "./VideoComponentShimmer";

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
        return <VideoComponentShimmer />
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