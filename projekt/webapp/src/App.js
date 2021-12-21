// import logo from './logo.svg';
import './App.css';
import i18next from 'i18next';
import { initReactI18next  } from 'react-i18next';
import Backend from 'i18next-http-backend';
import languages from './config/languages';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './ui/Navbar';
import GamesList from './ui/games/GamesList';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProducersFromDB } from './ducks/producers/operations';
import { getOffersFromDB } from './ducks/offers/operations';
import { getGamesFromDB } from './ducks/games/operations';
import GameForm from './ui/games/GameForm';

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


function App({getProducersFromDB, getOffersFromDB, getGamesFromDB}) {

  useEffect(()=>{
    getProducersFromDB();
    getOffersFromDB();
    getGamesFromDB();
  }, [getGamesFromDB, getOffersFromDB, getProducersFromDB]);

  return (

    <BrowserRouter>
    <div className="App">

      <Navbar />
      
      <Switch>
        <Route path='/new-game'>
          <GameForm />
        </Route>
        <Route path='/'>
          <GamesList />
        </Route>
      </Switch>

    </div>
  </BrowserRouter>

  );
}

const mapDispatchToProps = {
  getProducersFromDB,
  getOffersFromDB,
  getGamesFromDB
}

export default connect(null, mapDispatchToProps)(App);
