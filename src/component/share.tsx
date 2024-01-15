import { useNavigate } from 'react-router-dom';
import '../share.css';
function share(){
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
                    <p>Community</p>
                    <button onClick={handleCreatePost}>+ Create a post</button>
                </div>
                <div id='share-content-show'>
                    
                </div>
            </div>
        </div>
        </>
    )
}
export default share;