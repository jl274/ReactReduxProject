import { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';

function App({}) {


  return (
    
    <BrowserRouter>
      <div className="App">
        
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
