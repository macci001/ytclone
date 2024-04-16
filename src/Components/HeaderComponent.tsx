import * as React from 'react';
import { RootState } from '../Store';
import searchIcon from "../public/54481.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "../Slices/AppSlice";

import hbmenuImg from "../public/hbmenu.webp";
import homeytImg from "../public/home.png";
import subscribeImg from "../public/subscribe.png";
import reelImg from "../public/strip.png";
import libraryImg from "../public/library.png";
import historyImg from "../public/history.png";
import closeImg from "../public/close.png";
import ytLogo from "../public/yt-logo.png";

const HeaderComponent = () => {
    const [search, setSearch] = useState<string>("");
    const [suggestionList, setSuggestionList] = useState<Array<string>>([]);
    const navigate = useNavigate();
    const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
    const dispatch = useDispatch();
    const isSideBarOn = useSelector((store: RootState)=> store.app.isSideBarOn);
    const dispatchToggleSideBar = () => {
        dispatch(toggleSideBar({}));
    }

    useEffect(()=>{
        const suggestionApiCall = setTimeout(()=> {
            fetch("http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=" + search)
            .then((resp) => {
                return resp.text();
            })
            .then((text) => {
                setSuggestionList(JSON.parse(text)?.at(1))
            })
            .catch((e) => {
                console.log("Error in getting suggestions.");
            })
        }, 200)
        
        return () => {
            clearTimeout(suggestionApiCall);
        }
    },[search]);
    
    return (
        <div className="col-span-12 bg-white opacity-100">
            <div className="grid grid-cols-12 p-4 space-between fixed bg-white items-center w-[100vw] h-[8vh] md:h-[12vh]">
                <div className="col-span-1">
                    {
                        !isSideBarOn ? 
                        <div className="flex-col justify-center items-center sticky top-0">
                            <img alt="menu" src={hbmenuImg} className="cursor-pointer h-10 w-10" onClick={dispatchToggleSideBar}/>
                        </div> :
                        <div className="flex-col items-center justify-center absolute z-10 bg-white w-300 h-screen shadow-md overflow-hidden overflow-auto no-scrollbar top-0 left-0 w-[100vw]" >
                            <div className="flex w-50 space-x-7 m-3">
                                <div className="flex justify-center items-center"> 
                                    <img alt="menu" src={closeImg} className="cursor-pointer h-4 w-4" onClick={dispatchToggleSideBar}/>
                                </div>
                            </div>
                            <div className="flex justify-start content-center items-center rounded-md m-2 hover:bg-gray-200">
                                <img alt="home" src={homeytImg} className="m-3 mx-5 cursor-pointer h-6 w-6" />
                                <p className="text-xl">Home</p>
                            </div>
                            <div className="flex justify-start content-center items-center rounded-md m-2 hover:bg-gray-200">
                                <img alt="home" src={subscribeImg} className="m-3 mx-5 cursor-pointer h-6 w-6" />
                                <p className="text-xl">Subscriptions</p>
                            </div>
                            <div className="flex justify-start content-center items-center rounded-md m-2 hover:bg-gray-200">
                                <img alt="home" src={reelImg} className="m-3 mx-5 cursor-pointer h-6 w-6" />
                                <p className="text-xl">Shorts</p>
                            </div>
                            <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                            <div className="flex justify-start content-center items-center rounded-md m-2 hover:bg-gray-200">
                                <img alt="home" src={libraryImg} className="m-3 mx-5 cursor-pointer h-6 w-6" />
                                <p className="text-xl">Library</p>
                            </div>
                            <div className="flex justify-start content-center items-center rounded-md m-2 hover:bg-gray-200">
                                <img alt="home" src={historyImg} className="m-3 mx-5 cursor-pointer h-6 w-6" />
                                <p className="text-xl">History</p>
                            </div>
                        </div>
                    }
                </div>
                <Link to="/" className="col-span-3 md:col-span-2 bg-white ">
                    <img alt="logo" src={ytLogo} className="h-[3vw] w-[15vw] px-5 md:h-[3vw] w-[10vw]"></img>
                </Link>
                <form className="col-span-7 grid grid-cols-8">
                    <input type="text" className="border col-span-6 px-2 rounded-l-full md:px-5 md:col-span-7 md:bg-white md:h-[3vw]" placeholder="SEARCH" onChange={(e) => {setSearch(e.target.value)}} onFocus={()=>{setShowSearchSuggestions(true)}} onBlur={()=>{setShowSearchSuggestions(false)}}/>
                    <button type="submit" className="border col-span-1 rounded-r-full w-10 hover:bg-gray-100" onClick={()=>{if(search.length > 0){navigate("/search/" + search.split(" ").join("+"))}}}><img src={searchIcon} alt="search" className="h-3 w-3 m-auto"></img></button>
                </form>
                <button className="flex items-center justify-center col-span-1 h-[3vw]">
                    <img alt="user-icon" src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png" className="border p-1 rounded-full hover:bg-blue-50 h-[3vw] w-[3vw]"></img>
                </button>
            </div>
            <div >
                {
                        showSearchSuggestions == true ? (search === "" ? null : <div className="bg-white w-[100vw] h-[100vh] fixed top-[8vh] no-scroll">
                        <div className="bg-white col-span-6 border p-3 rounded-lg w-[100vw] h-[100vh]">
                            {
                                suggestionList && suggestionList.length === 0 ? 
                                    <div> {
                                            search.length <= 5 ? search : "..." + search.slice(search.length - 3, search.length) 
                                        } </div> :
                                    <div className="flex flex-col justify-start items-start">{
                                    suggestionList.map((s: any)=>{
                                            return <button className="text-gray-600 hover:font-bold" key={s} onClick={()=>{navigate("/search/" + s.split(" ").join("+"))}}>{s}</button>;
                                    })
                                    }</div>
                            } 
                        </div> </div>)
                        : null
                    }
            </div>
        </div>
    )
}
export default HeaderComponent;