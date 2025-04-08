import { useLoaderData } from "react-router";
import type { Route } from "./+types/home";

import { dummyDashboardAPI, dummyGroupApi } from "~/api/menuApi";

export async function loader({request}){

  // const groupsData = dummyGroupApi();
  const groupsData = dummyDashboardAPI();
  return {groupsData}
}

export default function Home() {
  const loaderData = useLoaderData();
  // console.log(loaderData);
  // breakdown loader data into individual components
  const groups = loaderData.groupsData
  return <GroupContainer groups={groups}/>;
  
}

export function GroupContainer({groups}) {
  // console.log(groups);
  return (
    <div className="card-container"> 
      {groups.map(group => (
        <div className="card m-3" key={group.groupName}>
          <div className="card-header">
            {group.groupName}
          </div>
          <div className="card-body">
            <GroupCard group={group}/>
            {/* Hello World */}
          </div>
        </div>
      ))}
    </div>
    
  );
}

export function GroupCard({group}){
  const monthlyWins = group.monthlyWins;
  const dailyScores = {
    games : group.games,
    dailyScores : group.dailyScores}
  return (
    <>
    <DailyScoreCard data={dailyScores}/>
    <TotalWinsCard data={monthlyWins} />
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
              <th scope="col">{user.name}</th>
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
  const scores= data.dailyScores;
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
          {scores.map(player => (
            <tr>
              <td>{player.name}</td>
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
