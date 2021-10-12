import { NavLink } from 'react-router-dom';
import './styles/Navbar.scss'

const Navbar = () => {

    return(
        <div className="nav">
            <ul>
                <NavLink exact to="/products/new" activeClassName="selected" replace><li>ADD NEW</li></NavLink>
                <NavLink exact to="/products" activeClassName="selected"><li>HOME</li></NavLink>
            </ul>
        </div>
    )
}

export default Navbar;