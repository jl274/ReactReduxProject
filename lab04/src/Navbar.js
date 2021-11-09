import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import './styles/navbar.scss';

const Navbar = () => {
    
    return(
        <nav>
            <ul>
                <li><NavLink to="/" activeClassName="selected" exact>Dashboard</NavLink></li>
                <p>Movies</p>
                <li><NavLink to="/movies" activeClassName="selected" exact>List</NavLink></li>
                <li><NavLink to="/movies/add" activeClassName="selected" exact>Add new</NavLink></li>
                <p>Directors</p>
                <li><NavLink to="/directors" activeClassName="selected" exact>List</NavLink></li>
                <li><NavLink to="/directors/add" activeClassName="selected" exact>Add new</NavLink></li>
                <p>Actors</p>
                <li><NavLink to="/actors" activeClassName="selected" exact>List</NavLink></li>
                <li><NavLink to="/actors/add" activeClassName="selected" exact>Add new</NavLink></li>
            </ul>
        </nav>
    )
}

export default connect(null, null)(Navbar);