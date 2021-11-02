import React from 'react';
import Calendar from 'react-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logActionCreators, State } from '../State';
import { useState } from 'react'

import "./Log.css";

export default function Log() {

    // Redux
    const dispatch = useDispatch();
    const { addEntryAC, removeEntryAC } = bindActionCreators(logActionCreators, dispatch);
    const state = useSelector((state: State) => state);

    // Hooks
    const initialState: {selectedDate: Date, targetDateButton: HTMLButtonElement | null, style: string} = {
        selectedDate: new Date(),
        targetDateButton: null,
        style: "",
    }; 
    const [dateState, setDateState] = useState(initialState);

    const addEntry = (date: Date, exercise: HTMLSelectElement, setsField: HTMLInputElement, repsField: HTMLInputElement, weightField: HTMLInputElement) => {
        if (exercise.value !== "") {
            addEntryAC({date: date.toDateString(), exercise: exercise.value, sets: parseInt(setsField.value), reps: parseInt(repsField.value), weight: parseFloat(weightField.value)});
        } else {
            alert("Please choose an exercise type");
        }
    }

    const resetFields = (inputFields: HTMLCollectionOf<HTMLInputElement>) => {
        for (let i = 0; i < inputFields.length; i++) {
            inputFields[i].value = "";
        }
    }

    const onClickDate = (value: Date, event: React.MouseEvent<HTMLButtonElement>) => {
        if (dateState.targetDateButton) dateState.targetDateButton.style.cssText = dateState.style;
        setDateState({selectedDate: value, targetDateButton: (event.target as HTMLButtonElement), style: (event.target as HTMLButtonElement).style.cssText});

        (event.target as HTMLButtonElement).style.color="#DA3D3D";
    }

    const addEntriesDebug = () => {
        addEntryAC({date: "Mon Nov 01 2021", exercise: "Bicep Curl", sets: 3, reps: 10, weight: 10});
        addEntryAC({date: "Mon Nov 01 2021", exercise: "Bicep Curl", sets: 3, reps: 10, weight: 10});
        addEntryAC({date: "Mon Nov 02 2021", exercise: "Bicep Curl", sets: 3, reps: 10, weight: 15});
        addEntryAC({date: "Mon Nov 02 2021", exercise: "Bicep Curl", sets: 3, reps: 10, weight: 10});
        addEntryAC({date: "Mon Nov 01 2021", exercise: "Tricep Extension", sets: 2, reps: 10, weight: 12});
        addEntryAC({date: "Mon Nov 01 2021", exercise: "Tricep Extension", sets: 3, reps: 15, weight: 12});
        addEntryAC({date: "Mon Nov 02 2021", exercise: "Tricep Extension", sets: 2, reps: 10, weight: 10});
        addEntryAC({date: "Mon Nov 02 2021", exercise: "Tricep Extension", sets: 3, reps: 17, weight: 10});
        addEntryAC({date: "Mon Nov 02 2021", exercise: "Tricep Extension", sets: 1, reps: 11, weight: 20});
        addEntryAC({date: "Mon Nov 01 2021", exercise: "Pullup", sets: 1, reps: 10, weight: 10});
        addEntryAC({date: "Mon Nov 01 2021", exercise: "Pullup", sets: 3, reps: 10, weight: 0});
        addEntryAC({date: "Mon Nov 02 2021", exercise: "Pullup", sets: 3, reps: 15, weight: 0});
    }

    return (
    <div>
        <Calendar
            className="calendar"
            minDate={new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 0))}
            maxDate={new Date()} 
            onClickDay={onClickDate}
        />

        <div className="info" style={{marginTop: "20px"}}>
        <div className="workout-type">
            <select id="workout-type-option"style={{marginTop: "-10px"}}>
            {state.exercises.map((exercise: {type: string}) => (
                <option key={exercise.type}>{exercise.type}</option>
            ))}
            </select>
        </div>
        <form className="workout-info" onSubmit={() => { return false; }}>
            <label className="workout-info-label" htmlFor="sets">Sets</label>
            <input id="sets" maxLength={2} autoComplete="off"></input>
            <br />
            <label className="workout-info-label" htmlFor="reps">Repetitions</label>
            <input id="reps" maxLength={4} autoComplete="off"></input>
            <br />
            <label className="workout-info-label" htmlFor="weight">Weight</label>
            <input id="weight" maxLength={4} autoComplete="off"></input>
        </form>
        <div style={{marginBottom:"20px"}}>
            <button style={{marginTop: "30px"}} onClick={() => addEntry(dateState.selectedDate, (document.getElementById("workout-type-option") as HTMLSelectElement), (document.getElementById("sets") as HTMLInputElement), (document.getElementById("reps") as HTMLInputElement), (document.getElementById("weight") as HTMLInputElement))}>
                Add Entry
            </button>
            <button onClick={() => resetFields(document.getElementsByTagName("input"))}>
                Reset Fields
            </button>
            <button onClick={() => addEntriesDebug()}>Add Entries Debug</button>
        </div>
        </div>
        
        <div className="entry-info">          
            {state.workoutEntries.map((entry, index: number) => (
                <details key={entry.exercise} style={{marginBottom: "20px"}}>
                    <summary>
                        {entry.exercise}
                        <button style={{fontSize:"28px", marginLeft: "20px", marginTop: "10px"}} onClick={() => removeEntryAC(index)}>Delete</button>
                    </summary>
                    <div style={{fontSize: "32px"}}>
                    - Sets: {entry.sets}<br/>
                    - Reps: {entry.reps}<br/>
                    {entry.weight > 0 ? "- Weight: " + entry.weight + "kg" : ""}
                    </div>
                </details>
            ))}
        </div>
    </div> 
    );
}