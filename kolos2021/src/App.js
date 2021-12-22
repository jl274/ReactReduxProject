// import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import PackList from './ui/pack/PackList';
import PackForm from './ui/pack/PackForm';
import PackDetails from './ui/pack/PackDetails';

function App() {


  return (
    
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/add'>
            <PackForm />
          </Route>

          <Route path='/:id'>
            <PackDetails />
          </Route>

          <Route path='/'>
            <PackList />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
    
  );
}

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = {

}


export default connect(mapStateToProps, mapDispatchToProps)(App);
