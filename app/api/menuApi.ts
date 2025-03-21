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
            {"name": "Tier 1"},
            {"name": "Tier 2"},
            {"name": "Code before Bros"}
        ]
    };

    return groups;
}