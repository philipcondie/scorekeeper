import { Form,  useLoaderData, useNavigate } from "react-router";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { dummyFetchStats } from "../api/statsApi";   
import { dummyGamesApi, dummyGroupApi } from "../api/menuApi";



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
    
    return {gamesData, groupsData, chartData}
}

export default function Stats() {
    const loaderData = useLoaderData();
    
    const gamesData = loaderData.gamesData;
    const groupsData = loaderData.groupsData;
    const chartData = loaderData.chartData;

    const navigate = useNavigate();
    const games = gamesData.games.map(game => game.name);
    const groups = groupsData.groups.map(group => group.name);

    return (
        <>
        <div className="m-3">
            <Form action="/stats" method="get">
                <div className="form-group row">
                    <DropdownComponent items={games} label={"Game"} name={"game"} />
                    <DropdownComponent items={groups} label={"Group"} name={"group"}/>
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
function DropdownComponent ({ label, name, items }) {
    return (
        <>
            <label className="col-sm-1 col-form-label">{label}</label>
            <div className="col-sm-2">
                <select name={name || label.toLowerCase()} className="form-control" required>
                <option value="">--Select--</option>
                {items.map((item,index) => (
                    <option key={index} value={item}>{item}</option>
                ))}
                </select>
            </div>
        </>
    );
}

function ChartComponent({ data }) {
    const formattedData = data.scores.map(item => ({
        date: new Date(item.date).toLocaleDateString(),
        score: item.score,
        username: item.player__username
    }));

    return (
        
        <LineChart width={600} height={300} data={formattedData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <Line type="monotone" dataKey="score" stroke="#8884d8" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
        </LineChart>
        
    );
}