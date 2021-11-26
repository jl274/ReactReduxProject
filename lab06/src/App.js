// import logo from './logo.svg';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import ProductsForm from './ui/products/ProductsForm';
import ProductsList from './ui/products/ProductsList';
import UserDetail from './ui/users/UserDetail';
import UsersList from './ui/users/UsersList';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h2>Hello</h2>

        <Switch>

          <Route path="/products/form">
            <ProductsForm />
          </Route>

          <Route path="/products">
            <ProductsList />
          </Route>

          <Route path="/users/:id">
            <UserDetail />
          </Route>

          <Route path="/users">
            <UsersList />
          </Route>

        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
