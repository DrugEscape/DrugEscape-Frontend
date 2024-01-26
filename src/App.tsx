import './App.css'
import Header from './component/header'
import Manage from './component/manage'
import Home from './component/home'
import Map from './component/Map'
import Donate from './component/Donate'
import Report from './component/report'
import Post from './component/post'
import ShareContent from './component/shareContent'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Share from './component/share'

function App() { 
  const [view, setView] = useState<{title: string; content:string; id:number}[]>([]);
  const [data, setData] = useState<Record<string, number>>({
    stopDrug1: 0,
    stopDrug2: 0,
    exercise1: 0,
    exercise2: 0,
    meal1: 0,
    meal2: 0,
    meal3: 0,
    medicine1: 0,
    medicine2: 0,
    medicine3: 0,
  });

  const [comment, setComment] = useState<{[key:string]: string[]}>({});
  const [input, setInput] = useState('');
  

  const handleChange = (name: string, value: number) => {
     setData(prevData => ({ ...prevData, [name]: value})); // name, value값을 onChange함수에 넣어줌

  }
  const handleSubmit = async () => {
    const serverdata = await axios.post('http://localhost:8080/manage', {
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
        <Route path='/drugescape/LoginSignup' element={<Home />}></Route> 
        <Route path='/manage' element={<Manage onChange={handleChange} onSubmit={handleSubmit}/>}></Route>
        <Route path='/map' element={<Map/>}></Route>
        <Route path='/donate' element={<Donate/>}></Route>
        <Route path='/report' element={<Report/>}></Route>
        <Route path='/share' element={<Share view={view} setView={setView}/>}></Route>
        <Route path='/create-post' element={<Post view={view} setView={setView}/>}></Route>
        <Route path='/shareContent' element={<ShareContent comment={comment} setComment={setComment} input={input} setInput={setInput} />}></Route>
      </Routes>
      </div>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
