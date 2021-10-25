import { NavLink } from "react-router-dom";
import './Navbar.scss';

const Navbar = () => {
    return(
        <nav>
            <NavLink to="/todos">To Do List</NavLink>
            <NavLink to="/notes">Notes</NavLink>
        </nav>
    )
}

export default Navbar;