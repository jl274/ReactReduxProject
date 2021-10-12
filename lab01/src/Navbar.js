import { BrowserRouter, Link } from 'react-router-dom';
import './styles/Navbar.scss'

const Navbar = () => {

    return(
        <div className="nav">
            <ul>
                <Link to="/products/new" replace><li>ADD NEW</li></Link>
                <Link to="/products"><li>HOME</li></Link>
            </ul>
        </div>
    )
}

export default Navbar;