import React from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { State } from '../State';
import LogState from '../Types/logState';

function Statistics() {

    const entries = useSelector((state: State) => state.workoutEntries);

    const getGraphData = () : {
        label: string,
        data: number[],
        fill: boolean,
        backgroundColor: string,
        borderColor: string,
    }[] => {
        // Split each entry into arrays of their respective exercises
        let groupedEntries: LogState['entries'][] = [];
        for (let i = 0; i < entries.length; i++) {
            let found = false;
            let j = 0;
            for (j; j < groupedEntries.length; j++) {
                // Check the first entry in each array to see what exercise it's storing
                if (groupedEntries[j][0].exercise === entries[i].exercise) {
                    groupedEntries[j].push(entries[i]);
                    found = true;
                    break;
                }
            }
            if (!found) {
                if (!groupedEntries[j]) groupedEntries[j] = [];
                groupedEntries[j].push(entries[i]);
            }
        }

        // Add entries with the same exercise together if they were done on the same day with the same weight
        for (let i = 0; i < groupedEntries.length; i++) {
            for (let ii = 1; ii < groupedEntries[i].length; ii++) {
                for (let j = 0; j < ii; j++) {
                    if (groupedEntries[i][ii].date === groupedEntries[i][j].date && groupedEntries[i][ii].weight === groupedEntries[i][j].weight) {
                        groupedEntries[i][j].reps += groupedEntries[i][ii].reps;
                        groupedEntries[i][j].sets += groupedEntries[i][ii].sets;

                        groupedEntries[i].splice(ii, 1);
                        ii--;
                    }
                }
            }
        }

        // Construct the data sets for each exercise
        let datasets: { label: string, data: number[], fill: boolean, backgroundColor: string, borderColor: string }[] = [];
        for (let i = 0; i < groupedEntries.length; i++) {
            let label = groupedEntries[i][0].exercise;
            let data: number[] = [];
            for (let ii = 0; ii < groupedEntries[i].length; ii++) {
                data.push(groupedEntries[i][ii].sets * groupedEntries[i][ii].reps);
            }

            datasets.push({label: label, data: data, fill: false, backgroundColor: "#ba3434", borderColor: "#da3d3d"});
        }
    
        return datasets;
    };

    const data = {
        label: ['1', '2', '3'],
        datasets: getGraphData(),
    }

    /* Example so I don't forget how it's meant to look */
    const data2 = {
        labels: ['1', '2', '3', '4', '5'],
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


    return (
        <div style={{alignItems: "center", margin: "0 auto"}}>
            <Line data={data} width={100} height={820} options={{maintainAspectRatio: false}}/>
        </div>
    );
}

export default Statistics;