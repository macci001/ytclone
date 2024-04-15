import * as React from 'react';
import { Link } from "react-router-dom";
import { getViews, getTimeUploaded } from "../Utils/converterUtil";
import { VideoType } from '../Utils/TypeDefinations';

const VideoCard = ({video} : {video: VideoType}) => {
   
    return (<Link to={"/watch/" + video.id + "/#"} className="col-span-12 md:col-span-4">
        <div className="cursor-pointer grid grid-cols-8 m-1 p-2 rounded-xl">
            <div className="col-span-8">
                <img src={video?.snippet?.thumbnails?.standard?.url} alt="video-thumbnail" className="w-full h-auto rounded-xl"></img>
            </div>
            <div className="col-span-8 grid grid-cols-8">
                <div className="col-span-1">
                    <img src={video?.snippet?.thumbnails?.standard?.url} alt="video-thumbnail" className="rounded w-10 h-10 rounded-full my-3 mr-1 ml-2 md:my-2 "></img>
                </div>
                <div className="col-span-7 my-3 px-4 md:my-2">
                    <p className="truncate-2-lines break-words font-bold">{video?.snippet?.title}</p>
                    <p className="text-slate-700 text-sm">{video?.snippet?.channelTitle}</p>
                    <div className="flex text-slate-500 text-xs w-full">
                        <p>{getViews(video?.statistics?.viewCount)} views</p>
                        <p>&nbsp; | &nbsp; </p>
                        <p>{getTimeUploaded(video?.snippet?.publishedAt)}ago</p>
                    </div>
                </div>
            </div>
        </div>
    </Link>
    )
}

export default VideoCard;