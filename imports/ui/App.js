import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import Register from './Register';
import Login from './Login';
import Panel from './Panel';

import Session from '../session';
import * as actions from '../redux/actions';
import { connect } from 'react-redux'

class App extends Component {
  componentWillMount(){
      // aqui, salva no redux o valor da sessão
      var teller = Session.get('teller');
      if(teller) this.props.dispatch(actions.setTeller(teller));
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact component={Login} path='/' />
          <Route component={Register} path='/register' />
          <Route component={Login} path='/login' />
          <Route component={Panel} path='/panel' />
        </Switch>
      </main>
    );
  }
}

export default connect(function(props){
  return props;
})(App);
