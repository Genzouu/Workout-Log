import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';

import { exercisesActionCreators, State } from '../State/index';
import './Exercises.css';

export default function Exercises() {

    const dispatch = useDispatch();
    const { addExerciseAC, removeExerciseAC } = bindActionCreators(exercisesActionCreators, dispatch);
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
            exercises.push(exercise.type);
        });

        if (!exercises.includes(formattedExercise)) {
            addExerciseAC({ type: formattedExercise, note: noteField.value });
        }

        nameField.value = "";
        noteField.value = "";
    };

    return (
        <div className="exercises">
            <div className="info-container">
                <form className="info-form" onSubmit={() => {return false;}}>
                    <div className="info-label-text">
                        <label className="name-label" htmlFor="name-field">Exercise</label>
                        <input id="name-field" type="text" autoComplete="off" maxLength={30}></input>
                    </div>
                    <div className="info-label-text">
                        <label className="note-label" htmlFor="note-textarea">Note</label>
                        <textarea id="note-textarea" autoComplete="off"></textarea>
                    </div>
                </form>
                <button type="submit" onClick={(e) => addExercise(e, (document.getElementById("name-field") as HTMLInputElement), (document.getElementById("note-textarea") as HTMLInputElement))}>
                        Add Exercise
                </button>
            </div>

            {/* <b className="entries-title">{entries.length > 0 ? "Exercises" : ""}</b> */}
            <div className="entries-container" style={{marginTop: "2%"}}>
                {entries.map((exercise, index: number) => (
                <details className="entry" key={exercise.type} style={{marginBottom:"1%", fontSize:"38px"}}>
                    <summary>
                        {exercise.type}
                        <button style={{fontSize:"28px", marginLeft: "20px", marginTop: "10px"}} onClick={() => removeExerciseAC(index)}>X</button>
                    </summary>
                    <p className="entry-note">{exercise.note}</p>
                </details>
                ))}
            </div>
        </div>
    );
}