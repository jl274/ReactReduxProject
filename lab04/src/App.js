import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './movies/Dashboard';
import DirectorsForm from './directors/DirectorsForm';
import Navbar from './Navbar';
import MovieForm from './movies/MovieForm';

function App() {
  return (
    
    <BrowserRouter>
      <div className="App">

        <Navbar />

        <h1>Test App</h1>

        <Switch>

          <Route path="/directors/add">
            <DirectorsForm />
          </Route>

          <Route path="/movies/add">
            <MovieForm />
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
