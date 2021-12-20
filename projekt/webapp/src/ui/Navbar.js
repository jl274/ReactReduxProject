import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessRook } from '@fortawesome/free-solid-svg-icons';
import { initReactI18next ,useTranslation } from 'react-i18next';
import { connect } from "react-redux";
import '../styles/Navbar.scss';

const chessLogo = <FontAwesomeIcon icon={faChessRook} />

const Navbar = () => {

    const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  }

    return (
        <nav>
            <div className='logo'><p className='logo'>{chessLogo}</p> <p>Planszomania.pl</p></div>
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

export default connect(null, null)(Navbar);