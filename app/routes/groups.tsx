import { Form, useNavigate, } from "react-router";
import {useState} from "react";

export default function Groups() {
    const groups =  [
            {"name": "Crossdoku"},
            {"name": "Valero Crew"},
        ];
    
    return (
        <div>
            <div className="d-flex justify-content-between mt-3">
                <NavigationButton title={"Join New Group"} destination={'/joinGroup'}/>
                <NavigationButton title={"Create New Group"} destination={'/createGroup'}/>
            </div>
            <GroupContainer groups={groups} />
        </div>
        
    );
}

// create card container
export function GroupContainer({groups}){
    return (
        <div className="card-container">
            {/* insert cards here */}
            {groups.map(group => (
                <div className="card m-3" key={group.name}>
                    <div className="card-header">
                            {group.name}
                        </div>
                    <div className="card-body">
                        <div className="d-flex flex-wrap">
                            {/* Players list (scrollable) */}
                            <GroupCard />
                            {/* Games list (scrollable) */}
                        </div>
                    </div>
                </div>
            ))}   
        </div>
    );
}
// cards for each group
// Send username and retrieve the groups that they are in
export function GroupCard({group}){
    const players = mockPlayers;
    const games = mockGames;
    return (
        <>
            <div className="flex-grow-1" style={{ minWidth: "50px", marginRight: "10px" }}>
                <ItemList title={"Players"} items={players} />
            </div> 
            <div className="flex-grow-1" style={{ minWidth:"50px"}}>
                <ItemList title={"Games"} items={games} />
            </div>
            <div>
                <AddGameMenu games={games} />
            </div>
        </>
    );
}
export function ItemList({title, items}){
    const scrollableHeight = "200px";
    return(
        <div>
            <h5>{title}</h5>
            <div className="overflow-auto border rounded p-2"
            style={{ maxHeight: scrollableHeight }}>
                <ul className="list-group list-group-flush no-hover">
                    {items.map((item,index) => (
                        <li className="list-group-item" key={index}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
// Add join group button and add create new group button
// buttons for joining a group and creating a new group
export function NavigationButton({title, destination}) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(destination);
    };
    return (
      <button className="btn btn-primary" onClick={handleClick}>{title}</button>  
    );
}

function AddGameMenu({games,onGameAdded}){
    const [selectedGame, setSelectedGame] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!selectedGame) return;
        setIsSubmitting(true);
        setError(null);

        try {
            //await fetch()
            onGameAdded();
            setSelectedGame("");
        } catch (err) {
            console.error(err);
            setError("Failed to add game. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="d-flex flex-column gap-2">
            <label>Select Game</label>
            <select 
                className="form-select"
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                disabled={isSubmitting}>
                <option selected></option>  
                {games.map(game => (
                    <option value={game.name} key={game.name}>{game.name}</option>
                ))}
            </select>
            {selectedGame && (
                <button 
                className="btn btn-secondary"
                onClick={handleSubmit}
                disabled={!selectedGame || isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Confirm Selection"}
                </button>
            )}
            {error && <div className="text-danger">{error}</div>}
        </div>
    );
}

// Mock data for testing - you'd replace this with real data
const mockPlayers = [
    { name: "Player 1" },
    { name: "Player 2" },
    { name: "Player 3" },
    { name: "Player 4" },
    { name: "Player 5" },
    { name: "Player 6" },
    { name: "Player 7" },
    { name: "Player 8" }
];

const mockGames = [
    { name: "Sudoku" },
    { name: "Crossword" },
    { name: "Pick 'em" }
]