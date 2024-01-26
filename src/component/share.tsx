import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../share.css';
import { set } from 'mobx';
interface ShareProps{
    view: {title: string; content:string; id:number}[];
    setView: (value: any) => void;


}
function share({view, setView}:ShareProps){
    const [page, setPage] = useState(0);
    const postpage =7;
    const totalPages = Math.ceil(view.length / postpage);
    const handlePageClick = (pageNumber: number) => {
        setPage(pageNumber);
    };

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