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

}

function Header({accessToken, setAccessToken, refreshToken, setRefreshToken, isLogin, setIsLogin } : HeaderProps){
    const navigate = useNavigate();
    const client_id = import.meta.env.VITE_GOOGLE_LOGIN_ID;
    console.log(window.location.origin);
    const urlParams = new URLSearchParams(window.location.search);
    const sessionToken = urlParams.get('sessionToken');
    console.log(window.location.origin);
    
    const handleLogin = () => {
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=https://drugescape.duckdns.org/drugescape/callback&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email`;
        window.location.href = url  // Google 로그인 페이지로 리다이렉트합니다.

    };
    
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
        })
        .catch(error => {
          console.error('Logout failed:', error);
        });
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
              console.log(isLogin);
              console.log('Access Token:', accessToken);
            }
          });
        }
      }, [sessionToken]);
      



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
                      <a onClick={() => alert("로그인이 필요합니다.")}>Manage</a>
                    </dt>
                  )}
                   {/* {isLogin ? ( */}
                     <dt>
                     <Link to="/share">Share</Link>
                      </dt>
                    {/* ) : ( */}
                    {/* <dt> */}
                      {/* <a onClick={() => alert("로그인이 필요합니다.")}>Share</a> */}
                    {/* </dt> */}
                  {/* )}  */}
                    
                    
                    <dt>
                        <Link to="/map">Map</Link>
                    </dt>
                    {isLogin ? (
                     <dt>
                     <Link to="/donate">Donate</Link>
                       </dt>
                    ) : (
                    <dt>
                      <a onClick={() => alert("로그인이 필요합니다.")}>Donate</a>
                    </dt>
                  )} 
                   {isLogin ? (
                     <dt>
                     <Link to="/report">Report</Link>
                 </dt>
                    ) : (
                    <dt>
                      <a onClick={() => alert("로그인이 필요합니다.")}>Report</a>
                    </dt>
                  )}      
                    {isLogin ?(
                        <button id="header-login2" onClick={handleLogout} >Logout</button>
                    ):(
                        <button id="header-login1" onClick={handleLogin} >Login</button>
                    
                    )}
                    
                    <button id="header-mypage" >
                        <Link to="/report">My Page</Link>
                    </button>
                  </ul>
                </div>
                 
            </div>
        </div>
        </>
        
    )
}
export default Header;