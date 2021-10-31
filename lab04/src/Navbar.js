import { connect } from "react-redux"
import { NavLink } from "react-router-dom"

const Navbar = () => {
    
    return(
        <nav>
            <ul>
                <li><NavLink to="/">Dashboard</NavLink></li>
                <p>Directors</p>
                <li>List</li>
                <li><NavLink to="/directors/add">Add new</NavLink></li>
            </ul>
        </nav>
    )
}

export default connect(null, null)(Navbar);