import { Bar } from 'react-chartjs-2'; // Line을 Bar로 변경
import { Chart, CategoryScale, LinearScale, PointElement, BarController, BarElement } from 'chart.js'; // LineElement를 BarController와 BarElement로 변경

Chart.register(CategoryScale, LinearScale, PointElement, BarController, BarElement); // LineElement를 BarController와 BarElement로 변경

function report() {
    let data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: '일주일간 manage수치',
                backgroundColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 100],
                borderColor: 'red',
                borderWidth: 2,
            },
        ],
    };

    let options = {
        scales: {
            x: {
                type: 'category' as const,
                display: true,
                title: {
                    display: true,
                    text: 'Statistics for this week'
                }
            },
            y: {
                type: 'linear' as const,
                display: true,
                title: {
                    display: true,
                    
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
          <div id='report-chart'>
              <Bar data={data} options={options} />
          </div>
           
        </div>
        </>
    );
}

export default report;