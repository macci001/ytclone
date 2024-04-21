import * as React from 'react';
import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import VideoCardShimmer from "./VideoCardShimmer";
import { VideoType } from '../Utils/TypeDefinations';

const VideoComponent = () => {
    const [videoList, setVideoList] = useState<Array<VideoType>>([]);

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
            }) 
    },[]);
    return (
        <div className="flex overflow-y-auto no-scrollbar" style={{"height":"100vh"}}>
            {
                videoList === undefined || videoList.length === 0 ?
                    <div className='grid grid-cols-9 w-[98vw] overflow-x-hidden'>
                        {
                            [1,2,3,4,5].map((ele)=><>
                                <div className='col-span-9 md:col-span-3'>
                                    <VideoCardShimmer key={ele*10 + 1}/>
                                </div>
                                <div className='col-span-9 md:col-span-3'>
                                    <VideoCardShimmer key={ele*10 + 2}/>
                                </div>
                                <div className='col-span-9 md:col-span-3'>
                                    <VideoCardShimmer key={ele*10 + 3}/>
                                </div>
                            </>)
                        }
                    </div> :
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
