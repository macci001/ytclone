import * as React from 'react';
import { RootState } from '../Store';
import searchIcon from "../public/54481.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SideBarComponent from './SideBarComponent';

const HeaderComponent = () => {
    const [search, setSearch] = useState<string>("");
    const [suggestionList, setSuggestionList] = useState<Array<string>>([]);
    const navigate = useNavigate();
    const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

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
                    <SideBarComponent />
                </div>
                <Link to="/" className="col-span-3 md:col-span-2 bg-white ">
                    <div className="text-[2vw]">MyTube</div>
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
                        showSearchSuggestions == true ? (search === "" ? null : <div className="bg-white w-[100vw] h-[100vh] fixed top-[8vh] md:top-[12vh] no-scroll">
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