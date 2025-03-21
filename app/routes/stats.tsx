import { Form,  useLoaderData, useNavigate } from "react-router";
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { dummyFetchStats } from "../api/statsApi";   
import { dummyGamesApi, dummyGroupApi } from "../api/menuApi";
import _ from 'lodash';
import { index } from "@react-router/dev/routes";



export async function clientLoader({request}) {

    const gamesData = dummyGamesApi();
    const groupsData = dummyGroupApi();
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams);

    let chartData = null;
    if (url.searchParams.toString()) {
        try {
            chartData = dummyFetchStats(params);
            // return await fetchStats(params);
        }catch (error) {
            throw new Response(error.message,{status: 500});
        }
    }
    let selectedGame = params.game?.toString() ?? "--Select--";
    let selectedGroup = params.group?.toString() ?? "--Select--";
    
    return {selectedGame, selectedGroup, gamesData, groupsData, chartData}
}

export default function Stats() {
    const loaderData = useLoaderData();
    
    const preSelectedGame = loaderData.selectedGame;
    const preSelectedGroup = loaderData.selectedGroup;
    const gamesData = loaderData.gamesData;
    const groupsData = loaderData.groupsData;
    const chartData = loaderData.chartData;

    const navigate = useNavigate();
    const games = gamesData.games.map(game => game.name);
    const groups = groupsData.groups.map(group => group.name);

    const [selectedGame, setSelectedGame] = useState(preSelectedGame);
    const [selectedGroup, setSelectedGroup] = useState(preSelectedGroup);

    return (
        <>
        <div className="m-3">
            <Form action="/stats" method="get">
                <div className="form-group row">
                    
                    <DropdownComponent 
                    items={games} label={"Game"} name={"game"} 
                    selectedItem={selectedGame} 
                    onChange={(e)=>setSelectedGame(e.target.value)}
                    />
                    
                    <DropdownComponent items={groups} label={"Group"} name={"group"} 
                    selectedItem={selectedGroup} 
                    onChange={(e)=>setSelectedGroup(e.target.value)}
                    />
                </div>
                
                <div className="form-group row">
                    <label className="col-sm-1 col-form-label">Start Date</label>
                    <div className="col-sm-2">
                        <input name="startDate" className="form-control" type="date"></input>
                    </div>
                    <label className="col-sm-1 col-form-label"> End Date</label>
                    <div className="col-sm-2">
                        <input name="endDate" className="form-control" type="date"></input>
                    </div>
                    <div className="col-sm-1">
                            <button type="submit" className="btn btn-primary">Submit</button>
                    </div> 
                </div>
            </Form>
        </div>
        <div className="score-chart m-3">
            {chartData && <ChartComponent data={chartData} />}
        </div>
        </>
    );
}

// add functionality to generate options based on data
function DropdownComponent ({ label, name, items, selectedItem, onChange }) {

    return (
        <div>
            <label className="col-sm-1 col-form-label">{label}</label>
            <div className="col-sm-2">
                <select name={name || label.toLowerCase()} className="form-control" value={selectedItem} onChange={onChange} required>
                <option value="select">--Select--</option>
                {items.map((item,index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
                </select>
            </div>
        </div>
    );
}

function ChartComponent({ data }) {
    
    const {usernames, chartData} = processChartData(data);

    // array of colors to create different colors for each line
    const colors = [
        "#1f77b4", // Blue
        "#ff7f0e", // Orange
        "#2ca02c", // Green
        "#d62728", // Red
        "#9467bd", // Purple
        "#8c564b", // Brown
        "#e377c2", // Pink
        "#7f7f7f", // Gray
        "#bcbd22", // Olive
        "#17becf", // Cyan
        "#aec7e8", // Light blue
        "#ffbb78", // Light orange
        "#98df8a", // Light green
        "#ff9896", // Light red
        "#c5b0d5", // Light purple
        "#c49c94", // Light brown
        "#f7b6d2", // Light pink
        "#c7c7c7", // Light gray
        "#dbdb8d", // Light olive
        "#9edae5"  // Light cyan
      ];
    return (
        <div style={{width:"600px", height:"400px"}}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {usernames.map((username,index) => (
                        <Line
                            key={username}
                            type="monotone"
                            dataKey={username}
                            name={username}
                            stroke={colors[index % colors.length]}
                            />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

function processChartData(data){
    
    const rawData = data.scores;

    if (!rawData || !Array.isArray(rawData)) {
        console.error("scores is not an array:" , rawData);
        return {usernames:[],chartData: []};
    }
    const groupedByDate = _.groupBy(rawData,"date");
    
    // transform data to an array
    const chartData = Object.keys(groupedByDate).map(date => {
        const dataPoint = { 
            date: new Date(date).toLocaleDateString() };

        // add each user's score to the date
        groupedByDate[date].forEach(entry => {
            dataPoint[entry.player__username] = entry.score;
        });
        return dataPoint;
    });

    // get usernames
    const usernames = _.uniq(rawData.map(item => item.player__username));
    return {usernames,chartData};
}