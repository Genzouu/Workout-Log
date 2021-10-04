import React from 'react';
import { BrowserRouter as Switch, Route } from 'react-router-dom';

import './App.css';
import Home from './Pages/Home';
import Log from './Pages/Log';
import Statistics from './Pages/Statistics';
import Navbar from './Navbar';
import Settings from './Pages/Settings';
import Exercises from './Pages/Exercises';

function App() {
  return (
    <div className="App">
        <Switch>
            <Navbar />
            <Route exact path="/" component={Home}/>
            <Route exact path="/exercises" component={Exercises}/>
            <Route exact path="/log" component={Log}/>
            <Route exact path="/statistics" component={Statistics}/>
            <Route exact path="/settings" component={Settings}/>
        </Switch>
    </div>
  );
}

export default App;
