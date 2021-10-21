import logo from './logo.svg';
import './App.css';
import TodoForm from './TodoForm';
import ToDoList from './ToDoList';

function App() {
  return (
    <div className="App">
      <TodoForm />
      <ToDoList />
    </div>
  );
}

export default App;
