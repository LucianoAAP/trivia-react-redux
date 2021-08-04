import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Trivia from './pages/Trivia';
import Config from './pages/Config';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/trivia" component={ Trivia } />
          <Route exact path="/configurations" component={ Config } />
        </Switch>
      </div>
    );
  }
}
export default App;
