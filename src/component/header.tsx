import '../App.css'
import drugescape from '../assets/drugescape.png'
import { Link} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface HeaderProps{
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  refreshToken: string;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
  isLogin : boolean;
  setIsLogin : React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin : () => void;
}

function Header({accessToken, refreshToken,isLogin, setIsLogin, handleLogin } : HeaderProps){
    const loginheader = Boolean(localStorage.getItem('islogin'));
    const navigate = useNavigate();
    const client_id = import.meta.env.VITE_GOOGLE_LOGIN_ID;
    
   
    const handleLogout = () => {
        fetch('https://drugescape.duckdns.org/drugescape/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
            body: JSON.stringify({ accessToken, refreshToken}),
        })
        .then(() => {
          setIsLogin(false);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        })
        .catch(error => {
          console.error('Logout failed:', error);
        });
      };
    
      



    return(
        <>
         <div id="header">
          <div id="header-menu">
             <div id="header-logo">
                 <Link to="/">
                 <img id="logo" src={drugescape} />
                 </Link> 
             </div>
              <div id="header-index">
                 <ul id="header-ul">
                    <dt>
                        <Link to="/">Home</Link>
                    </dt>
                    {isLogin ? ( 
                     <dt>
                        <Link to="/manage">Manage</Link>
                    </dt>
                     ) : (
                    <dt>
                      <a onClick={() => alert("Login required")}>Manage</a>
                    </dt>
                  )}
                  {isLogin ? (
                     <dt>
                     <Link to="/donate">Donate</Link>
                       </dt>
                    ) : (
                    <dt>
                      <a onClick={() => alert("Login required.")}>Donate</a>
                    </dt>
                  )} 
                     {isLogin ? (
                     <dt>
                     <Link to="/share">Share</Link>
                       </dt>
                   ) : (
                    <dt>
                      <a onClick={() => alert("Login required")}>Share</a>
                    </dt>
                  )}  
                    
                    <dt>
                        <Link to="/map">Map</Link>
                    </dt>
                  {isLogin ? ( 
                     <dt>
                     <Link to="/report">Report</Link>
                 </dt>
                     ) : ( 
                     <dt>
                      <a onClick={() => alert("Login required")}>Report</a>
                    </dt>
                  )}    
                    {isLogin ?(
                        <button id="header-login2" onClick={handleLogout} >Logout</button>
                    ):(
                        <button id="header-login1" onClick={handleLogin} >Login</button>
                    
                    )}
                    
                    <button id="header-mypage" >
                        <Link to="/mypage">My Page</Link>
                    </button>
                  </ul>
                </div>
                 
            </div>
        </div>
        </>
        
    )
}
export default Header;