import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessRook, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { connect } from "react-redux";
import '../styles/Navbar.scss';
import { NavLink, withRouter } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';

const chessLogo = <FontAwesomeIcon icon={faChessRook} />
const homeIcon = <FontAwesomeIcon icon={faHome} />
const searchIcon = <FontAwesomeIcon icon={faSearch} />

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
            <div className='titleSearch'>
                <Formik
                    initialValues={{name: ""}}
                >
                    {()=>(
                        <Form>
                            <Field type="text" name="search" placeholder={t('nav.search')}></Field>
                            <button type='submit'>{searchIcon}</button>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className='rightList'>
                <div className='navList'>
                    <ul>
                        <NavLink to="/" activeClassName="selected" exact><li>{homeIcon} {t('nav.links.games')}</li></NavLink>
                        <NavLink to="/offers" activeClassName="selected"><li>{t('nav.links.offers')}</li></NavLink>
                        <NavLink to="/producers" activeClassName="selected"><li>{t('nav.links.producers')}</li></NavLink>
                    </ul>
                </div>
                <div className='buttons'>
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