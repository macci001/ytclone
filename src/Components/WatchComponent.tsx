import * as React from 'react';
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import likeIcon from "../public/like_15.png";
import dislikeIcon from "../public/dislike_10.png";
import Comment from "./Comment";
import { getViews, getTimeUploaded } from "../Utils/converterUtil";
import VideoCardShimmer from "./VideoCardShimmer";
import compressImg from "../public/expand-arrow.png";
import expandImg from "../public/down.png";
import { CommentType, SearchedVideoType, VideoType } from '../Utils/TypeDefinations';
import VideoCardHorizontal from './VideoCardHorizontal';


const WatchComponent = () => {
    const videoId = useParams().id;
    const [videoInfo, setVideoInfo] = useState<VideoType>();
    const [videoComments, setVideoComments] = useState<Array<CommentType>>([]);
    const [videoList, setVideoList] = useState<Array<SearchedVideoType>>([]);
    const [showComments, setShowComments] = useState(false);
    const [showVideoRecommendations, setShowSearchSuggestions] = useState(true);
    const [isMobile, setIsMobile] = useState(true);
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMobile(false);  
            } 
        }
        handleResize()
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])
    
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
                return json.items[0];
            })
            .then((video) => {
                const query:string = video.snippet.title.split(" ").join("+");
                fetch(process.env.REACT_APP_YOUTUBE_API_URL + "/search?part=snippet&maxResults=25&q=" + query + "&key=" + process.env.REACT_APP_YOUTUBE_API_KEY)
                .then((output) => {
                    return output.json();
                })
                .then((list) => {
                    const videoListFetched = list.items;
                    setVideoList(videoListFetched);
                })
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
    });

    return (
        <div className="grid grid-cols-12 overflow-hidden mt-[8vh] md:mt-[12vh] w-[100vw]">
            <div className="p-2 col-span-12 md:col-span-7 grid grid-cols-12">
                <div className="col-span-12" >
                    <iframe allowFullScreen src={"https://www.youtube.com/embed/" + videoId + "?rel=0&autoplay=1"}  className="w-4/5 h-[45vw] md:h-[30vw]" ></iframe>
                </div>
                <div className='col-span-12 grid grid-cols-12'>
                    {
                        (videoInfo === undefined) ? <div>
                                <div className="w-4/5 h-[10vh] bg-gray-200 m-3"></div>
                            </div> : <div className="col-span-12 grid grid-cols-12 text-xs">
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
                    }
                </div>
            </div>
            <div className='col-span-12 md:col-span-5 grid grid-cols-12'>
                {
                    (videoComments.length === 0)? <div></div> : (!showComments) ? <div className="w-full bg-gray-100 p-2 mt-2 rounded hover:bg-gray-300 col-span-12" onClick={() => {setShowComments(true); setShowSearchSuggestions(false);}}>
                        <div className="flex items-center justify-between">
                            Comments:
                            <img src={expandImg} className="h-5 w-5" ></img> 
                        </div>
                        <Comment comment={videoComments[0]} key={videoComments[0].id} showButtons={false}></Comment>
                    </div> : isMobile ? <div className="col-span-12 w-full"> 
                        <div className="flex items-center justify-between">
                            <p className="m-4 text-2xl font-semibold">Comments</p>
                            <img src={compressImg} className="h-5 w-5" onClick={() => {setShowComments(false); setShowSearchSuggestions(true);}}></img> 
                        </div>
                            {

                                videoComments.map((comment: CommentType) => {
                                    return <Comment comment={comment} showButtons={true} key={comment.id}></Comment>
                                })
                            }
                    </div> : <div className='col-span-12 overflow-auto h-[80vh]' > 
                        <div className="flex items-center justify-between">
                            <p className="m-4 text-2xl font-semibold">Comments</p>
                        </div>
                        {

                            videoComments.map((comment: CommentType) => {
                                return <Comment comment={comment} showButtons={true} key={comment.id}></Comment>
                            })
                        }
                    </div>
                }
            </div>
            
            {
                (videoInfo === undefined || videoComments === undefined) ? <div className="w-full overflow-hidden col-span-12">
                    {
                        [1,2,3,4,5].map((e) => 
                            <div className='flex flex-col w-full'>
                                <div className='w-full'><VideoCardShimmer key={e}/></div>
                            </div>
                        )
                    }
                </div>: showVideoRecommendations ? <div className="col-span-12 flex flex-col items-center w-full">
                    {

                        videoList.map((video: SearchedVideoType, idx: number) => {
                            return <div className="w-4/5" onClick={()=>{forceUpdate()}} key={idx}><VideoCardHorizontal video={video}  /></div>
                        })
                    }
                </div> : null
            }
        </div>
    )
}
export default WatchComponent;