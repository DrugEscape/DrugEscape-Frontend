import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../share.css';

interface shareContentProps{
    view: {title: string; content:string;}[];
    setView: (value: any) => void;
}

function shareContent(){
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
            </div>
        </div>
        </>
    )
}
export default shareContent;