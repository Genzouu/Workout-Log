import React from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';

import './App.css';
import Home from './Pages/Home';
import Log from './Pages/Log';
import Statistics from './Pages/Statistics';
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">   
        <Switch>
            <Navbar />
            <Route exact path="/" component={Home}/>
            <Route exact path="/log" component={Log}/>
            <Route exact path="/statistics" component={Statistics}/>
        </Switch>
    </div>
  );
}

export default App;
