import '../App.css'
import medicine from '../assets/medicine.png'
import { Link} from 'react-router-dom'
import { useState, useEffect } from 'react';

function Header(){
    console.log(window.location.origin);
    const handleLogin = () => {
        const clientId = import.meta.env.VITE_GOOGLE_OAUTH_API_KEY; // .env 파일에서 Google OAuth 클라이언트 ID를 불러옵니다.
        const redirectUri = encodeURIComponent(window.location.origin); // 리다이렉트 URI는 현재 페이지의 원점(프로토콜 + 호스트 + 선택적 포트)입니다.
        const scope = encodeURIComponent('profile email'); // Google 로그인에서 요청할 스코프입니다.
        const responseType = 'token'; // 응답 유형입니다. 'token'은 액세스 토큰을 의미합니다.
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;

        window.location.href = url; // Google 로그인 페이지로 리다이렉트합니다.
        
    };

    return(
        <>
         <div id="header">
          <div id="header-menu">
             <div id="header-logo">
                 <Link to="/">
                 <img id="logo" src={medicine} />
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
                        <Link to="/map">Map</Link>
                    </dt>
                    <dt>
                        <Link to="/donate">Donate</Link>
                    </dt>
                    <button id="header-login1" onClick={handleLogin} >Login</button>
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