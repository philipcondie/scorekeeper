import { useLoaderData } from "react-router";
import type { Route } from "./+types/home";

import { dummyGroupApi } from "~/api/menuApi";

export async function loader({request}){

  const groupsData = dummyGroupApi();
  return {groupsData}
}

export default function Home() {
  const loaderData = useLoaderData();

  // breakdown loader data into individual components
  const groupsData = loaderData.groupsData.groups;
  return <GroupContainer groups={groupsData}/>;
  // return <div>Hellow World</div>
}

export function GroupContainer({groups}) {
  // console.log("Group Container. groups: ", groups);
  return (
    <div className="card-container"> 
      {groups.map(group => (
        <div className="card m-3" key={group.name}>
          <div className="card-header">
            {group.name}
          </div>
          <div className="card-body">
            <GroupCard />
            {/* Hello World */}
          </div>
        </div>
      ))}
    </div>
    
  );
}

export function GroupCard(){
  const users = [{"user":"pmc","wins":3},{"user":"morgan","wins":2},
                 {"user":"spence","wins":3},{"user":"nate","wins":1}]

  const dailyScores = 
    {
      "games": ["Sudoku", "Mini Crossword"],
      "players": [
        {
          "player":"pmc",
          "scores": {
            "Sudoku": 168,
            "Mini Crossword": 34
          }
        },
        {
          "player":"spence",
          "scores": {
            "Sudoku": 168,
            "Mini Crossword": 34
          }
        },
        {
          "player":"nate",
          "scores": {
            "Sudoku": 168,
            "Mini Crossword": 34
          }
        },
        {
          "player":"morgan",
          "scores": {
            "Sudoku": 168,
            "Mini Crossword": 34
          }
        },
        {
          "player":"sarah",
          "scores": {
            "Sudoku": 168,
            "Mini Crossword": 34
          }
        },
      ]
    }
    // add more groups here


  return (
    <>
    <DailyScoreCard data={dailyScores}/>
    <TotalWinsCard data={users} />
    </>
  );
}

export function TotalWinsCard({data}){
  const users = data;
  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Total Wins</th>
          </tr>
          {/* add mapping to add each user to the header column */}
          <tr>
            {users.map(user => (
              <th scope="col">{user.user}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* add mapping to add wins for each user */}
            {
              users.map(user => (
                <td>{user.wins}</td>
              ))
            }
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export function DailyScoreCard({data}) {
  // console.log(data);
  const games = data.games
  const players = data.players;
  console.log("Games");
  console.log(games);
  console.log("Players");
  console.log(players);
  return (
    <div className="card">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Today's Scores</th>
          </tr>
          <tr>
            <th scope="col">Player</th>
            {games.map(game => (
              <th scope="col">{game}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr>
              <td>{player.player}</td>
              {games.map(game => (
                <td>{player.scores[game]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
}
