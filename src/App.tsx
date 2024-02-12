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
  const client_id = import.meta.env.VITE_GOOGLE_LOGIN_ID;
  const handleLogin = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=https://drugescape.duckdns.org/drugescape/callback&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email`;
    window.location.href = url  // Google 로그인 페이지로 리다이렉트합니다.

};
  const [isLogin, setIsLogin] = useState(false);
  const [Token, setToken] = useState('null');
  const [accessToken, setAccessToken] = useState('null');
  const [refreshToken, setRefreshToken] = useState('null');
  const [view, setView] = useState<{title: string; content:string; id:number}[]>([]);
  
  const [data, setData] = useState<Record<string, number>>({
    stopDrug1: 0,
    exercise1: 0,
    meal1: 0,
    meal2: 0,
    meal3:0,
    medicine1: 0,
    medicine2: 0,
    medicine3: 0,
    medicine4:0,
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
  const [managementDTO, setSelections] = useState<Record<string,number>>({ stopDrug: 0, exercise: 0, meal: 0, medication: 0 });
  const handleSubmit = async () => {
    console.log(managementDTO);
    console.log(accessToken);
    const serverdata = await axios.post('https://drugescape.duckdns.org/drugescape/manage', managementDTO, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    console.log(serverdata);
  };
  return (
    <>
   <BrowserRouter>
    <div id="container">
      <div id="wrap">
      <Header accessToken={accessToken} setAccessToken={setAccessToken} refreshToken={refreshToken} setRefreshToken={setRefreshToken}
                    isLogin={isLogin} setIsLogin={setIsLogin} />
      <Routes>
        <Route path='/' element={<Home handleLogin={handleLogin} isLogin={isLogin}/>}></Route>
        <Route path='/path' element={<Home handleLogin={handleLogin} isLogin={isLogin} />}></Route> 
        <Route path='/manage' element={<Manage onChange={handleChange} onSubmit={handleSubmit}
         selections={managementDTO} setSelections={setSelections}/>}></Route>
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
