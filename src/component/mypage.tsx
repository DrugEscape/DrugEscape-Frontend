import axios from 'axios';
import '../mypage.css';
import { useEffect } from 'react';
import { useState } from 'react';

function mypage() {
  const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [picture, setPicture] = useState('');
    const [totalpoint, setTotalPoint] = useState(0);
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        axios.get('https://drugescape.duckdns.org/drugescape/mypage', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                console.log(response.data);
                setUsername(response.data.name);
                setEmail(response.data.email);
                setPicture(response.data.picture);
                setTotalPoint(response.data.totalDonatedPoints);
            })
            .catch(error => {
                console.error('mypage failed:', error);
            });
    }
  }, []);

    
  return (
    <div id='mypage'>
      
      <img id='userlogo' src={picture} alt='profile'/>
      <p id='username'>반가워요. {username}님</p>
      <p id='useremail'>{email}</p>

      <div id='total-point'>
        <div id='total-named'>
        <p id='total-name'>우리의 모금 기록들</p>
        </div>
        <div id='point-content'>
          <p id='total-points'>Total Points</p>
          <div id='point-content2'>
            <p id='total-points2'>{totalpoint}</p>
            <p id='total-points3'>points</p>
          </div>
          

        </div>
        </div>
    </div>
  );
}
export default mypage;