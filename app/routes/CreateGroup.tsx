import { useState } from "react";

import { Form, useNavigate } from "react-router";
export default function CreateGroup() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Create New Group</h1>
            <Form method="post">
                <div className="form-group">
                    <label htmlFor="groupName">Group Name</label>
                    <input 
                        className="form-control" 
                        id="groupName" 
                        type="text" 
                        placeholder="Enter Group Name"
                        style={{ width:"100%"}} />
                </div>
                <div className="form-group">
                    <label htmlFor="selectedGame">Game</label>
                    <div>
                        <MultiCheck options={["Sudoku","Mini Crossword"]} />
                    </div>
                </div>
                <button onClick={() => navigate(-1)} type="button" className="btn btn-primary">Cancel</button>
                <button className="btn btn-primary" type="submit">Create Group</button>
            </Form>
        </div>
    );
}

function MultiCheck({ options }) {
    const [selected, setSelected] = useState<string[]>([]);

    const toggle = (value: string) => 
        setSelected(s => 
            s.includes(value) ? s.filter(v => v !== value) : [...s, value]
        );

    return (
        <div>
            <legend className="sr-only">Pick Games</legend>

            {options.map((o:string) =>(
                <label
                    key = {o}
                    className={`d-inline-block px-3 py-2 rounded border ` +
                                (selected.includes(o)
                                ? 'bg-primary text-white'       // blue pill when selected
                                : 'bg-light text-body')         // light-gray pill when idle
                                }
                >
                        <input
                            type="checkbox"
                            value={o}
                            checked={selected.includes(o)}
                            onChange={() => toggle(o)}
                            className="sr-only"
                            />
                {o}
                </label>
            ))}
        </div>
    );
}