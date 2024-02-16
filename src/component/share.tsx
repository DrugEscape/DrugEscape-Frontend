import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../share.css';
import dot from '../assets/dot.png';
// 게시글 보여주는 페이지, 게시글 작성시 오는 페이지
interface ShareProps{
    view: {title: string; content:string; id:number}[];
    setView: (value: any) => void;
    isChecked: { [key: number]: boolean };
    accessToken: string;

}
function share({view,isChecked,accessToken}:ShareProps){
    useEffect(() => {
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
            });
        }, []);
    console.log(isChecked);
    const [page, setPage] = useState(0);
    const postpage =8;
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
    const gosharecomment = () =>{
        navigate('/sharemyComment');
    }
    return(
        <>
        <div id="share">
            <div id="share-head">
                <p id="share-font">Share</p>   
                <p id="share-servefont">Connecting with people</p>
            </div>
            <div id='share-content'>
               
                <div id='share-side'>
                    <input type='text' placeholder='Search for'></input>
                    <button id="dot">
                        <img src={dot} alt='dot' id='dotimg'/>
                    </button>
                    <button id='createpost'onClick={handleCreatePost}>+ Create a post</button>
                </div>
                
                <div id='share-content-title'>
                        <p id='t1'>Title</p>
                        <p id='t2'>User</p>
                        <p id='t3'>Likes</p>
                        <p id='t4'>Comments</p>
                        <p id='t5'>Date</p>
                    </div>
                <div id='share-content-show'>
                    {view.slice(page * postpage, (page + 1) * postpage).map((element, index) =>
                        isChecked[element.id] ? null : (
                        <div id='share-show1'onClick={()=>{
                            navigate('/shareContent', {state: {id: element.id,title: element.title, content: element.content}})
                            console.log(element.id);
                            }} key={index}>
                            <p id='element_id'>{element.title}</p>
                            <p id='element_user'>user</p>
                            <p id='element_Likes'>Likes</p>
                            <p id='element_Comments'>Comments</p>
                            <p id='element_Date'>{new Date(element.id).toLocaleDateString('ko-KR', {year: 'numeric', month: '2-digit', day: '2-digit'})} {new Date(element.id).toLocaleTimeString('ko-KR', {hour: '2-digit', minute:'2-digit', second:'2-digit', hour12: false})}</p>
                        </div>
                        )
                    
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