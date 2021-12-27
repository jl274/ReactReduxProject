import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessRook } from '@fortawesome/free-solid-svg-icons';
import { initReactI18next ,useTranslation } from 'react-i18next';
import { connect } from "react-redux";
import '../styles/Navbar.scss';
import { withRouter } from 'react-router-dom';

const chessLogo = <FontAwesomeIcon icon={faChessRook} />

const Navbar = ({history}) => {

    const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  }

  const goToDashboard = () => {
    history.push("/")
  };

    return (
        <nav>
            <div className='logo' onClick={goToDashboard}><p className='logo'>{chessLogo}</p> <p>Planszomania.pl</p></div>
            <div className='titleSearch'>Here would be search</div>
            <div className='rightList'>
                <div>
                    Some text
                </div>
                <div>
                    <button className={`${i18n.language === "pl" ? 'active' : ''} left`} onClick={() => changeLanguage('pl')} >
                        PL
                    </button>
                    <button className={`${i18n.language === "eng" ? 'active' : ''} right`} onClick={() => changeLanguage('eng')}>ENG</button>
                </div>
            </div>
        </nav>
    )
};

export default withRouter(connect(null, null)(Navbar));