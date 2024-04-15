import { useEffect, useState } from 'react'
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement, scales } from "chart.js";
import { Line } from "react-chartjs-2";


ChartJS.register(
    Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement, scales
);

function TemperatureLineChart({ chartData }) {

    useEffect(() => {
        setLineData(
            {
                labels: chartData.labels,
                datasets: [
                    {
                        label: 'Temperature',
                        data: chartData.temperature,
                        borderWidth: 3,
                        borderColor: '#fde047', // yellow-300
                        backgroundColor: '#fef08a', //  yellow-200
                        tension: 0.4,
                    },
                    {
                        label: 'Target temperature',
                        data: chartData.targetTemperature,
                        borderWidth: 3,
                        borderColor: '#36A2EB',
                        backgroundColor: '#9BD0F5',
                        tension: 0.4,
                    }
                ]
            });
    }, [chartData]);

    const [lineData, setLineData] = useState({
        labels: chartData.labels,
        datasets: [
            {
                label: 'Temperature',
                data: chartData.temperature,
                borderWidth: 3,
                borderColor: '#fde047', // yellow-300
                backgroundColor: '#fef08a', //  yellow-200
                tension: 0.4,
            },
            {
                label: 'Target temperature',
                data: chartData.targetTemperature,
                borderWidth: 3,
                borderColor: '#36A2EB',
                backgroundColor: '#9BD0F5',
                tension: 0.4,
            }
        ]
    });

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Celsius ℃'
                },
                suggestedMin: 0,
                suggestedMax: 100,
            }
        }
    }

    return (
        <Line
            data={lineData}
            options={options}
        ></Line>
    )
}

export default TemperatureLineChart
