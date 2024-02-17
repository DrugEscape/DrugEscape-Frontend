import axios from 'axios';
import '../mypage.css';
import { useEffect } from 'react';
import { useState } from 'react';

function mypage() {
  const [showInput, setShowInput] = useState(false);
  const [username, setUsername] = useState('');
  const [inputValue, setInputValue] = useState(''); 
    const [email, setEmail] = useState('');
    const [picture, setPicture] = useState('');
    const [totalpoint, setTotalPoint] = useState(0);
    const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    
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
  const handleSubmit = () => {
    if (inputValue === '1234') {
      fetch('https://drugescape.duckdns.org/drugescape/admin', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        alert('당신은 이제 관리자입니다');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      alert('비밀번호가 틀렸습니다'); // inputValue가 '1234'가 아닌 경우에 메시지를 표시합니다.
    }
  };

    
  return (
    <div id='mypage'>
      
      <img id='userlogo' src={picture} alt='profile'/>
      <p id='username'>Welcome. {username}</p>
      <p id='useremail'>{email}</p>
      <div id='admin'>
      <button id='adminbtn' onClick={() => setShowInput(!showInput)}>admin</button>
      {showInput && <input type="text" placeholder='password' value={inputValue} onChange={(e) => setInputValue(e.target.value)}></input>}
      {showInput && <button onClick={handleSubmit}>submit</button>}
    </div>

      <div id='total-point'>
        <div id='total-named'>
        <p id='total-name'>All the points we donated</p>
        </div>
        <div id='point-content'>
         
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