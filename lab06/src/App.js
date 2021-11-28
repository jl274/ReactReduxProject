// import logo from './logo.svg';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './ui/Dashboard';
import ProductDetail from './ui/products/ProductDetail';
import ProductsForm from './ui/products/ProductsForm';
import ProductsList from './ui/products/ProductsList';
import UserDetail from './ui/users/UserDetail';
import UsersList from './ui/users/UsersList';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        
        <Switch>

          <Route path="/products/form">
            <ProductsForm />
          </Route>

          <Route path="/products/:id">
            <ProductDetail />
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

          <Route path="/">
            <Dashboard />
          </Route>

        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;
