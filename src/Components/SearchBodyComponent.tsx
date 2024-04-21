import * as React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SearchedVideoType } from '../Utils/TypeDefinations';
import QueriedVideosComponent from './QueriedVideosComponent';

const SearchBodyComponent = () => {
    const query = useParams().query;
    const URL = process.env.REACT_APP_YOUTUBE_API_URL + "/search?part=snippet&maxResults=25&q=" + query + "&key=" + process.env.REACT_APP_YOUTUBE_API_KEY;
    const [videoList, setVideoList] = useState<Array<SearchedVideoType> | undefined>([]);

    useEffect(()=>{
        fetch(URL)
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                const tempVideoList: Array<SearchedVideoType> = json.items;
                setVideoList(tempVideoList.filter((video) => String(video.id.kind).includes("video")));
            })
            .catch(() => {
                console.log("Failed to load");
                setVideoList(undefined);
            })
    },[]);

    return (
        <div>
            <div className="mt-[8vh] md:mt-[12vh]">
                <QueriedVideosComponent videoList={videoList} shouldShowShimmer={false} />
            </div>
        </div>
    );
}

export default SearchBodyComponent;