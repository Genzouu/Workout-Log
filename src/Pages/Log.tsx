import React from 'react';

import "./Log.css";

interface LogState {
    workoutTypes: string[];
    entries: Map<string, {}>;
}

class Log extends React.Component<{}, LogState> {
    constructor(props: any) {
        super(props);
        
        this.state = {
            workoutTypes: [],
            entries: new Map<string, {}>(),
        };
    }

    addWorkoutType = (event: React.MouseEvent<HTMLButtonElement>, inputField: HTMLInputElement) => {
        event?.preventDefault();
        event?.stopPropagation();

        let formattedType: string = inputField.value.charAt(0).toUpperCase() + inputField.value.substring(1, inputField.value.length);
        for (let i = 1; i < formattedType.length-1; i++) {
            if (formattedType.charAt(i-1) === ' ') {
                formattedType = formattedType.substring(0, i) + formattedType.charAt(i).toUpperCase() + formattedType.substring(i+1, formattedType.length);
            }
        }

        // array.push() adds empty entry if the array is empty
        let newWorkoutTypes: string[] = this.state.workoutTypes;
        if (newWorkoutTypes.length === 0) {
            newWorkoutTypes[0] = formattedType;
        } else if (!newWorkoutTypes.includes(formattedType)) {
            newWorkoutTypes.push(formattedType);
        }

        this.setState({
            workoutTypes: newWorkoutTypes
        });

        inputField.value = "";
    };

    addEntry = (workoutType: HTMLSelectElement, setsField: HTMLInputElement, repsField: HTMLInputElement, weightField: HTMLInputElement) => {
        let newEntries = this.state.entries;
        newEntries.set(workoutType.value, {workoutType: workoutType.value, sets: setsField.value, reps: repsField.value, weight: weightField.value});
        this.setState({
            entries: newEntries
        });
    }

    resetFields = (inputFields: HTMLCollectionOf<HTMLInputElement>) => {
        for (let i = 0; i < inputFields.length; i++) {
            inputFields[i].value = "";
        }
    }

    render() {
        return (
        <div>
            <p>Enter workout information</p>
            <div className="workout-type">
                <form>
                    <input id="workout-type-field" type="text" autoComplete="off"></input>
                    <button onClick={(e) => this.addWorkoutType(e, (document.getElementById("workout-type-field") as HTMLInputElement))}>Add Workout</button>
                </form>
                <select id="workout-type-option"style={{marginTop: "-10px"}}>
                {this.state.workoutTypes.map((type: string) => (
                    <option key={type}>{type}</option>
                ))}
                </select>             
            </div>
            <div className="set">
                <form>
                <label className="inline-label" htmlFor="sets">Sets</label>
                <input id="sets" maxLength={2}></input>
                </form>
            </div>
            <div className="reps">
                <form>
                <label className="inline-label" htmlFor="reps">Repetitions</label>
                <input id="reps" maxLength={4}></input>
                </form>
            </div>
            <div className="weight">
                <form>
                <label className="inline-label" htmlFor="weight">Weight</label>
                <input id="weight" maxLength={4}></input>
                </form>
            </div>
            <div>
                <button style={{marginTop: "30px"}} onClick={() => this.addEntry((document.getElementById("workout-type-option") as HTMLSelectElement), (document.getElementById("sets") as HTMLInputElement), (document.getElementById("reps") as HTMLInputElement), (document.getElementById("weight") as HTMLInputElement))}>
                    Add Entry
                </button>
                <button onClick={() => this.resetFields(document.getElementsByTagName("input"))}>
                    Reset Fields
                </button>
            </div>
        </div>
        );
    };
}

export default Log;