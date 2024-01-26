import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../share.css';
import { HTMLInputTypeAttribute, useState } from 'react';

interface shareContentProps {
    comment: { [key: string]: string[]; };
    input: string;
    setComment: (comment: { [key: string]: string[]; }) => void;
    setInput: (input: string) => void;
}
function shareContent({comment, input, setComment, setInput}: shareContentProps){
    const handleComment = (e: any) => {
        setInput(e.target.value);
    }
    const postclick = () => {
        const postId = location.state.id;
        console.log(postId);
        setComment({
            ...comment,
            [postId]: [...(comment[postId] || []), input]
        });
        setInput('');
        console.log(location.state.title);
    }

    const location = useLocation();
    const title = location.state.title;
    const navigate = useNavigate();
    const handleCreatePost = () => {
        navigate('/create-post');
    }
   
    return( 
        <>
         <div id="share">
            <div id="share-head">
                <p id="share-font">Share</p>   
                <p id="share-servefont">Connecting with people</p>
            </div>
            <div id='share-content'>
                <div id="share-content-user">
                    <p>USER Name</p>
                    <p>D+</p>
                </div>
                <div id='share-content-title'>
                    <button onClick={handleCreatePost}>+ Create a post</button>
                </div>
                <div id='share-content-show'>
                        <div id='content-title'>
                            {title}
                        </div>
                        <div id='content-content'>
                            <div id='content-content1'>
                                {location.state.content}
                            </div>
                        </div>
                </div>
                <div id='share-comment'>
                    <div id='share-comment1'>
                        <div id='comment-p'>
                            <p>Comment</p>
                        </div>
                        {comment[location.state.id]?.map((comment, index) => (
                        <div id='share-comment2' key={index}>
                            <div id='comment-p1'>
                                 <p>{comment}</p>
                             </div>
                         </div>
                        ))}
                    </div>
                    <input type='text' id='share-comment-input' value={input} onChange={handleComment} />
            
                    <button id='share-comment-button' onClick={postclick}>Post</button>
                   
                   
                </div>
            </div>
        </div>
        </>
    )
}
export default shareContent;