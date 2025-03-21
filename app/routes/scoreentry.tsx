import { useState } from "react";
import { Form } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ScoreEntry() {
    return <DateEntry />;
}

export function DateEntry() {
    return (
        <div className="score-entry m-3">          
            <Form action="api/dummy/scoreentry" method="post">
                <div className="form-group row">
                    <label className="col-sm-1 col-form-label">Date</label>
                    <div className="col-sm-2">
                        <input className="form-control" type="date"></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-1 col-form-label">Game</label>
                    <div className="col-sm-2">
                        <select name="selectedGame" className="form-control" required>
                            <option value="">--Select--</option>
                            <option value="Sudoku">Sudoku</option>
                            <option value="mini-crossword">Mini Crossword</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-1 col-form-label">Score</label>
                    <div className="col-sm-2">
                        <input className="form-control" type="number" name="gameScore" placeholder="Enter score here..." required />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-1"></div>
                    <div className="col-sm-2 text-right">
                            <button type="submit" className="btn btn-primary">Submit</button>
                    </div> 
                </div>
            </Form>
        </div>
    );
}