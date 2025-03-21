import { Outlet, Link, NavLink } from "react-router";

export default function MenubarLayout() {
    return (
        <div id="menubar">
            <nav className="nav-container">
                <ul className="nav-menu">
                    <li>
                        {/*insert link to home page here */}
                        <NavLink to= {'/'}> <b>Scorekeeper</b> </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/scoreentry`}> Enter Score </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/groups`}> Groups </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/games`}> Games </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/stats`}> Stats </NavLink>
                    </li>
                    <li className="about-item">
                        <NavLink to={`/about`}> About </NavLink>
                    </li>
                </ul>
            </nav>
            <div id="detail">
                <Outlet />
            </div>
        </div>
    );
    
}