import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessRook } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import '../styles/Navbar.scss';

const chessLogo = <FontAwesomeIcon icon={faChessRook} />

const Navbar = () => {

    return (
        <nav>
            <div className='logo'><p className='logo'>{chessLogo}</p> <p>Planszomania.pl</p></div>
            <div className='titleSearch'>Here would be search</div>
            <div className='list'>Some text</div>
        </nav>
    )
};

export default connect(null, null)(Navbar);