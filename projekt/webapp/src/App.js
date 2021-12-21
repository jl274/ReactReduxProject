// import logo from './logo.svg';
import './App.css';
import i18next from 'i18next';
import { initReactI18next ,useTranslation } from 'react-i18next';
import Backend from 'i18next-http-backend';
import languages from './config/languages';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './ui/Navbar';
import GamesList from './ui/games/GamesList';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProducersFromDB } from './ducks/producers/operations';

// internationalization ------------
const language = languages.find(value => value === localStorage.getItem('language'));

i18next.use(Backend)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: language || 'eng',
    fallbackLng: 'en',
    ns: [ 'main' ],
    defaultNS: 'main',
    react: {
      wait: true,
      useSuspense: false
    },
    interpolation: {
      escapeValue: false
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
})


function App({getProducersFromDB}) {

  useEffect(()=>{
    getProducersFromDB()
  }, [getProducersFromDB]);

  return (

    <BrowserRouter>
    <div className="App">

      <Navbar />
      
      <Switch>
        <Route path='/'>
          <GamesList />
        </Route>
      </Switch>

    </div>
  </BrowserRouter>

  );
}

const mapDispatchToProps = {
  getProducersFromDB
}

export default connect(null, mapDispatchToProps)(App);
