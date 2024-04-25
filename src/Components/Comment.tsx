import * as React from 'react';
import likeIcon from "../public/like_15.png";
import dislikeIcon from "../public/dislike_10.png";
import { getTimeUploaded } from "../Utils/converterUtil";
import { CommentType } from '../Utils/TypeDefinations';

const Comment = ({comment, showButtons} : {
    comment: CommentType,
    showButtons: boolean
}) => {
    return (
        <div className="flex px-5 py-3">
            <img alt="user-icon" src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} className="h-10 w-10 rounded-full mr-3"></img>
            <div>
                <div className="flex justify-start items-center">
                    <p className="mr-2">{comment.snippet.topLevelComment.snippet.authorDisplayName}</p>
                    <p className="ml-2 text-xs  text-gray-500">{getTimeUploaded(comment.snippet.topLevelComment.snippet.publishedAt)}</p>
                </div>
                <div className="break-all w-full">
                    <div>{String(comment.snippet.topLevelComment.snippet.textOriginal)}</div>
                </div>
                {
                    (showButtons) ? <div className="flex justify-start items-center">
                            <div className="pr-1 flex justify-center items-center">
                                <button className="rounded-full hover:bg-gray-200 h-9 w-9 flex justify-center items-center">
                                    <img alt="like" src={likeIcon} className="h-5 w-5"></img>
                                </button>
                                {
                                    (comment.snippet.topLevelComment.snippet.likeCount > 0) ? <span className="text-sm text-gray-500">
                                        {comment.snippet.topLevelComment.snippet.likeCount}
                                    </span> : ""
                                }
                            </div>
                            <button className="pr-1 rounded-full hover:bg-gray-200 h-9 w-9 flex justify-center items-center"><img alt="dislike" src={dislikeIcon} className="h-5 w-5"></img></button>
                            <button className="m-1 p-2 px-4 rounded-full hover:bg-gray-200">Reply</button>
                        </div> : null
                }
            </div>
        </div>
    )
}
export default Comment;