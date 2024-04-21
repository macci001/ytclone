import * as React from "react";
import { CommentType } from "../Utils/TypeDefinations";
import Comment from "./Comment";
import compressImg from "../public/expand-arrow.png";
import expandImg from "../public/down.png";

const CommentSection = ({videoComments, showComments, isMobile, setShowComments, setShowSearchSuggestions} : {
    videoComments: Array<CommentType> | undefined,
    showComments: boolean,
    isMobile: boolean,
    setShowComments: ((val:boolean) => void),
    setShowSearchSuggestions: ((val:boolean) => void)
}) => {
    if (videoComments == undefined || videoComments.length == 0) {
        return <div></div>
    }
    if(!showComments && isMobile) {
        return (
            <div className="w-full bg-gray-200 p-2 mt-2 rounded hover:bg-gray-300 col-span-12" onClick={() => {setShowComments(true); setShowSearchSuggestions(false);}}>
                <div className="flex items-center justify-between">
                    Comments:
                    <img src={expandImg} className="h-5 w-5" ></img> 
                </div>
                <Comment comment={videoComments[0]} key={videoComments[0].id} showButtons={false}></Comment>
            </div>
        )
    }
    if(isMobile) {
        return (<div className="w-full"> 
            <div className="flex items-center justify-between">
                <p className="m-4 text-2xl font-semibold">Comments</p>
                <img src={compressImg} className="h-5 w-5" onClick={() => {setShowComments(false); setShowSearchSuggestions(true);}}></img> 
            </div>
                {

                    videoComments.map((comment: CommentType) => {
                        return <Comment comment={comment} showButtons={true} key={comment.id}></Comment>
                    })
                }
        </div>)
    }

    return (<div className='overflow-auto overflow-hidden'  > 
        <div className="flex items-center justify-between">
            <p className="m-4 text-2xl font-semibold">Comments</p>
        </div>
        {

            videoComments.map((comment: CommentType) => {
                return <Comment comment={comment} showButtons={true} key={comment.id}></Comment>
            })
        }
    </div>)
}
export default CommentSection;