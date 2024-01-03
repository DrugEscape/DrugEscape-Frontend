import '../manage.css';
import calender from '../assets/calendar.png';
import heart from '../assets/hearts.png';
import smile from '../assets/smile-icon.png';
import exercise from '../assets/exercise.png';
import meal from '../assets/spoon-and-fork.png';
import pill from '../assets/pill.png';

function Manage(){
    return(
        <>
        <div id="manage">
            <div id="manage-head">
                <p id="manage-font">Manage</p>   
                <p id="manage-servefont">Let's keep a record of today!</p>
            </div>
            <form>
            <div id="manage-content">
                <div id='manage-content1'>
                    <img className="manage-img" src={calender}/>
                    <p className="calender-p">From the day</p>
                    <p className='calender-p'>it started</p>
                    <p id="calender-day">D+</p>
                    <p id='calender-day2'>32</p>
                    
                </div>
                <div id='manage-content2'>
                    <img className="manage-img" src={heart}/>
                    <p className="calender-p">Give up</p>
                    <p className='calender-p'>drug effect</p>
                    <p id="heart-info">32</p>
                    <p id='heart-per'>%</p>
                </div>
                <div id='manage-content3'>
                    <img className="manage-img" src={smile}/>
                    <p className="calender-p">Emotional</p>
                    <p className='calender-p'>details</p> 
                    <p id="smile-info">Good</p>                      
                </div>
            </div>
            <div id="manage-b-content">
                <div id='manage-b-content1'>
                    <img className="manage-img" src={exercise}/>
                    <p className="calender-p">Exercise</p>
                    <button id='exercise-btn1'>Yes</button>
                    <button id='exercise-btn2'>No</button>
                    
                </div>
                <div id='manage-b-content2'>
                    <img className="manage-img" src={meal}/>
                    <p className="calender-p">Meal</p>
                    <button id='meal-btn1'>breakfast</button>
                    <button id='meal-btn2'>lunch</button>
                    <button id='meal-btn3'>dinner</button>
                    
                </div>
                <div id='manage-b-content3'>
                    <img className="manage-img" src={pill}/>
                    <p className="calender-p">Take</p>
                    <p className='calender-p'>medicine</p> 
                    <button id='tm-btn1'>morning</button>
                    <button id='tm-btn2'>lunch</button>
                    <button id='tm-btn3'>evening</button>                     
                </div>
            </div>
            <button type='submit' id="manage-btn">Save</button>
            </form>
            

        </div>
        </>
    )

}
export default Manage;