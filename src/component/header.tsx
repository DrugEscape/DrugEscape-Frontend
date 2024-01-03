import '../App.css'
import medicine from '../assets/medicine.png'
import { Link} from 'react-router-dom'

function Header(){
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
                    <button id="header-login1" >Login</button>
                    <button id="header-mypage" >My Page</button>
                  </ul>
                </div>
                 
            </div>
        </div>
        </>
        
    )
}
export default Header;