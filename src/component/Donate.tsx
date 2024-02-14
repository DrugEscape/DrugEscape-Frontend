import '../donate.css';
import React, { useState } from 'react';
import axios from 'axios';

interface DonateProps {
    accessToken: string;
    pointdata: number;
    setpointdata: (pointdata: number) => void;
}

function Donate({accessToken, pointdata, setpointdata}: DonateProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [donationDTO, setInputValue] = useState('');

    const donatesubmit = async (donationAmount: string) => {
        const donation = Number(donationAmount);
        if (isNaN(donation)) {
            console.error("Invalid donation amount:", donationAmount);
            return;
        }
        try {
            console.log(accessToken);
            const donatepost = await axios.post('https://drugescape.duckdns.org/drugescape/donate', {value: donationAmount}, {
                headers: {
                    'Content-Type': 'application',
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            console.log(donatepost);
            setpointdata(pointdata - donation); // 여기서 pointdata는 현재 상태를 나타냅니다.
            setIsVisible(true);
        } catch (error) {
            console.error("Donation error:", error);
        }
    }

    function handlesubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (Number(donationDTO) > pointdata) {
            alert("포인트가 부족합니다.");
        } else {
            donatesubmit(donationDTO);
        }
        setInputValue(''); // 입력 필드 초기화
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }

    return (
        <>
            <div id='donate-complete' className={isVisible ? 'visible' : 'hidden'}>
                <p id="donate-complete1">Thank you</p>
                <p id="donate-complete2">for your donation!</p>
                <p id="donate-complete3">Heartfelt thanks for your generous contribution!</p>
            </div>
            <div id="donate-title">
                <p id="donate-donate">Donate</p>
                <p id='donate-p'>Make a difference today!</p>
                <p id='donate-p1'>Your contribution, no matter the size, can positively impact lives.</p>
                <p id='donate-p2'>Join us in spreading kindness through your generous donation.</p>
            </div>
            <div id="donate-content">
                <div id="donate-point">
                    <form id="donate-form" onSubmit={handlesubmit}>
                        <input type="number" id="donate-input" placeholder={pointdata.toString()} value={donationDTO}
                        onChange={handleChange}>
                        </input>
                        <p id="donate-points">Points</p>
                        <button type='submit' id="donate-button">Donate</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Donate;