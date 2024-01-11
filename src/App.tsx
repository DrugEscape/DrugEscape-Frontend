import './App.css'
import Header from './component/header'
import Manage from './component/manage'
import Home from './component/home'
import Map from './component/Map'
import Donate from './component/Donate'
import Report from './component/report'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function App() { 
  const [data, setData] = useState<Record<string, boolean>>({
    stopDrug1: false,
    stopDrug2: false,
    exercise1: false,
    exercise2: false,
    meal1: false,
    meal2: false,
    meal3: false,
    medicine1: false,
    medicine2: false,
    medicine3: false,
  });
  

  const handleChange = (name: string, value: boolean) => {
     setData(prevData => ({ ...prevData, [name]: value})); // name, value값을 onChange함수에 넣어줌

  }
 const handleSubmit = async () => {
  await axios.post('/api/data', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
  return (
    <>
   <BrowserRouter>
    <div id="container">
      <div id="wrap">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route> 
        <Route path='/manage' element={<Manage onChange={handleChange} onSubmit={handleSubmit}/>}></Route>
        <Route path='/map' element={<Map/>}></Route>
        <Route path='/donate' element={<Donate/>}></Route>
        <Route path='/report' element={<Report/>}></Route>
      </Routes>
      </div>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
