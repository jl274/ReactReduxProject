// import logo from './logo.svg';
import { connect } from 'react-redux';
import './App.css';
import TodoForm from './TodoForm';
import ToDoList from './ToDoList';

function App({toggler}) {
  return (
    <div className="App">
      <TodoForm />
      {toggler.edit ? <TodoForm edit={true} /> : null}
      <ToDoList />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    toggler: state.toggling
  }
}

export default connect(mapStateToProps, null)(App);
