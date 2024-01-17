import '../App.css'
import medicine from '../assets/medicine.png'
import { Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Header(){
    const navigate = useNavigate();
    const client_id = import.meta.env.VITE_GOOGLE_LOGIN_ID;
    console.log(window.location.origin);
    const handleLogin = () => {
        const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${client_id}&redirect_uri=http://localhost:5173/drugescape/LoginSignup&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile%20https://www.googleapis.com/auth/userinfo.email`;

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
                        <Link to="/share">Share</Link>
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