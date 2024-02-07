import './App.css'
import Header from './component/header'
import Manage from './component/manage'
import Home from './component/home'
import Map from './component/Map'
import Donate from './component/Donate'
import Report from './component/report'
import Post from './component/post'
import ShareContent from './component/shareContent'
import Sharemy from './component/sharemy'
import SharemyComment from './component/sharemyComment'
import SharemyLike from './component/sharemyLike'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Share from './component/share'

function App() { 
  
  const [view, setView] = useState<{title: string; content:string; id:number}[]>([]);
  const [data, setData] = useState<Record<string, number>>({
    stopDrug1: 0,
    exercise1: 0,
    meal1: 0,
    medicine1: 0,
  });
  const [likes, setLikes] = useState<{ [key: number]: boolean }>({});
  const handleLike = (postId: number) => {
    setLikes(prevState => ({
        ...prevState,
        [postId]: !prevState[postId]
    }));
}

  const [comment, setComment] = useState<{[key:string]: string[]}>({});
  const [input, setInput] = useState('');
  
  const [isChecked, setIsChecked] = useState<{ [key: number]: boolean }>({});

  const handleCheckboxChange = (postId:number) => {
    setIsChecked(prevState => ({
      ...prevState,
      [postId]: !prevState[postId]
  }));
  };
  const handleChange = (name: string, value: number) => {
     setData(prevData => ({ ...prevData, [name]: value})); // name, value값을 onChange함수에 넣어줌

  }
  const handleSubmit = async () => {
    const serverdata = await axios.post('http://104.196.251.103:8080/drugescape/manage', {
      headers: {
        'Content-Type': 'application/json',
      },
      params: data,  // 데이터를 쿼리 문자열로 전달합니다.
    });
    console.log(serverdata);
  };
  return (
    <>
   <BrowserRouter>
    <div id="container">
      <div id="wrap">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/drugescape/callback' element={<Home />}></Route> 
        <Route path='/manage' element={<Manage onChange={handleChange} onSubmit={handleSubmit}/>}></Route>
        <Route path='/map' element={<Map/>}></Route>
        <Route path='/donate' element={<Donate/>}></Route>
        <Route path='/report' element={<Report/>}></Route>
        <Route path='/share' element={<Share view={view} setView={setView} isChecked={isChecked}/>}></Route>
        <Route path='/create-post' element={<Post view={view} setView={setView} isChecked={isChecked} handleCheckboxChange={handleCheckboxChange}    />}></Route>
        <Route path='/shareContent' element={<ShareContent comment={comment} setComment={setComment} input={input} setInput={setInput}
         likes={likes} setLikes={setLikes} handleLike={handleLike} />}></Route>
        <Route path='/sharemy' element={<Sharemy view={view} setView={setView}/>}></Route>
        <Route path='/sharemyComment' element={<SharemyComment view={view} setView={setView} comment={comment} />}></Route>
        <Route path='/sharemyLike' element={<SharemyLike view={view} setView={setView}
         likes={likes} setLikes={setLikes} handleLike={handleLike} />}></Route>
      </Routes>
      </div>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
