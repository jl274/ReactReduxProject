// import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import PackList from './ui/pack/PackList';

function App() {


  return (
    
    <BrowserRouter>
      <div className="App">
        <Switch>
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
