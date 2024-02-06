import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../share.css';
// mycomment와 mypost클릭시 오는 페이지
interface ShareProps{
    view: {title: string; content:string; id:number}[];
    setView: (value: any) => void;


}
function sharemyComment({view}:ShareProps){
    const gosharemy = () => {
        navigate('/sharemy');
    }
    const gosharecomment = () =>{
        navigate('/sharemyComment');
    }
    const [page, setPage] = useState(0);
    const postpage =7;
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
                    <p id='share-content-mypost' onClick={gosharemy}>My posts</p>
                    <p id='share-content-mycomment'>My comments</p>
                    <p id='share-content-mylike' onClick={gosharemy}>My likes</p>
                </div>
                <div id='share-side'>
                    <input type='text' placeholder='Search for'></input>
                    <button onClick={handleCreatePost}>+ Create a post</button>
                </div>
                <div id='sharemy-user'>
                     {/* 사용자 정보와 날짜기입 */}
                </div>
                <div id='sharemy-show'>
                    <div id='sharemy-Showtitle'>
                        <p id='share-showpost' onClick={gosharemy}>My posts</p>
                        <p id='share-showcomment' onClick={gosharecomment}>My comments</p>
                        <p id='share-showlike'>My likes</p>
                    </div>
                    <div id='sharemy-myshow'>
                        {view.slice(page * postpage, (page + 1) * postpage).map((element, index) =>
                            <div key={index}>
                                <p onClick={()=>{
                                    navigate('/shareContent', {state: {id: element.id,title: element.title, content: element.content}})
                                    console.log(element.id);
                                }}>{element.title}</p>
                            </div>
                        
                            )}
                    </div>
                </div>
            </div>
            
        </div>
        </>
    )
}
export default sharemyComment;