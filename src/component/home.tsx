import '../App.css';

function Home(){
    return(
        <>
        <div id="content">
          <div id="content-message">
            <p>Remember, progress, no matter
                 how small, is still progress.
            </p>
          </div>
          <div id="content-message2">
            <p> Stay resilient, stay hopeful, and know</p>
               <p> that you are not alone on this path.</p>
          </div>
          <div id="content-button">
            <button id="content-start">Get Started</button>
            <button id="content-login">login</button>
          </div>
          <div id ='content-bottom-message'>
            <p id='content-bottom-title'>Our goals</p>
            <p className='content-bottom-message2'>“To provide resources for safe and effective drug-free living and</p>
             <p className='content-bottom-message2'>help you move toward a healthy,sustainable life. We support your</p>
              <p className='content-bottom-message2'> resolve and work with you to make successful changes.”</p>
              
          </div>
        
          <div id='content-bottom2'>
            <p id='content-bottom-title'>Our Values</p>
            <div id='content-bottom2-message1'>
              <p id='content-bottom2-title1'>Management&Reporting</p>
              <p>To support and manage our continued</p>
               <p>growth. You can save your journeys on</p>
                <p>the website. When you save a day, you</p>
                <p>earn points. You can view your saved</p>
                 <p id='content-1234'>information on the Report page.</p>
            </div>
            <div id='content-bottom2-message2'>
            <p id='content-bottom2-title1'>Donation system</p>
              <p>Donate the points you collect in</p>   
               <p>Manage to a good cause. Donations</p>
                <p>made with points go to centers that</p>
                <p>support the fight against drugs.</p>
                <p>Let's help and recover together</p>
            </div>
            <div id='content-bottom2-message3'>
            <p id='content-bottom2-title1'>Community</p>
              <p>Connect with people who have the</p>    
               <p>same goals as you in the community.</p>
                <p>You can support someone starting a</p>
                <p>new journey, celebrate a success,</p>
                 <p>or share tips for staying drug-free.</p>
            </div>
          </div>
        </div>
        </>
    )
}
export default Home;