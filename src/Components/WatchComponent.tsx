import * as React from 'react';
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import VideoCardShimmer from "./VideoCardShimmer";
import { CommentType, SearchedVideoType, VideoType } from '../Utils/TypeDefinations';
import VideoCardHorizontal from './VideoCardHorizontal';
import { useElementHeightEqualizer } from '../Utils/useElementHeightEqualizer';
import VideoDescriptionComponent from './VideoDescriptionComponent';
import CommentSection from './CommentSection';
import QueriedVideosComponent from './QueriedVideosComponent';

const WatchComponent = () => {
    const videoId = useParams().id;
    const [videoInfo, setVideoInfo] = useState<VideoType>();
    const [videoComments, setVideoComments] = useState<Array<CommentType>>([]);
    const [videoList, setVideoList] = useState<Array<SearchedVideoType>>([]);
    const [showComments, setShowComments] = useState(false);
    const [showVideoRecommendations, setShowSearchSuggestions] = useState(true);
    const [isMobile, setIsMobile] = useState(true);
    const videoIframeRef = useRef(null);
    const videoDetailsRef = useRef(null);
    const videoCommentsRef = useRef(null);

    useElementHeightEqualizer([
        ["key1", videoIframeRef],
        ["key1", videoDetailsRef],
        ["key2", videoCommentsRef]        
    ])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMobile(false);  
            } else {
                if (!isMobile) {
                    setIsMobile(true);
                    setShowComments(false);
                }
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    })
    
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
                let query:string = video.snippet.title.split(" ").join("+");
                if(query.length > 20) {
                    query = query.substring(0, 20);
                } 
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
                <div className="col-span-12 w-full flex justify-center" >
                    <iframe allowFullScreen src={"https://www.youtube.com/embed/" + videoId + "?rel=0&autoplay=1"}  className="w-11/12 h-[45vw] md:h-[30vw]" ref={videoIframeRef}></iframe>
                </div>
                <div className='col-span-12' ref={videoDetailsRef}>
                    <VideoDescriptionComponent videoInfo={videoInfo} />
                </div>
            </div>
            <div className='col-span-12 md:col-span-4 overflow-auto' ref={videoCommentsRef}>
                <CommentSection 
                    videoComments={videoComments} 
                    showComments={showComments} 
                    isMobile={isMobile}
                    setShowComments={setShowComments}
                    setShowSearchSuggestions={setShowSearchSuggestions} />
            </div>
            <div className="col-span-11 flex flex-col items-center w-full">
                {
                    !showVideoRecommendations ? null : <QueriedVideosComponent videoList={videoList} shouldShowShimmer={videoInfo === undefined || videoComments === undefined || videoList.length == 0} /> 
                }
            </div>
        </div>
    )
}
export default WatchComponent;