import React from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Log from './Pages/Log';
import Entries from './Pages/Entries';
import Statistics from './Pages/Statistics';
import Navbar from './Navbar';
import Settings from './Pages/Settings';
import Exercises from './Pages/Exercises';

import './App.css';

function App() {
  return (
    <div className="App">
        <Switch>
            <Navbar />
            <Route exact path="/" component={Home}/>
            <Route exact path="/exercises" component={Exercises}/>
            <Route exact path="/log" component={Log}/>
            <Route exact path="/entries" component={Entries}/>
            <Route exact path="/statistics" component={Statistics}/>
            <Route exact path="/settings" component={Settings}/>
        </Switch>
    </div>
  );
}

export default App;
