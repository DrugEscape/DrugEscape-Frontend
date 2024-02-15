import { Bar } from 'react-chartjs-2'; // Line을 Bar로 변경
import { Chart, CategoryScale, LinearScale, PointElement, BarController, BarElement } from 'chart.js'; // LineElement를 BarController와 BarElement로 변경
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';

import '../report.css'

Chart.register(CategoryScale, LinearScale, PointElement, BarController, BarElement); // LineElement를 BarController와 BarElement로 변경
interface reportProps {
    weekdata: any[];
    savedWeekData: any[] | null;
    pointdata : number;
    maxday:number;
    dailygoal:number;
    labeldata: number[];
}

function report({savedWeekData, pointdata, maxday, dailygoal, labeldata}: reportProps) {
    const messages =['Close your eyes for 30 seconds and take a deep breath in and out','Stretch and exercise for 10 minutes','Eat a healthy meal','Take your medicine'];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    let data = {
        labels: labeldata,
        datasets: [
            {
                label: '일주일간 manage수치',
                backgroundColor: 'white',
                data: savedWeekData,
                borderColor: 'white',
                borderWidth: 2,
            },
        ],
    };

    let options = {
        maintainAspectRatio: false,
        scales: {
            x: {
                type: 'category' as const,
                display: true,   
                title:{
                    display: true
                },
                grid:{
                    display: false
                },
                ticks: {
                    color: 'white'
                }
            },
            y: {
                type: 'linear' as const,
                display: true,
               
                grid:{
                   color: 'white'
                },
                ticks:{
                    color: 'white'
                
                }
            }
        }
    };

    return (
        <>
        <div id='report-content'>
            <div id='report-title'>
                <p id='report-title1'>Report</p>
                <p id="report-title2">View a report on your efforts</p>
            </div>
            <div id="report-chartback">
                <p id="report-chartname">Statistics for this week</p>
                <div id='report-chart'>
                     <Bar data={data} options={options} />
                </div>
            </div>
            <div id="report-manage">
                <div id='report-manage1'>
                    <p className='report-p1'>My Points</p>
                        <p id='daliygoal'>{pointdata}</p>
                        <p id='report-point'>Points</p>
                </div>
                <div id='report-manage2'>
                    <p className='report-p1'>Total accumulated</p>
                    <p className='report-p2'>days</p>
                    <p id='daliygoal1'>D+</p>
                    <p id='daliygoal'>{maxday}</p>
                </div>
                <div id='report-manage3'>
                    <p className='report-p1'>Suggestions</p>
                    <p id="report-random">{randomMessage}</p>
                </div>
                <div id='report-manage4'>
                    <p className='report-p1'>Achieve</p>
                    <p className='report-p2'>your daily goals</p>
                        <div id='report-per'>
                            <CircularProgressbar value={dailygoal} text={`${dailygoal}%`}
                            styles={{
                                path: {
                                    stroke: "#28EA53"
                                },
                                text: {
                                    fill: "#28EA53"
                                
                                }
                            }}
                            />
                        </div>

                </div>
            </div>
        </div> 
         
        </>
    );
}

export default report;