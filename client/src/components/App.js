import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login'
import Home from './Home'
import Profile from './Profile'


class App extends Component {

  state = {  }

  render() {


    return (
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Home/>} />
          <Route exact path="/login" render={(props) => <Login/>} />
          <Route exact path="/signin" render={(props) => <Signup/>} />
          <Route exact path="/personalPage/:email" render={(props) => <Profile {...props}/>} />
        </Switch>
      </Router>
    );
  }
}

export default App;