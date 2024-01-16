import { useNavigate } from 'react-router-dom';
import '../share.css';
interface ShareProps{
    view: {title: string; content:string;}[];
    setView: (value: any) => void;


}
function share({view, setView}:ShareProps){
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
                    {view.map(element =>
                        <div>
                            <h2>{element.title}</h2>
                        </div>
                        )}
                </div>
            </div>
        </div>
        </>
    )
}
export default share;