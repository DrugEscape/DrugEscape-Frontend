import './App.css'
import Header from './component/header'
import Manage from './component/manage'
import Home from './component/home'
import Map from './component/Map'
import Donate from './component/Donate'
import { BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {  
  
  return (
    <>
   <BrowserRouter>
    <div id="container">
      <div id="wrap">
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route> 
        <Route path='/manage' element={<Manage/>}></Route>
        <Route path='/map' element={<Map/>}></Route>
        <Route path='/donate' element={<Donate/>}></Route>
      </Routes>
      </div>
    </div>
    </BrowserRouter>
    </>
  )
}

export default App
