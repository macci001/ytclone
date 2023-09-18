import { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import VideoCardShimmer from "./VideoCardShimmer";

const VideoComponent = () => {
    const [videoList, setVideoList] = useState([]);

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
        <div className="flex overflow-auto no-scrollbar" style={{"height":"100vh"}}>
            {
                videoList === undefined || videoList.length === 0 ?
                    <div>
                        {
                            [1,2,3,4,5].map((ele)=><VideoCardShimmer key={ele}/>)
                        }
                    </div> :
                    <div className="grid grid-cols-12 mx-3 w-[94vw]">
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
