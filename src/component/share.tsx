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
    setPosts: (value: any) => void;
    posts: Post[];

}
interface Post{
    title: string;
    content: string;
    id: number;
    memberName: string;
    heartCnt: number;
    commentCnt: number;
    createdAt: string;
    comments: any[];
    

}
function share({view,isChecked,accessToken,posts,setPosts}:ShareProps){
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Post[]>([]);
    
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
   
    useEffect(() => {
        fetchPosts();
        });
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
    const handleSearch = (term: string) => {
        // term을 사용하여 검색을 수행합니다.
        const results = posts.filter((post) => post.title.includes(term));
        setSearchResults(results);
      };
    return(
        <>
        <div id="share">
            <div id="share-head">
                <p id="share-font">Share</p>   
                <p id="share-servefont">Connecting with people</p>
            </div>
            <div id='share-content'>
               
                <div id='share-side'>
                    <input type="text" placeholder='Search for' value={searchTerm} onChange={(e) => {
                        setSearchTerm(e.target.value);
                        handleSearch(e.target.value);
                    }} />
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
                        {(searchTerm ? searchResults : posts).slice(page * postpage, (page + 1) * postpage).map((element, index) =>
                            isChecked[element.id] ? null : (
                            <div id='share-show1' onClick={() => {
                                navigate('/shareContent', {state: {id: element.id, title: element.title, content: element.content, memberName: element.memberName,
                                heartCnt: element.heartCnt, createdAt: element.createdAt, commentsID: element.comments}})
                                console.log(element.id);
                            }} key={index}>
                                <p id='element_id'>{element.title}</p>
                                <p id='element_user'>{element.memberName}</p>
                                <p id='element_Likes'>{element.heartCnt}</p>
                                <p id='element_Comments'>{element.commentCnt}</p>
                                <p id='element_Date'>{element.createdAt}</p>
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