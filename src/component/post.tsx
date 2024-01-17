import '../share.css'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
interface PostProps{
    view: {title: string; content:string;}[];
    setView: (value: any) => void;

} 
function post({view, setView}:PostProps){
    const navigate = useNavigate();
    
    const [postcontent, setPostcontent] = useState({
        title : '',
        content : ''
    });
    const getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPostcontent({
            ...postcontent,
            [name]: value
        });
        console.log(postcontent);
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
                </div>
                <div id='post-content'>
                    <div id='post-post1'>
                        <p>Community</p>
                    </div>
                    <div id='post-post2'>
                        <p>Title:</p>
                        <input type='text' onChange={getValue} name='title'></input>
                        
                    </div>
                    <div id='post-post3'>
                    <CKEditor
                    editor={ClassicEditor}
                    data="내용을 입력하세요"
                    onReady={editor => {
                    // You can store the "editor" and use when it is needed.
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
                        content : text
                    });
                    console.log(postcontent);
                 }}
                    onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                    console.log('Focus.', editor);
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