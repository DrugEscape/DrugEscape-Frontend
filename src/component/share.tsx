import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../share.css';
import { set } from 'mobx';
// 게시글 보여주는 페이지, 게시글 작성시 오는 페이지
interface ShareProps{
    view: {title: string; content:string; id:number}[];
    setView: (value: any) => void;


}
function share({view, setView}:ShareProps){
    const [page, setPage] = useState(0);
    const postpage =7;
    const navigate = useNavigate();
    const totalPages = Math.ceil(view.length / postpage);
    const handlePageClick = (pageNumber: number) => {
        setPage(pageNumber);
    };

    
    const handleCreatePost = () => {
        navigate('/create-post');
    }
    const gosharemy = () => {
        navigate('/sharemy');
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
                    <p id='share-content-mycomment' onClick={gosharemy}>My comments</p>
                </div>
                <div id='share-side'>
                    <input type='text' placeholder='Search for'></input>
                    <button onClick={handleCreatePost}>+ Create a post</button>
                </div>
                <div id='share-content-title'>
                    <p>Community</p>
                    <button onClick={handleCreatePost}>+ Create a post</button>
                </div>
                <div id='share-content-show'>
                    {view.slice(page * postpage, (page + 1) * postpage).map((element, index) =>
                        <div id='share-show1' key={index}>
                            <p onClick={()=>{
                                navigate('/shareContent', {state: {id: element.id,title: element.title, content: element.content}})
                                console.log(element.id);
                            }}>{element.title}</p>
                        </div>
                    
                        )}
                </div>
                <div id='share-page-btn'>
                {Array.from({ length: totalPages }, (_, index) => (
                 <button onClick={() => handlePageClick(index)}>{index + 1}</button>
                    ))}
                </div>
            </div>
            
        </div>
        </>
    )
}
export default share;