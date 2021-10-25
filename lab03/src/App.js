// import logo from './logo.svg';
import { connect } from 'react-redux';
import './App.css';
import TodoForm from './TodoForm';
import ToDoList from './ToDoList';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom' 
import ToDoDetail from './ToDoDetail';
import Navbar from './Navbar';

function App({toggler}) {
  return (
    <BrowserRouter>

      <Navbar />

      <Switch>
        
        <Route path="/todos/:id" exact>
          {toggler.edit ? <TodoForm edit={true} /> : null}
          <ToDoDetail/>
        </Route>

        <Route path="/todos" exact>
          <div className="App">
            <TodoForm />
            {toggler.edit ? <TodoForm edit={true} /> : null}
            <ToDoList />
          </div>
        </Route>

        <Route path="/" exact>
          <Redirect to="/todos" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    toggler: state.toggling
  }
}

export default connect(mapStateToProps, null)(App);
