import React from 'react';

import './Exercises.css';

interface ExercisesState {
    exercises: { name: string, note: string }[];
}

export default class Exercises extends React.Component<{}, ExercisesState> {
    constructor(props: any) {
        super(props);

        this.state = {
            exercises: [],
        };
    }

    addExercise = (event: React.MouseEvent<HTMLButtonElement>, nameField: HTMLInputElement, noteField: HTMLInputElement) => {
        event?.preventDefault();
        event?.stopPropagation();

        let formattedExercise: string = nameField.value.charAt(0).toUpperCase() + nameField.value.substring(1, nameField.value.length);
        for (let i = 1; i < formattedExercise.length-1; i++) {
            if (formattedExercise.charAt(i-1) === ' ') {
                formattedExercise = formattedExercise.substring(0, i) + formattedExercise.charAt(i).toUpperCase() + formattedExercise.substring(i+1, formattedExercise.length);
            }
        }

        let newExercises: { name: string, note: string }[] = this.state.exercises;

        let exercises: string[] = [];
        newExercises.forEach(exercise => {
            exercises.push(exercise.name);
        });

        if (!exercises.includes(formattedExercise)) {
            newExercises.push({ name: formattedExercise, note: noteField.value });
        }

        this.setState({
            exercises: newExercises
        });

        nameField.value = "";
        noteField.value = "";
    };

    removeExercise = (index: number) => {
        let newExercises = this.state.exercises;

        newExercises.splice(index, 1);
        
        this.setState({
            exercises: newExercises,
        });
    }

    render() {
        return (
            <div className="exercises">
                <form className="exercise-info-entry" onSubmit={() => { return false; }}>
                    <label className="exercise-name-label" htmlFor="exercise-name-field">Exercise:</label>
                    <input id="exercise-name-field" type="text" autoComplete="off" maxLength={30}></input>
                    <br/>
                    <label className="exercise-note-label" htmlFor="exercise-note-textarea">Note:</label>
                    <textarea id="exercise-note-textarea" autoComplete="off"></textarea>
                </form>
                <button onClick={(e) => this.addExercise(e, (document.getElementById("exercise-name-field") as HTMLInputElement), (document.getElementById("exercise-note-textarea") as HTMLInputElement))}>
                        Add Exercise
                </button>

                <br/>

                <b className="entries-title">{this.state.exercises.length > 0 ? "Exercises" : ""}</b>
                <div className="exercise-entries-container" style={{marginTop: "2%"}}>
                    <div className="exercise-entries-grid">
                    {this.state.exercises.map((exercise: {name: string, note: string}, index: number) => (
                    <details key={exercise.name} style={{marginBottom:"1%", fontSize:"38px"}}>
                        <summary>
                            {exercise.name}
                            <button style={{fontSize:"28px", marginLeft: "20px", marginTop: "10px"}} onClick={() => this.removeExercise(index)}>Delete</button>
                        </summary>
                        <p className="note">{exercise.note}</p>
                    </details>
                    ))}
                    </div>
                </div>
            </div>
        );
    }
}