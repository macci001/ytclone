import * as React from "react";
import { VideoType } from "../Utils/TypeDefinations";
import { getViews, getTimeUploaded } from "../Utils/converterUtil";
import likeIcon from "../public/like_15.png";
import dislikeIcon from "../public/dislike_10.png";

const VideoDescriptionComponent = ({videoInfo}: {
    videoInfo: VideoType | undefined
}) => {
    if (videoInfo == undefined) {
        return <div className="w-4/5 h-[10vh] bg-gray-200 m-3"></div>
    }


    return (
        <div className="w-full grid grid-cols-12 text-xs">
            <div className="col-span-12">
                <p className="font-semibold text-xl pt-3 pb-6">
                    {videoInfo?.snippet?.title}
                </p>
                <div className="p-1 grid grid-cols-12">
                    <div className="col-span-12 flex justify-start items-center">
                        <img alt="user-icon" src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" className="h-8 w-8 rounded-full mr-7 my-2"></img>
                        <div className="p-1">
                            <p className="font-bold">{videoInfo?.snippet?.channelTitle}</p>
                            <p className="text-gray-500">-- subcribers</p>
                        </div>
                    </div>
                    <div className="col-span-12 flex justify-start items-center my-2">
                        <button className="border rounded-full bg-black text-white text-xs font-semibold p-2 mr-3">Subscribe</button>
                        <div className="flex">
                            <button className="border bg-gray-200 rounded-l-full flex p-2"><span className="font-semibold px-2 text-xs">{getViews(videoInfo?.statistics?.likeCount)}</span><img alt="like" src={likeIcon} className="h-3 w-3"></img></button>
                            <button className="bg-gray-200 rounded-r-full border-s border-black p-2"><img alt="dislike" src={dislikeIcon} className="h-3 w-3"></img></button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="bg-gray-200 rounded-md p-1 w-full col-span-12">
                <div className="pb-4 font-bold text-xs">{getViews(videoInfo?.statistics?.viewCount)} Views | {getTimeUploaded(videoInfo?.snippet?.publishedAt)} ago</div>
                <div className='w-full'>{String(videoInfo?.snippet?.description)}</div>
            </div>
            
        </div>
    )
}   
export default VideoDescriptionComponent;