import '../App.css'
import drugescape from '../assets/drugescape.png'
import { Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';



function Header(){
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);
    const client_id = import.meta.env.VITE_GOOGLE_LOGIN_ID;
    console.log(window.location.origin);
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const handleLogin = () => {
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=http://localhost:8080/drugescape/LoginSignup&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email`;

        window.location.href = url; // Google 로그인 페이지로 리다이렉트합니다.
        setIsLogin(true);
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
                        <Link to="/drugescape/LoginSignup">Home</Link>
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