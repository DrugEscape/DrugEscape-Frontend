import '../share.css'
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';

interface PostProps{
    view: {title: string; content:string; id: number}[];
    setView: (value: any) => void;
    isChecked: { [key: number]: boolean };
    handleCheckboxChange: (postId:number) => void;
    accessToken: string;
    boardId: number;
    setboardId: (value: any) => void;
} 

function post({view, setView,accessToken, setboardId}:PostProps){
    const navigate = useNavigate();
    const [postcontent, setPostcontent] = useState({
        title : '',
        content : '',
    });

    const [id, setId] = useState(0);

    const getValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPostcontent({
            ...postcontent,
            [name]: value,
        });
        setId(Date.now());
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
                <div id='post-content'>
                    <div id='post-post1'>
                        <p>Community</p>
                    </div>
                    <div id='post-post2'>
                        <p>Title:</p>
                        <input type='text' id='post-input-title' onChange={getValue} name='title'></input>
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
                    const text = parsed.body.textContent || ""; 
                    console.log({ event, editor, data });
                    setPostcontent({
                        ...postcontent,
                        content : text,
                    });
                    setId(Date.now());
                    console.log(postcontent);
                 }}
                    />
                    </div>
                    <button id='post-submit' type='submit' onClick={(e)=>{
                        e.preventDefault();
                        fetch('https://drugescape.duckdns.org/drugescape/share/post', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${accessToken}`, 
                            },
                            body: JSON.stringify(postcontent),
                        })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log('Success:', data);
                            setboardId(data);
                        })

                        setView(view.concat({...postcontent, id}));
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