import '../share.css'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
// 게시글 작성하는 페이지
interface PostProps{
    view: {title: string; content:string;}[];
    setView: (value: any) => void;
    isChecked: { [key: number]: boolean };
    handleCheckboxChange: (postId:number) => void;

} 
function post({view, setView,isChecked,handleCheckboxChange}:PostProps){
    const navigate = useNavigate();
    const gosharemy = () => {
        navigate('/sharemy');
    }
    const [postcontent, setPostcontent] = useState({
        title : '',
        content : '',
        id:0
    });
    const postId = postcontent.id;
    const getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPostcontent({
            ...postcontent,
            [name]: value,
            id: Date.now(),
        });

       
    };
    return(
        <>
        <form>
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
                    <p id='share-content-mylike' onClick={gosharemy}>My likes</p>
                </div>
                <div id='post-content'>
                    <div id='post-post1'>
                        <p>Community</p>
                    </div>
                    <div id='post-post2'>
                        <p>Title:</p>
                        <input type='text' id='post-input-title' onChange={getValue} name='title'></input>
                        <label htmlFor="diary" id='diary' className='lock'>
                            <FontAwesomeIcon icon={isChecked[postId] ? faLock : faLockOpen} />
                            <input type="checkbox" onChange={()=> handleCheckboxChange(postId)} className='hidden-checkbox'/>
                        </label>
                    </div>
                    <div id='post-post3'>
                    <CKEditor
                    editor={ClassicEditor}
                    data=""
                    onReady={editor => {
                    console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                    const data = editor.getData();
                    const parser = new DOMParser();
                    const parsed = parser.parseFromString(data, 'text/html');
                    const text = parsed.body.textContent || "";  // 데이터 파싱한부분 
                    console.log({ event, editor, data });
                    setPostcontent({
                        ...postcontent,
                        content : text,
                        id: Date.now(),
                    });
                    console.log(postcontent);
                 }}
                    />
                    </div>
                    <button id='post-submit' type='submit' onClick={(e)=>{
                        e.preventDefault();
                        setView(view.concat({...postcontent}));
                        navigate('/share');
                    }}>save </button>
                    <button id='post-cancel' onClick={()=> {
                        navigate('/share');
                    }}>cancel</button>
                </div>
            </div>
        </div>
        </form>
        </>
    )
}
export default post;