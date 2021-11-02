import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import './styles/navbar.scss';

const Navbar = () => {
    
    return(
        <nav>
            <ul>
                <li><NavLink to="/">Dashboard</NavLink></li>
                <p>Movies</p>
                <li><NavLink to="/movies">List</NavLink></li>
                <li><NavLink to="/movies/add">Add new</NavLink></li>
                <p>Directors</p>
                <li><NavLink to="/directors">List</NavLink></li>
                <li><NavLink to="/directors/add">Add new</NavLink></li>
            </ul>
        </nav>
    )
}

export default connect(null, null)(Navbar);