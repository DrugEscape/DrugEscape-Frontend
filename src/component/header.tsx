import '../App.css'
import drugescape from '../assets/drugescape.png'
import { Link} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Header(){
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const client_id = import.meta.env.VITE_GOOGLE_LOGIN_ID;
    const [accessToken, setAccessToken] = useState('null');
    console.log(window.location.origin);
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    const handleLogin = () => {
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=902025458863-clfbloilmkds2mfs5bj6lhjeg0rhh32c.apps.googleusercontent.com&redirect_uri=http://drugescape.duckdns.org/drugescape/callback&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email`;
        window.location.href = url  // Google 로그인 페이지로 리다이렉트합니다.

    };
    
    const handleLogout = () => {
        fetch('http://drugescape.duckdns.org/drugescape/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
            body: JSON.stringify({ accessToken }),
        })
        .then(() => {
          setIsLogin(false);
        })
        .catch(error => {
          console.error('Logout failed:', error);
        });
      };
      useEffect(() => {
        if (code) { 
          
          fetch(`http://drugescape.duckdns.org/drugescape/callback?code=${code}`, { // URL에 code 쿼리 파라미터 추가
          mode: 'no-cors',
          method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(response => {
            if (response.status === 500) { // accessToken이 만료되었음
              return fetch(`http://drugescape.duckdns.org/drugescape/refresh`,{
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
              setIsLogin(true);
              setAccessToken(data);
              console.log('Access Token:', data);
            }
          });
        }
      }, [code]);

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
                    <dt>
                        <Link to="/manage">Manage</Link>
                    </dt>
                    <dt>
                        <Link to="/share">Share</Link>
                    </dt>
                    <dt>
                        <Link to="/map">Map</Link>
                    </dt>
                    <dt>
                        <Link to="/donate">Donate</Link>
                    </dt>
                    <dt>
                        <Link to="/report">Report</Link>
                    </dt>
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