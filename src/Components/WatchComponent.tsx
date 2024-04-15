import * as React from 'react';
import { useState } from "react";
import { useParams } from "react-router-dom";
import likeIcon from "../public/like_15.png";
import dislikeIcon from "../public/dislike_10.png";
import Comment from "./Comment";
import { getViews, getTimeUploaded } from "../Utils/converterUtil";
import VideoCard from "./VideoCard";
import VideoCardShimmer from "./VideoCardShimmer";
import compressImg from "../public/expand-arrow.png";
import expandImg from "../public/down.png";
import { CommentType, VideoType } from '../Utils/TypeDefinations';


const WatchComponent = () => {
    const videoId = useParams().id;
    const [videoInfo, setVideoInfo] = useState<VideoType>();
    const [videoComments, setVideoComments] = useState<Array<CommentType>>([]);
    const [videoList, setVideoList] = useState<Array<VideoType>>([]);
    const [showComments, setShowComments] = useState(false);
    const [showVideoRecommendations, setShowSearchSuggestions] = useState(true);
    
    const forceUpdate = () => {
        window.location.reload();
    }

    useState(()=> {
        fetch(process.env.REACT_APP_YOUTUBE_API_URL + "/videos?part=snippet%2CcontentDetails%2Cstatistics&id=" + videoId + "&key=" + process.env.REACT_APP_YOUTUBE_API_KEY)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setVideoInfo(json.items[0]);
            })
            .catch(()=>{console.log("Failed to load")})
            

        fetch(process.env.REACT_APP_YOUTUBE_API_URL + "/commentThreads?part=snippet%2Creplies&videoId=" + videoId + "&key=" + process.env.REACT_APP_YOUTUBE_API_KEY)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setVideoComments(json.items);
            })
            .catch(()=>{console.log("Failed to load")}) 
            
            fetch(process.env.REACT_APP_YOUTUBE_API_URL + "/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=48&regionCode=US&key=" + process.env.REACT_APP_YOUTUBE_API_KEY)
            .then((output) => {
                return output.json();
            })
            .then((list) => {
                const videoListFetched = list.items;
                setVideoList(videoListFetched);
            })
            .catch(()=>{console.log("Failed to load")})
    });

    return (
        <div className="grid grid-cols-12 overflow-hidden overflow-auto no-scrollbar mt-[8vh]">
            <div className="p-2 col-span-12 grid grid-cols-12 w-[100vw]">
                <div className="col-span-12 flex justify-start items-center" >
                    <iframe allowFullScreen src={"https://www.youtube.com/embed/" + videoId + "?rel=0&autoplay=1"}  className="w-[98vw] h-[27vh]" ></iframe>
                </div>
                {
                    (videoInfo === undefined) ? <div>
                            <div className="w-[90vw] h-[4vh] bg-gray-200 m-3"></div>
                        </div> : <div className="col-span-12  grid grid-cols-12 text-xs">
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
                            
                            <div className="bg-gray-200 rounded-md p-1 col-span-12">
                                <div className="pb-4 font-bold text-xs">{getViews(videoInfo?.statistics?.viewCount)} Views | {getTimeUploaded(videoInfo?.snippet?.publishedAt)} ago</div>
                                <p>{String(videoInfo?.snippet?.description)}</p>
                            </div>
                            
                        </div>
                }
                {
                    (videoComments.length === 0)? <div></div> : (!showComments) ? <div className="w-[95vw] bg-gray-200 rounded p-1 m-2 hover:bg-gray-300" onClick={() => {setShowComments(true); setShowSearchSuggestions(false);}}>
                        <div className="flex items-center justify-between">
                            Comments:
                            <img src={expandImg} className="h-5 w-5" ></img> 
                        </div>
                        <Comment comment={videoComments[0]} key={videoComments[0].id} showButtons={false}></Comment>
                    </div> : <div className="col-span-12"> 
                        <div className="flex items-center justify-between">
                            <p className="m-4 text-2xl font-semibold">Comments</p>
                            <img src={compressImg} className="h-5 w-5" onClick={() => {setShowComments(false); setShowSearchSuggestions(true);}}></img> 
                        </div>
                            {

                                videoComments.map((comment: CommentType) => {
                                    return <Comment comment={comment} showButtons={true} key={comment.id}></Comment>
                                })
                            }
                    </div>
                }
            </div>
            <div className="flex flex-col col-span-12">
                {
                    (videoInfo === undefined || videoComments === undefined) ? <div className="w-[75vw] overflow-hidden">
                        {
                            [1,2,3,4,5].map((e) => <VideoCardShimmer key={e}/>)
                        }
                    </div>: showVideoRecommendations ? <div>
                        {
                            videoList.map((video: VideoType, idx: number) => {
                                if (video.id != videoInfo.id){
                                    return <div onClick={()=>{forceUpdate()}} key={idx}><VideoCard video={video}  /></div>
                                }
                            })
                        }
                    </div> : null
                }
            </div>
        </div>
    )
}
export default WatchComponent;