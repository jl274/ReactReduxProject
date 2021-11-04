import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './movies/Dashboard';
import DirectorsForm from './directors/DirectorsForm';
import Navbar from './Navbar';
import MovieForm from './movies/MovieForm';
import MovieList from './movies/MovieList';
import DirectorsList from './directors/DirectorsList';
import MovieDetails from './movies/MovieDetails';

function App() {
  return (
    
    <BrowserRouter>
      <div className="App">

        <Navbar />

        <Switch>

          <Route path="/directors/add">
            <DirectorsForm />
          </Route>

          <Route path="/directors">
            <DirectorsList />
          </Route>

          <Route path="/movies/add">
            <MovieForm />
          </Route>

          <Route path="/movies/:id" exact>
            <MovieDetails />
          </Route>

          <Route path="/movies">
            <MovieList />
          </Route>

          <Route exact path="/">
            <Dashboard />
          </Route>
          
        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
