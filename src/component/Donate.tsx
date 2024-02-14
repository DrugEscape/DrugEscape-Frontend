import '../donate.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

interface DonateProps {
    accessToken: string;
    pointdata : number;
    setpointdata: (pointdata: number) => void;
}

function Donate({accessToken, pointdata,setpointdata} : DonateProps){
    const [isVisible, setIsVisible] = useState(false);
    const [donationDTO, setInputValue] = useState<number>(0);

    function handlesubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        if (Number(donationDTO)>Number(pointdata)){
            alert("포인트가 부족합니다.");
            setInputValue(0);
        }else{
            setIsVisible(!isVisible);
            setpointdata(((pointdata)-Number(donationDTO)));
            setInputValue(0);
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(Number(event.target.value));
    }

    const donatesubmit = async () => {
        console.log(accessToken);
        const serverdata = await axios.get('https://drugescape.duckdns.org/drugescape/donate', {
          headers: {
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${accessToken}`
          }
        });
        console.log(serverdata.data);
        const donatepost = await axios.post('https://drugescape.duckdns.org/drugescape/donate',{value: donationDTO}, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`

            }
        });
        console.log(donatepost);
    }

    return(
        <>
        <div id='donate-complete' className={isVisible ? 'visible' : 'hidden'}>
            <p id="donate-complete1">Thank you</p>
            <p id="donate-complete2">for your donation!</p>
            <p id="donate-complete3">Heartfelt thanks for your generous contribution!</p>
        </div>
        <div id="donate-title">
            <p id="donate-donate">Donate</p>
            <p id='donate-p'>Make a difference today!</p>
            <p id='donate-p1'>Make a difference today!
                Your contribution, no matter the size, can positively impact lives.</p>
            <p id='donate-p2'>Join us in spreading kindness
                 through your generous donation.</p>
        </div>
        <div id="donate-content">
            <div id="donate-point">
                <form id="donate-form" onSubmit={handlesubmit}>
                    <input type="number" id="donate-input" placeholder={pointdata.toString()} value={pointdata}
                    onChange={handleChange}
                    >
                    </input>
                    <p id="donate-points">Points</p>
                    <button type='submit' id="donate-button" onClick={donatesubmit}>Donated</button>
                </form>
            </div>
        </div>
        </>
    );
}

export default Donate;