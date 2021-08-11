import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Trivia from './pages/Trivia';
import Config from './pages/Config';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';
import './css/App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/trivia" component={ Trivia } />
          <Route exact path="/settings" component={ Config } />
          <Route exact path="/feedback" component={ Feedback } />
          <Route exact path="/ranking" component={ Ranking } />
        </Switch>
      </div>
    );
  }
}
export default App;
