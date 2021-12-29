import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../State";

import "./Entries.css";

export default function Entries() {

    const logs = useSelector((state: State) => state.log);

    let initEntriesState: { date: string, workouts: { exercise: string, sets: number, reps: number, weight: number }[] }[] = [];
    const [entriesState, setEntriesState] = useState(initEntriesState);
    const [filteredEntriesState, setFilteredEntriesState] = useState(initEntriesState);

    useEffect(() => {
        mergeEntries();
    }, [])

    const mergeEntries = () => {
        // Split each entry into arrays of their respective exercises
        let mergedEntries: typeof entriesState = [];
        let data = [...logs];

        // Add entries with the same exercise together if they were done on the same day with the same weight
        for (let i = 0; i < data.length; i++) {

            // If an entry with that date hasn't been added yet, add it
            let dateIndex = mergedEntries.findIndex(entry => entry.date === data[i].date);
            if (dateIndex < 0) mergedEntries.push({ date: data[i].date, workouts: [] });

            // If that workout hasn't been added to that date yet, add it
            let workoutIndex = mergedEntries[mergedEntries.length-1].workouts.findIndex(workout => workout.exercise === data[i].exercise && workout.weight === data[i].weight);  
            if (workoutIndex < 0) {                       
                mergedEntries[mergedEntries.length-1].workouts.push({ exercise: data[i].exercise, sets: data[i].sets, reps: data[i].reps, weight: data[i].weight });
                workoutIndex = mergedEntries[mergedEntries.length-1].workouts.length-1;
            }

            // Loop throught the rest of the array to find workout logs that can be added together
            for (let j = (i+1); j < data.length; j++) {                 
                if (data[i].date === data[j].date && data[i].exercise === data[j].exercise && data[i].weight === data[j].weight && data[i].reps === data[j].reps) {                   
                    mergedEntries[mergedEntries.length-1].workouts[workoutIndex].sets += data[j].sets;
                    mergedEntries[mergedEntries.length-1].workouts[workoutIndex].reps += data[j].reps;
                    
                    data.splice(j, 1);
                    j--;
                }
            }
        }
        setEntriesState(mergedEntries);
        setFilteredEntriesState(mergedEntries);
    }

    const filterEntries = (inputField: HTMLInputElement, dates: HTMLCollectionOf<HTMLDetailsElement>) => {
        // Close all the first layer details elements
        for (let i = 0; i < dates.length; i++) { 
            dates[i].open = false;
        }

        let datesStrings: string[] = [];
        for (let d = 0; d < dates.length; d++) {
            datesStrings.push((dates[d].children[0]).innerHTML);
        }

        let activeDates: boolean[] = [];

        let entries: typeof entriesState = [];
        for (let i = 0; i < entriesState.length; i++) {
            let found = false;
            for (let ii = 0; ii < entriesState[i].workouts.length; ii++) {
                if (entriesState[i].workouts[ii].exercise.toLowerCase().includes(inputField.value.toLowerCase())) {
                    if (!entries.some(e => e.date === entriesState[i].date)) {
                        entries.push({ date: entriesState[i].date, workouts: []});
                    }
                    entries[entries.length-1].workouts.push(entriesState[i].workouts[ii]);

                    let index = datesStrings.findIndex(d => d === entriesState[i].date);
                    if (dates[index] && inputField.value !== "") {
                        activeDates[i] = true;
                    }

                    found = true;
                }
            }

            if (!found) {
                if (entriesState[i].date.toLowerCase().includes(inputField.value.toLowerCase())) entries.push(entriesState[i]);
                activeDates[i] = false;
            }
        }

        let difference = 0;
        for (let i = 0; i < activeDates.length; i++) {
            if (activeDates[i]) {
                dates[i + difference].open = true;
            } else {
                difference--;
            }
        }

        setFilteredEntriesState(entries);
    }

    return (
        <div>
            <input id="entry-search-field" autoComplete="off" onInput={() => filterEntries((document.getElementById("entry-search-field") as HTMLInputElement), (document.getElementsByClassName("date") as HTMLCollectionOf<HTMLDetailsElement>))}></input>
            <div className="entries-container">
                {filteredEntriesState.map((entry, index: number) => (
                    <details className="date" key={index}>
                        <summary>{entry.date}</summary>
                        {entry.workouts.map((workout, index: number) => ( 
                        <details className="workout" key={index}>
                            <summary>{workout.exercise}</summary>
                            <div style={{fontSize: "32px"}}>
                            - Sets: {workout.sets}<br/>
                            - Reps: {workout.reps}<br/>
                            {workout.weight > 0 ? "- Weight: " + workout.weight + "kg" : ""}
                            </div>
                        </details>
                        ))}
                    </details>
                ))}
            </div>
        </div>
    );
}