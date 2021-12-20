// import logo from './logo.svg';
import './App.css';
import i18next from 'i18next';
import { initReactI18next ,useTranslation } from 'react-i18next';
import Backend from 'i18next-http-backend';
import languages from './config/languages';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './ui/Navbar';
import GamesList from './ui/games/GamesList';

// internationalization ------------
const language = languages.find(value => value === localStorage.getItem('language'));

i18next.use(Backend)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: language || 'pl',
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


function App() {

  const { t/*, i18n*/ } = useTranslation();

  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  //   localStorage.setItem('language', lng);
  // }

  return (
    // <div className="App">
    //   {t('welcome')}
    // </div>
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

export default App;
