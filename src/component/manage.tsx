import '../manage.css';
import heart from '../assets/hearts.png';
import exercise from '../assets/exercise.png';
import meal from '../assets/spoon-and-fork.png';
import pill from '../assets/pill.png';
import { useState } from 'react';
interface ManageProps {
    onChange: (name: string, value: number) => void;
    onSubmit: () => void;
    selections: Record<string, number>;
    setSelections: React.Dispatch<React.SetStateAction<Record<string, number>>>;
}
function Manage({onChange, onSubmit, selections, setSelections } : ManageProps){
  
    const [isCheck,setIsCheck] = useState<Record<string, boolean>>({});
    const [buttondiv1, setButtondiv1] = useState<boolean>(false);
    const [buttondiv2, setButtondiv2] = useState<boolean>(false);
    const [buttondiv3, setButtondiv3] = useState<boolean>(false);
    const [buttondiv4, setButtondiv4] = useState<boolean>(false);
    const handleBoth = (event: React.MouseEvent<HTMLButtonElement>) =>{
        handleChange(event);
        handleButtonClick(event);
        handleSelection(event);
    };
    const handleSelection = (event: React.MouseEvent<HTMLButtonElement>) => { 
        const areaNumber = event.currentTarget.getAttribute('data-area');
        const { value } = event.target as HTMLButtonElement;
        console.log(selections);
        if (areaNumber) {
            let newValue = parseInt(value);
            if (areaNumber === 'medicine' && newValue === 4) {
                setSelections({ ...selections, [areaNumber]: newValue });
            } else if (areaNumber === 'meal' || areaNumber === 'medicine') {
                newValue += selections[areaNumber];
                setSelections({ ...selections, [areaNumber]: newValue > 3 ? 3 : newValue });
            } else {
                setSelections({ ...selections, [areaNumber]: newValue });
            }
        }
    };

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) =>{
        const areaNumber = (event.currentTarget.getAttribute('data-area'));
        switch(areaNumber){
            case 'stopDrug':
                setButtondiv1(true);
                break;
            case 'exercise':
                setButtondiv2(true);
                break;
            case 'meal':
                setButtondiv3(true);
                break;
            case 'medicine':
                setButtondiv4(true);
                break;
        }
        
    }
   
    function handleChange(event: React.MouseEvent<HTMLButtonElement>) {        
        event.preventDefault();
        const { name, value } = event.target as HTMLButtonElement; // 버튼 이벤트 받아서 name, value값으로 구분
        onChange(name, JSON.parse(value)); // name, value값을 onChange함수에 넣어줌
        const { id } = event.target as HTMLButtonElement;  // 버튼 이벤트 받아서 id값으로 구분
        setIsCheck(preisCheck => ({ ...preisCheck, [id]: !preisCheck[id] })); // 버튼 클릭시 색깔 변화
        // 아래코드는 모든 영역 버튼 클릭시 submit버튼 활성화
      
    }
    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        onSubmit();
    }
    return(
        <>
        <div id="manage">
            <div id="manage-head">
                <p id="manage-font">Manage</p>   
                <p id="manage-servefont">Let's keep a record of today!</p>
            </div>
            <form onSubmit={handleSubmit}>
            <div id="manage-content">
                <div id='manage-content1'>
                    <img className="manage-img" src={heart}/>
                    <p className="manage-p">Did you succeed in</p>
                    <p className='manage-p'>staying drug free</p>
                    <p className='manage-p'>today?</p>
                    <button id='stopDrug-btn1' data-area={'stopDrug'}  onClick={handleBoth} name='stopDrug1' value={1}  className={isCheck['stopDrug-btn1'] ? 'checked' : ''}>Yes</button>
                    <button id='stopDrug-btn2' data-area={'stopDrug'}  onClick={handleBoth} name='stopDrug1' value={2} className={isCheck['stopDrug-btn2'] ? 'checked' : ''}>No</button>
                </div>
                <div id='manage-content2'>
                    <img className="manage-img" src={exercise}/>
                    <p className="manage-p">Did you exercise</p>
                    <p className='manage-p'>today?</p>
                    <button id='exercise-btn1' data-area={'exercise'}  onClick={handleBoth} name="exerciseBtn1" value={1}className={isCheck['exercise-btn1'] ? 'checked' : ''} >Yes</button>
                    <button id='exercise-btn2' data-area={'exercise'}  onClick={handleBoth} name="exerciseBtn1" value={2}className={isCheck['exercise-btn2'] ? 'checked' : ''}>No</button>
                    
                </div>
            </div>
            <div id="manage-b-content">
                
                <div id='manage-b-content1'>
                    <img className="manage-img" src={meal}/>
                    <p className="manage-p">Did you eat a meal</p>
                    <p className='manage-p'>today?</p>  
                    <button id='meal-btn1'data-area={'meal'}  onClick={handleBoth} name="meal1" value={1} className={isCheck['meal-btn1'] ? 'checked' : ''}>breakfast</button>
                    <button id='meal-btn2'data-area={'meal'}  onClick={handleBoth} name="meal2" value={1} className={isCheck['meal-btn2'] ? 'checked' : ''}>lunch</button>
                    <button id='meal-btn3'data-area={'meal'}  onClick={handleBoth} name="meal3" value={1} className={isCheck['meal-btn3'] ? 'checked' : ''}>dinner</button>
                </div>
                <div id='manage-b-content2'>
                    <img className="manage-img" src={pill}/>
                    <p className="manage-p">Did you take any</p>
                    <p className='manage-p'>prescription</p>
                    <p className='manage-p'>medications today?</p> 
                    <button id='tm-btn1' data-area={'medicine'} onClick={handleBoth} name="medicine1" value={1} className={isCheck['tm-btn1'] ? 'checked' : ''} >morning</button>
                    <button id='tm-btn2'data-area={'medicine'}  onClick={handleBoth} name="medicine2" value={1} className={isCheck['tm-btn2'] ? 'checked' : ''}>lunch</button>
                    <button id='tm-btn3'data-area={'medicine'}  onClick={handleBoth} name="medicine3"  value={1} className={isCheck['tm-btn3'] ? 'checked' : ''}>evening</button> 
                    <button id='tm-btn4'data-area={'medicine'}  onClick={handleBoth} name="medicine4" value={4}className={isCheck['tm-btn4'] ? 'checked' : ''}>none</button>
                </div>
            </div>
                 <button disabled={!(buttondiv1 && buttondiv2 && buttondiv3 && buttondiv4) } type='submit' id="manage-btn" className={!(buttondiv1 && buttondiv2 && buttondiv3 && buttondiv4) ? 'disabled' : 'enabled' }>Submit</button>
            </form>
            

        </div>
        </>
    )

}
export default Manage;