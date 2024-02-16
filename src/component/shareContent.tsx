import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {FaHeart} from 'react-icons/fa';
import '../share.css';
import post from './post';
import { useEffect, useState } from 'react';
import dot from '../assets/dot.png';
import go from '../assets/go.png';
// 게시글 클릭시 오는 페이지
interface shareContentProps {
    comment: { [key: string]: string[]; };
    input: string;
    setComment: (comment: { [key: string]: string[]; }) => void;
    setInput: (input: string) => void;
    likes: { [key: number]: boolean };
    setLikes: (likes: { [key: number]: boolean }) => void;
    accessToken: string;
    boardId: number;
    posts: Post[];
    setPosts: (value: any) => void;

}
interface Post{
    title: string;
    content: string;
    id: number;
    memberName: string;
    heartCnt: number;
    commentCnt: number;
    createdAt: string;
    

}
function shareContent({comment, input, setComment, setInput, likes, accessToken,setLikes,setPosts}: shareContentProps){
    const fetchPosts = () => {
        fetch('https://drugescape.duckdns.org/drugescape/share', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            setPosts(res.content);
        });
    }
    const handleLike = (postId:number) => {
        const method = likes[postId] ? 'POST' : 'DELETE';
        fetch(`https://drugescape.duckdns.org/drugescape/share/${location.state.id}/hearts`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            setLikes({
                ...likes,
                [postId]: !likes[postId]
            });
            fetchPosts();
        })
        .catch((error) => console.error('Error:', error));
    }
    
    const [Commentarray, setCommentarray] = useState([]);
    const [servercomment, setServercomment] = useState(null);
    useEffect(() => {
        fetch(`https://drugescape.duckdns.org/drugescape/share/${location.state.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setCommentarray(res.comments);
                console.log(res);
            });
    },[]);
    
        
    
    const handleComment = (e: any) => {
        setInput(e.target.value);
    }
    const postclick = () => {
        console.log(postId);
        setComment({
            ...comment,
            [postId]: [...(comment[postId] || []), input]
        });
        setInput('');
        fetch(`https://drugescape.duckdns.org/drugescape/share/${location.state.id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`, 
            },
            body: JSON.stringify({ content: input })
        })
        .then(() => {
            // POST 요청이 성공적으로 완료된 후에 GET 요청을 보내 Commentarray를 업데이트
            fetch(`https://drugescape.duckdns.org/drugescape/share/${location.state.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                },
            })
            .then((res) => res.json())
            .then((res) => {
                setCommentarray(res.comments);
                console.log(res);
            });
        });
        console.log(location.state.title);
    }
    
    const location = useLocation();
    const postdate = new Date(location.state.id);
    const postId = location.state.id;
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
                <div id='share-content-show1'>
                        <div id='content-title'>
                            <p id="posttitle">{title}</p>
                            <p id="postdate">{location.state.createdAt}</p>
                            <p id='membername'>{location.state.memberName}</p>
                            <p id='heartCnt'>Likes {location.state.heartCnt}</p>
                            <label htmlFor='postlike' id='postlike-label' className={likes[postId] ? 'postlike-red' :'postlike-white'}>
                                <FaHeart id='Faheart' />
                                <input type='checkbox' id='postlike' onClick={()=> handleLike(postId)}></input>
                            </label>
                           
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
                        {Commentarray.map((comment: { content: string; }, index) => (
                        <div id='share-comment2' key={index}>
                            <div id='comment-p1'>
                                 <p>{comment.content}</p>
                             </div>
                         </div>
                        ))}
                    </div>
                    <input type='text' id='share-comment-input' value={input} onChange={handleComment} />
            
                    <button id='share-comment-button' onClick={postclick}>
                    <img src={go} alt='go' id='goimg'/></button>
                   
                   
                </div>
            </div>
        </div>
        </>
    )
}
export default shareContent;