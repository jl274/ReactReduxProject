// import logo from './logo.svg';
import { connect } from 'react-redux';
import './App.css';
import TodoForm from './TodoForm';
import ToDoList from './ToDoList';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom' 
import ToDoDetail from './ToDoDetail';
import Navbar from './Navbar';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import NotesDetails from './NotesDetails';

function App({toggler}) {
  return (
    <BrowserRouter>

      <Navbar />
      <div className="App">

      <Switch>
        
        <Route path="/todos/:id" exact>
          {toggler.edit ? <TodoForm edit={true} /> : null}
          <ToDoDetail/>
        </Route>

        <Route path="/notes/:id/detail">
          <NotesDetails />
        </Route>

        <Route path="/notes/:id/edit" >
          <NoteForm editing={true} />
        </Route>

        <Route path="/notes/new" >
          <NoteForm />
        </Route>

        <Route path="/notes" exact>
          {/* <NoteForm /> */}
          <NoteList />
        </Route>

        <Route path="/todos" exact>
          
            <TodoForm />
            {toggler.edit ? <TodoForm edit={true} /> : null}
            <ToDoList />
          
        </Route>

        

        <Route path="/" exact>
          <Redirect to="/todos" />
        </Route>
      </Switch>
      </div>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    toggler: state.toggling
  }
}

export default connect(mapStateToProps, null)(App);
