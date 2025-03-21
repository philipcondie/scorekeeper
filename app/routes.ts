import { type RouteConfig} from "@react-router/dev/routes";

import { route, index, layout } from "@react-router/dev/routes";

export default [
    layout("layouts/menubar.tsx", [
        index("routes/home.tsx"),
        route("stats", "routes/stats.tsx"),
        route("scoreentry","routes/scoreentry.tsx"),
        route("groups", "routes/groups.tsx"),
        route("games", "routes/games.tsx"),
        route("about", "routes/about.tsx"),
    ])
] satisfies RouteConfig;
