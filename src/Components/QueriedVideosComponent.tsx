import * as React from "react";
import { SearchedVideoType } from "../Utils/TypeDefinations";
import VideoCardShimmer from "./VideoCardShimmer";
import VideoCardHorizontal from "./VideoCardHorizontal";

const QueriedVideosComponent = ({videoList, shouldShowShimmer}: {
    videoList: Array<SearchedVideoType>,
    shouldShowShimmer: boolean
}) => {
    if (shouldShowShimmer) {
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