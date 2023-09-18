import { Link } from "react-router-dom";
import { getTimeUploaded } from "../Utils/converterUtil";

const VideoCardHorizontal = ({video}) => {
   
    return (<Link to={"/watch/" + video.id.videoId} className="col-span-3" key={video.id.videoId}>
        <div className="cursor-pointer grid grid-cols-9 m-3 p-2 hover:shadow-md rounded-xl">
            <div className="col-span-9">
                <img src={video?.snippet?.thumbnails?.high?.url} alt="video-thumbnail" className="w-full h-auto rounded-xl"></img>
            </div>
            <div className="col-span-9 flex py-2">
                <div className="flex justify-start content-center items-center">
                    <img src={video?.snippet?.thumbnails?.high?.url} alt="video-thumbnail" className="rounded h-10 w-10 rounded-full"></img>
                    <p className="text-slate-700 text-md px-3 truncate-1-lines">{video?.snippet?.channelTitle}</p>
                    <p className="col-span-8 text-sm">{getTimeUploaded(video?.snippet?.publishedAt)}ago</p>
                </div>
            </div>
            <div className="col-span-9">
                <p className="truncate-2-lines break-normal  flex justify-start text-xl font-semibold">{video?.snippet?.title}</p>
            </div>
            <div className="col-span-9 truncate-2-lines text-gray-500">
                <p>{video?.snippet?.description}</p>
            </div>
        </div> 
    </Link>
    )
}

export default VideoCardHorizontal;