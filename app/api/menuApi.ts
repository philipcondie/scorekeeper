export function dummyGamesApi(params) {
    const games = {
        "games" : [
            {"name" : "Sudoku"},
            {"name" : "Mini Crossword"},
            {"name" : "Wordle"},
            {"name" : "Crossword"}
        ]
    };

    return games;
}

export function dummyGroupApi(params) {
    const groups = {
        "groups" : [
            {"name": "Crossdoku"},
            {"name": "Valero Crew"},
        ]
    };

    return groups;
}

export function dummyDashboardAPI(params){
    const dashboardData = [
        {
            "groupName" : "Crossdoku", // add group name here
            "games" : ["Sudoku","Mini Crossword"], // expand games list as needed
            "monthlyWins" : [
                {
                    "name" : "phil", // add player name here
                    "wins" : "2", 
                },
                {
                    "name" : "spence", // add player name here
                    "wins" : "6", 
                }, 
                {
                    "name" : "morgan", // add player name here
                    "wins" : "4", 
                }, 
                {
                    "name" : "nate", // add player name here
                    "wins" : "2", 
                }, // add more players monthlyWins here
            ],
            "dailyScores" : [
                {
                    "name" : "phil", // add player name here
                    "scores" : {
                        "Sudoku" : 130,
                        "Mini Crossword": 43 
                    }
                },
                {
                    "name" : "spence", // add player name here
                    "scores" : {
                        "Sudoku" : 121,
                        "Mini Crossword": 93 
                    }
                },
                {
                    "name" : "morgan", // add player name here
                    "scores" : {
                        "Sudoku" : 150,
                        "Mini Crossword": 23 
                    }
                },
                {
                    "name" : "nate", // add player name here
                    "scores" : {
                        "Sudoku" : 198,
                        "Mini Crossword": 33 
                    }
                }, // add more players dailyScores here
            ]
        },
        {
            "groupName" : "Valero Crew", // add group name here
            "games" : ["Sudoku","Pick em"], // expand games list as needed
            "monthlyWins" : [
                {
                    "name" : "phil", // add player name here
                    "wins" : "1", 
                },
                {
                    "name" : "jackson", // add player name here
                    "wins" : "4", 
                }, 
                {
                    "name" : "zach", // add player name here
                    "wins" : "3", 
                }, // add more players monthlyWins here
            ],
            "dailyScores" : [
                {
                    "name" : "phil", // add player name here
                    "scores" : {
                        "Sudoku" : 130,
                        "Pick em": 4 
                    }
                },
                {
                    "name" : "jackson", // add player name here
                    "scores" : {
                        "Sudoku" : 110,
                        "Pick em": 2 
                    }
                },
                
                {
                    "name" : "zach", // add player name here
                    "scores" : {
                        "Sudoku" : 230,
                        "Pick em": 3 
                    }
                }, // add more players dailyScores here
            ]
        },
    ]
    return dashboardData;
}