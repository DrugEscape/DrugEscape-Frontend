import '../manage.css';
import heart from '../assets/hearts.png';
import exercise from '../assets/exercise.png';
import meal from '../assets/spoon-and-fork.png';
import pill from '../assets/pill.png';
import { useState } from 'react';

function Manage(){
    const [isCheck,setIsCheck] = useState<Record<string, boolean>>({});
    function handleChange(event: React.MouseEvent<HTMLButtonElement>) {
        const { id } = event.target as HTMLButtonElement;
        event.preventDefault();
        setIsCheck(preisCheck => ({ ...preisCheck, [id]: !preisCheck[id] }));
    }
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
                    <img className="manage-img" src={heart}/>
                    <p className="manage-p">Didn't you</p>
                    <p className='manage-p'>take drugs today?</p>
                    <button id='stopDrug-btn1' onClick={handleChange} className={isCheck['stopDrug-btn1'] ? 'checked' : ''}>Yes</button>
                    <button id='stopDrug-btn2' onClick={handleChange} className={isCheck['stopDrug-btn2'] ? 'checked' : ''}>No</button>
                </div>
                <div id='manage-content2'>
                    <img className="manage-img" src={exercise}/>
                    <p className="manage-p">Exercise</p>
                    <button id='exercise-btn1' onClick={handleChange} className={isCheck['exercise-btn1'] ? 'checked' : ''} >Yes</button>
                    <button id='exercise-btn2' onClick={handleChange} className={isCheck['exercise-btn2'] ? 'checked' : ''}>No</button>
                    
                </div>
            </div>
            <div id="manage-b-content">
                
                <div id='manage-b-content1'>
                    <img className="manage-img" src={meal}/>
                    <p className="manage-p">Meal</p>
                    <button id='meal-btn1' onClick={handleChange} className={isCheck['meal-btn1'] ? 'checked' : ''}>breakfast</button>
                    <button id='meal-btn2' onClick={handleChange} className={isCheck['meal-btn2'] ? 'checked' : ''}>lunch</button>
                    <button id='meal-btn3' onClick={handleChange} className={isCheck['meal-btn3'] ? 'checked' : ''}>dinner</button>
                </div>
                <div id='manage-b-content2'>
                    <img className="manage-img" src={pill}/>
                    <p className="manage-p">Take</p>
                    <p className='manage-p'>medicine</p> 
                    <button id='tm-btn1' onClick={handleChange} className={isCheck['tm-btn1'] ? 'checked' : ''} >morning</button>
                    <button id='tm-btn2' onClick={handleChange} className={isCheck['tm-btn2'] ? 'checked' : ''}>lunch</button>
                    <button id='tm-btn3' onClick={handleChange} className={isCheck['tm-btn3'] ? 'checked' : ''}>evening</button>                     
                </div>
            </div>
            <button type='submit' id="manage-btn">Submit</button>
            </form>
            

        </div>
        </>
    )

}
export default Manage;