import axios from 'axios';
import '../mypage.css';
import { useEffect } from 'react';

function mypage() {

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
                })
                .catch(error => {
                    console.error('mypage failed:', error);
                });
        }
    }, []);
  return (
    <div id='mypage'>
      <h1>마이페이지</h1>
    </div>
  );
}
export default mypage;