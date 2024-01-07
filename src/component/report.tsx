import { Bar } from 'react-chartjs-2'; // Line을 Bar로 변경
import { Chart, CategoryScale, LinearScale, PointElement, BarController, BarElement } from 'chart.js'; // LineElement를 BarController와 BarElement로 변경
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';

import '../report.css'

Chart.register(CategoryScale, LinearScale, PointElement, BarController, BarElement); // LineElement를 BarController와 BarElement로 변경

function report() {
    const percentage = 25;
    let data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: '일주일간 manage수치',
                backgroundColor: 'white',
                data: [0, 10, 5, 2, 20, 30, 100],
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
            <div id='user-info'>
                <p>welcome user1234</p>
            </div>
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
                    <p className='report-p1'>Days currently</p>
                    <p className='report-p1'>accumulated</p>
                </div>
                <div id='report-manage2'>
                    <p className='report-p1'>Maximum</p>
                    <p className='report-p1'>accumulated days</p>
                </div>
                <div id='report-manage3'>
                    <p className='report-p1'>Accumulated</p>
                    <p className='report-p1'>drug-free days</p>
                </div>
                <div id='report-manage4'>
                    <p className='report-p1'>Achieve</p>
                    <p className='report-p1'>your daily goals</p>
                        <div id='report-per'>
                            <CircularProgressbar value={percentage} text={`${percentage}%`}
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