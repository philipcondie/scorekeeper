export async function fetchStats(params) {

    const {username, group, game, startDate, endDate } = params;
    
    const url = new URL('/api/scores', 'localhost:8000/scorekeeper');

    if (username)   url.searchParams.append('username', username);
    if (game)       url.searchParams.append('game',game);
    if (group)      url.searchParams.append('group',group);
    if (startDate)  url.searchParams.append('startDate',startDate);
    if (endDate)    url.searchParams.append('endDate',endDate);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching stats data:', error);
        throw error;
    }
}

export function dummyFetchStats(params) {
    const data = {
        "scores": [
          {
            "player__username": "pmc",
            "date": "2023-03-15T12:00:00Z",
            "score": 279
          },
          {
            "player__username": "pmc",
            "date": "2023-03-16T12:00:00Z",
            "score": 322
          },
          {
            "player__username": "pmc",
            "date": "2023-03-17T12:00:00Z",
            "score": 205
          },
          {
            "player__username": "pmc",
            "date": "2023-03-18T12:00:00Z",
            "score": 157
          },
          {
            "player__username": "pmc",
            "date": "2023-03-19T12:00:00Z",
            "score": 424
          },
          {
            "player__username": "pmc",
            "date": "2023-03-20T12:00:00Z",
            "score": 229
          },
          {
            "player__username": "pmc",
            "date": "2023-03-21T12:00:00Z",
            "score": 174
          },
          {
            "player__username": "pmc",
            "date": "2023-03-22T12:00:00Z",
            "score": 203
          },
          {
            "player__username": "pmc",
            "date": "2023-03-23T12:00:00Z",
            "score": 217
          },
          {
            "player__username": "pmc",
            "date": "2023-03-24T12:00:00Z",
            "score": 213
          },
          {
            "player__username": "pmc",
            "date": "2023-03-25T12:00:00Z",
            "score": 186
          },
          {
            "player__username": "pmc",
            "date": "2023-03-26T12:00:00Z",
            "score": 287
          },
          {
            "player__username": "pmc",
            "date": "2023-03-27T12:00:00Z",
            "score": 244
          },
          {
            "player__username": "pmc",
            "date": "2023-03-28T12:00:00Z",
            "score": 225
          },
          {
            "player__username": "pmc",
            "date": "2023-03-29T12:00:00Z",
            "score": 270
          },
          {
            "player__username": "pmc",
            "date": "2023-03-30T12:00:00Z",
            "score": 229
          },
          {
            "player__username": "pmc",
            "date": "2023-03-31T12:00:00Z",
            "score": 220
          }
        ]
      }

      return data;
}