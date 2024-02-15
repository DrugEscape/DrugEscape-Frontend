import axios from 'axios';
import '../mypage.css';
import { useEffect } from 'react';
import { useState } from 'react';

function mypage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [picture, setPicture] = useState('');

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
                })
                .catch(error => {
                    console.error('mypage failed:', error);
                });
        }
    }, []);
  return (
    <div id='mypage'>
      <h1>{username}</h1>
      <img src ={picture} alt='profile'/>
      <p>{email}</p>

    </div>
  );
}
export default mypage;