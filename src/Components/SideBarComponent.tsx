import * as React from "react";
import { RootState } from '../Store';
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

const SideBarComponent = () => {
    const dispatch = useDispatch();
    const isSideBarOn = useSelector((store: RootState)=> store.app.isSideBarOn);
    const dispatchToggleSideBar = () => {
        dispatch(toggleSideBar({}));
    }
    
    if(!isSideBarOn) {
        return (<div className="flex-col justify-center items-center sticky top-0">
            <img alt="menu" src={hbmenuImg} className="cursor-pointer h-10 w-10" onClick={dispatchToggleSideBar}/>
        </div>);
    }

    return (
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
    )
}
export default SideBarComponent;