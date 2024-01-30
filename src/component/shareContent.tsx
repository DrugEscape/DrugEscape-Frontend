import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../share.css';
// 게시글 클릭시 오는 페이지
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
    const postdate = new Date(location.state.id);
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
                    <p id='share-content-mypost'>My posts</p>
                    <p id='share-content-mycomment'>My comments</p>
                </div>
                <div id='share-content-title'>
                    <button onClick={handleCreatePost}>+ Create a post</button>
                </div>
                <div id='share-content-show'>
                        <div id='content-title'>
                            <p id="posttitle">{title}</p>
                            <p id="postdate">{postdate.toLocaleDateString()}{postdate.toLocaleTimeString('ko-KR', {hour: '2-digit', minute:'2-digit', second:'2-digit', hour12: false})}</p>
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