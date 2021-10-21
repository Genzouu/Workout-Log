import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators, State } from '../State/index';
import './Exercises.css';

export default function Exercises() {

    const dispatch = useDispatch();
    const { addEntry, removeEntry } = bindActionCreators(actionCreators, dispatch);
    const entries = useSelector((state: State) => state.exercises);

    const addExercise = (event: React.MouseEvent<HTMLButtonElement>, nameField: HTMLInputElement, noteField: HTMLInputElement) => {
        //event?.preventDefault();
        //event?.stopPropagation();

        let formattedExercise: string = nameField.value.charAt(0).toUpperCase() + nameField.value.substring(1, nameField.value.length);
        for (let i = 1; i < formattedExercise.length-1; i++) {
            if (formattedExercise.charAt(i-1) === ' ') {
                formattedExercise = formattedExercise.substring(0, i) + formattedExercise.charAt(i).toUpperCase() + formattedExercise.substring(i+1, formattedExercise.length);
            }
        }

        let exercises: string[] = [];
        entries.forEach(exercise => {
            exercises.push(exercise.name);
        });

        if (!exercises.includes(formattedExercise)) {
            addEntry({ name: formattedExercise, note: noteField.value });
        }

        nameField.value = "";
        noteField.value = "";
    };

    return (
        <div className="exercises">
            <form className="exercise-info-entry" onSubmit={() => { return false; }}>
                <label className="exercise-name-label" htmlFor="exercise-name-field">Exercise:</label>
                <input id="exercise-name-field" type="text" autoComplete="off" maxLength={30}></input>
                <br/>
                <label className="exercise-note-label" htmlFor="exercise-note-textarea">Note:</label>
                <textarea id="exercise-note-textarea" autoComplete="off"></textarea>
            </form>
            <button onClick={(e) => addExercise(e, (document.getElementById("exercise-name-field") as HTMLInputElement), (document.getElementById("exercise-note-textarea") as HTMLInputElement))}>
                    Add Exercise
            </button>

            <br/>

            <b className="entries-title">{entries.length > 0 ? "Exercises" : ""}</b>
            <div className="exercise-entries-container" style={{marginTop: "2%"}}>
                <div className="exercise-entries-grid">
                {entries.map((exercise, index: number) => (
                <details key={exercise.name} style={{marginBottom:"1%", fontSize:"38px"}}>
                    <summary>
                        {exercise.name}
                        <button style={{fontSize:"28px", marginLeft: "20px", marginTop: "10px"}} onClick={() => removeEntry(index)}>Delete</button>
                    </summary>
                    <p className="note">{exercise.note}</p>
                </details>
                ))}
                </div>
            </div>
        </div>
    );
}