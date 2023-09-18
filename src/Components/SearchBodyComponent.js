import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VideoCardShimmer from "./VideoCardShimmer";
import VideoCardHorizontal from "./VideoCardHorizontal";

const SearchBodyComponent = () => {
    const query = useParams().query;
    const URL = process.env.REACT_APP_YOUTUBE_API_URL + "/search?part=snippet&maxResults=25&q=" + query + "&key=" + process.env.REACT_APP_YOUTUBE_API_KEY;
    const [videoList, setVideoList] = useState(undefined);

    useEffect(()=>{
        fetch(URL)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                setVideoList(json.items);
            })
    },[]);

    return (
        <div>
            {
                (videoList === undefined) ? <div className="mt-[8vh] w-[95vw] overflow-hidden">
                    {
                        [1,2,3,4,5].map((ele)=><VideoCardShimmer key={ele}/>)
                    }
                </div> : <div className="mt-[8vh]">
                    {
                        videoList.map((video) => {
                            if (String(video.id.kind).includes("video"))return <VideoCardHorizontal video={video} key={video.id.videoId} />
                        })
                    }
                </div>
            }
        </div>
    );
}

export default SearchBodyComponent;