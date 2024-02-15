import './App.css'
import Header from './component/header'
import Manage from './component/manage'
import Home from './component/home'
import Map from './component/Map'
import Donate from './component/Donate'
import Report from './component/report'
import Post from './component/post'
import ShareContent from './component/shareContent'
import Mypage from './component/mypage'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Share from './component/share'



function App() { 
  
  const client_id = import.meta.env.VITE_GOOGLE_LOGIN_ID;
  const urlParams = new URLSearchParams(window.location.search);
  const sessionToken = urlParams.get('sessionToken');
  const handleLogin = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=https://drugescape.duckdns.org/drugescape/callback&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email`;
    window.location.href = url  // Google 로그인 페이지로 리다이렉트합니다.

};
useEffect(() => {

  if (sessionToken) { 
    console.log('sessionToken:', sessionToken); 
    fetch(`https://drugescape.duckdns.org/drugescape/retrieveTokens?sessionToken=${sessionToken}`, { // URL에 code 쿼리 파라미터 추가
    method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (response.status === 400) { // accessToken이 만료되었음
        return fetch(`http://drugescape.duckdns.org/refresh`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accessToken }),
        })
        .then(res => res.text()) // 새로운 accessToken을 받아옵니다.
        .then(newToken => {
          setIsLogin(true);
          setAccessToken(newToken);
          console.log('New Access Token:', newToken);     
          return newToken;
        });
        
      } else {
        return response.text();
      }
    })
    .then(data => {
      if(data){
        const parsedData = JSON.parse(data);
        const { accessToken, refreshToken } = parsedData;
        setIsLogin(true);
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        localStorage.setItem('accessToken',accessToken);
        console.log(isLogin);
        console.log('Access Token:', accessToken);

        const storedMaxDay = localStorage.getItem('maxDay');
        const storedPointData = localStorage.getItem('pointData');
        const storedDailyGoal = localStorage.getItem('daliygoal');
        const storedWeekdata = localStorage.getItem('weekData');

        if (storedMaxDay) {
          setmaxday(JSON.parse(storedMaxDay));
        }

        if (storedPointData) {
          setpointdata(JSON.parse(storedPointData));
        }

        if (storedDailyGoal) {
          setdailygoal(JSON.parse(storedDailyGoal));
        }

        if (storedWeekdata) {
          setWeekData(JSON.parse(storedWeekdata));
        }
      }
    });
  }
}, [sessionToken]);

  const [isLogin, setIsLogin] = useState(false);
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
  const [reportData, setReportData] = useState<Record<string, number>>({});
  const [weekData, setWeekData] = useState<any[]>([]);
  const [pointdata, setpointdata] = useState<number>(0);
  const [dailygoal, setdailygoal] = useState<number>(0);
const [maxday, setmaxday] = useState<number>(0);
  const weekDataItem = localStorage.getItem('weekData');
  const savedWeekData = weekDataItem ? JSON.parse(weekDataItem) : [];
  const [firstdata, setFirstData] = useState<number>(1);
  const [labeldata, setLabelData] = useState<number[]>([firstdata,firstdata+1,firstdata+2,firstdata+3,firstdata+4,firstdata+5,firstdata+6]);

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
    const getData = await axios.get('https://drugescape.duckdns.org/drugescape/report', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    setWeekData(prevData => {
      let newData = [...prevData, getData.data.dailyGoals];
      if (newData.length > 7) {
        setLabelData(prevData => prevData.map(data => data + 7));
        newData = [getData.data.dailyGoals];
      }
      localStorage.setItem('weekData', JSON.stringify(newData));
      return newData;
    });
    setReportData(getData.data);
    setmaxday(() => {
      const newMaxDay = getData.data.maximumDays;
      localStorage.setItem('savedweekdata', JSON.stringify(newMaxDay));
      return newMaxDay;
    });
    
    setpointdata(() => {
      const newPointData = getData.data.point;
      localStorage.setItem('pointData', JSON.stringify(newPointData));
      return newPointData;
    });
    
    setdailygoal(() =>{
      const newdailygoal = getData.data.dailyGoals;
      localStorage.setItem('daliygoal', JSON.stringify(newdailygoal));
      return newdailygoal
    })
    console.log(getData);
    
  };
  


  return (
    <>
   <BrowserRouter>
    <div id="container">
      <div id="wrap">
      <Header accessToken={accessToken} setAccessToken={setAccessToken} refreshToken={refreshToken} setRefreshToken={setRefreshToken}
                    isLogin={isLogin} setIsLogin={setIsLogin} handleLogin={handleLogin} />
      <Routes>
        <Route path='/' element={<Home handleLogin={handleLogin} isLogin={isLogin}/>}></Route>
        <Route path='/path' element={<Home handleLogin={handleLogin} isLogin={isLogin} />}></Route> 
        <Route path='/manage' element={<Manage onChange={handleChange} onSubmit={handleSubmit}
         selections={managementDTO} setSelections={setSelections}/>}></Route>
        <Route path='/map' element={<Map/>}></Route>
        <Route path='/donate' element={<Donate accessToken={accessToken}  pointdata={pointdata} setpointdata={setpointdata} />}></Route>
        <Route path='/report' element={<Report dailygoal={dailygoal}
         weekdata={weekData}  savedWeekData={savedWeekData} pointdata={pointdata} maxday={maxday} labeldata={labeldata}/>}></Route>
        <Route path='/share' element={<Share view={view} setView={setView} isChecked={isChecked}/>}></Route>
        <Route path='/create-post' element={<Post view={view} setView={setView} isChecked={isChecked} handleCheckboxChange={handleCheckboxChange}    />}></Route>
        <Route path='/shareContent' element={<ShareContent comment={comment} setComment={setComment} input={input} setInput={setInput}
         likes={likes} setLikes={setLikes} handleLike={handleLike} />}></Route>
         <Route path='/mypage' element={<Mypage/>}></Route>
      </Routes>
      </div>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App;
