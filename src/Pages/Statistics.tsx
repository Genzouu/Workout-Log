import React from 'react';
import { Line } from 'react-chartjs-2';

const data = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
        {
            label: "Pushups",
            data: [10, 11, 9, 18, 2, 20],
            fill: false,
            backgroundColor: '#ba3434',
            borderColor: '#da3d3d',
        },
        {
            label: "Situps",
            data: [20, 25, 28, 1, 2, 30],
            fill: false,
            backgroundColor: '#3477ba',
            borderColor: '#3d85da',
        },
        {
            label: "Hanging Leg Raises",
            data: [8, 12, 16],
            fill: false,
            backgroundColor: '#6d34ba',
            borderColor: '#793dda',
        },
    ],
};

function Statistics() {
    return (
        <div style={{alignItems: "center", margin: "0 auto"}}>
            <Line data={data} width={100} height={820} options={{maintainAspectRatio: false}}/>
        </div>
    );
}

export default Statistics;