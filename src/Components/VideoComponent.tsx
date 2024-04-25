import * as React from 'react';
import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { VideoType } from '../Utils/TypeDefinations';
import errorMark from "../public/errorMark.png";
import VideoComponentShimmer from './VideoComponentShimmer';

const VideoComponent = () => {
    const [videoList, setVideoList] = useState<Array<VideoType> | undefined>([]);

    useEffect(function(){
        fetch(process.env.REACT_APP_YOUTUBE_API_URL + "/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=48&regionCode=US&key=" + process.env.REACT_APP_YOUTUBE_API_KEY)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                const videoListFetched = json.items;
                setVideoList(videoListFetched);
            })
            .catch((e) => {
                console.log("Failed to load");
                setVideoList(undefined);
            }) 
    },[]);
    return (
        <div className="flex overflow-y-auto no-scrollbar" style={{"height":"100vh"}}>
            {
                videoList === undefined ?  <div className="bg-red-200 p-[2vw] w-[97vw] h-[8vw] m-0 shadow-inner flex justify-center items-center">
                    <img src={errorMark} className="w-[2vw] h-[2vw] m-[1vw]"></img>
                    Failed To Load Videos
                </div> : videoList.length === 0 ?
                    <VideoComponentShimmer />:
                    <div className="grid grid-cols-12 w-[94vw] overflow-x-hidden no-scrollbar">
                        {
                            videoList.map((video) => {
                                return <VideoCard video={video} key={video.id} />
                            })
                        }
                    </div>

            }

        </div>
    )
}
export default VideoComponent;
