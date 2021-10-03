import React from 'react';
import Calendar from 'react-calendar';

import "./Log.css";

interface LogState {
    workoutTypes: string[];
    entries: {date: string, workoutType: string, sets: string, reps: string, weight: string}[];
    nextEntryID: number;
}

class Log extends React.Component<{}, LogState> {

    constructor(props: any) {
        super(props);
        
        this.state = {
            workoutTypes: [],
            entries: [],
            nextEntryID: 0,
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

    addEntry = (date: Date, workoutType: HTMLSelectElement, setsField: HTMLInputElement, repsField: HTMLInputElement, weightField: HTMLInputElement) => {
        let newEntries = this.state.entries;
        
        newEntries.push({date: date.toDateString(), workoutType: workoutType.value, sets: setsField.value, reps: repsField.value, weight: weightField.value});

        this.setState({
            entries: newEntries,
            nextEntryID: (this.state.nextEntryID+1)
        });
    }

    removeEntry = (index: number) => {
        let newEntries = this.state.entries;

        newEntries.splice(index, 1);
        
        this.setState({
            entries: newEntries,
        });
    }

    resetFields = (inputFields: HTMLCollectionOf<HTMLInputElement>) => {
        for (let i = 0; i < inputFields.length; i++) {
            inputFields[i].value = "";
        }
    }

    selectedDate: Date = new Date();
    prevDateTarget: {target: HTMLButtonElement | null, style: string} = {target: null, style: ""};

    render() {
        return (
        <div>
            <Calendar
                className="calendar"
                minDate={new Date(Date.UTC(2001, 0, 1, 0, 0, 0, 0))}
                maxDate={new Date()} 
                onClickDay={(value: Date, event: React.MouseEvent<HTMLButtonElement>) => {
                    this.selectedDate = value;

                    if (this.prevDateTarget.target) this.prevDateTarget.target.style.cssText = this.prevDateTarget.style;
                    this.prevDateTarget = {target: (event.target as HTMLButtonElement), style: (event.target as HTMLButtonElement).style.cssText};

                    (event.target as HTMLButtonElement).style.color="#DA3D3D";                   
                }}
            />

            <div className="info" style={{marginTop: "20px"}}>
            <div className="workout-type">
                <form>
                    <input id="workout-type-field" type="text" autoComplete="off"></input>
                    <button onClick={(e) => this.addWorkoutType(e, (document.getElementById("workout-type-field") as HTMLInputElement))}>
                        Add Exercise
                    </button>
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
                <input id="sets" maxLength={2} autoComplete="off"></input>
                </form>
            </div>
            <div className="reps">
                <form>
                <label className="inline-label" htmlFor="reps">Repetitions</label>
                <input id="reps" maxLength={4} autoComplete="off"></input>
                </form>
            </div>
            <div className="weight">
                <form>
                <label className="inline-label" htmlFor="weight">Weight</label>
                <input id="weight" maxLength={4} autoComplete="off"></input>
                </form>
            </div>
            <div style={{marginBottom:"20px"}}>
                <button style={{marginTop: "30px"}} onClick={() => this.addEntry(this.selectedDate, (document.getElementById("workout-type-option") as HTMLSelectElement), (document.getElementById("sets") as HTMLInputElement), (document.getElementById("reps") as HTMLInputElement), (document.getElementById("weight") as HTMLInputElement))}>
                    Add Entry
                </button>
                <button onClick={() => this.resetFields(document.getElementsByTagName("input"))}>
                    Reset Fields
                </button>
            </div>
            </div>
            
            <div className="entry-info">          
                {this.state.entries.map((entry: {date: string, workoutType: string, sets: string, reps: string, weight: string}, index: number) => (
                    <details key={entry.workoutType} style={{marginBottom: "20px"}}>
                        <summary>
                            {entry.workoutType}
                            <button style={{fontSize:"28px", marginLeft: "20px", marginTop: "10px"}} onClick={() => this.removeEntry(index)}>Delete</button>
                        </summary>
                        <div style={{fontSize: "32px"}}>
                        - Sets: {entry.sets}<br/>
                        - Reps: {entry.reps}<br/>
                        {parseInt(entry.weight) > 0 ? "- Weight: " + entry.weight + "kg" : ""}
                        </div>
                    </details>
                ))}
            </div>
        </div> 
        );
    };
}

export default Log;