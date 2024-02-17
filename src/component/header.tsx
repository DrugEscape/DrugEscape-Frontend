import '../App.css'
import drugescape from '../assets/drugescape.png'
import { Link} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface HeaderProps{
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  refreshToken: string;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
  isLogin : boolean;
  setIsLogin : React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin : () => void;
}

function Header({accessToken, refreshToken, isLogin, setIsLogin, handleLogin } : HeaderProps){
    const loginheader = Boolean(localStorage.getItem('islogin'));
    console.log(loginheader);
    const navigate = useNavigate();
    const client_id = import.meta.env.VITE_GOOGLE_LOGIN_ID;
    console.log(window.location.origin);
   
    console.log(window.location.origin);
    
   
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
          localStorage.setItem('islogin', isLogin.toString());
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
                    {loginheader ? ( 
                     <dt>
                        <Link to="/manage">Manage</Link>
                    </dt>
                     ) : (
                    <dt>
                      <a onClick={() => alert("로그인이 필요합니다.")}>Manage</a>
                    </dt>
                  )}
                  {loginheader ? (
                     <dt>
                     <Link to="/donate">Donate</Link>
                       </dt>
                    ) : (
                    <dt>
                      <a onClick={() => alert("로그인이 필요합니다.")}>Donate</a>
                    </dt>
                  )} 
                     {/* {isLogin ? ( */}
                     <dt>
                     <Link to="/share">Share</Link>
                       </dt>
                     {/* ) : (
                    <dt>
                      <a onClick={() => alert("로그인이 필요합니다.")}>Share</a>
                    </dt>
                  )}  */}
                    
                    <dt>
                        <Link to="/map">Map</Link>
                    </dt>
                  {loginheader ? ( 
                     <dt>
                     <Link to="/report">Report</Link>
                 </dt>
                     ) : ( 
                     <dt>
                      <a onClick={() => alert("로그인이 필요합니다.")}>Report</a>
                    </dt>
                  )}    
                    {loginheader ?(
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