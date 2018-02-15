import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import Register from './Register';
import Login from './Login';
import Panel from './Panel';

import Session from '../session';
import * as actions from '../redux/actions';
import { connect } from 'react-redux'

import { Root, Path } from 'react-pathfy';

class App extends Component {
  componentWillMount(){
      // aqui, salva no redux o valor da sessão
      var teller = Session.get('teller');
      if(teller) this.props.dispatch(actions.setTeller(teller));
  }

  render() {
    return (
      <main>
        <Root>
          <Path component={Login} origin='/' />
          <Path component={Register} origin='/register' />
          <Path component={Login} origin='/login' />
          <Path component={Panel} origin='/panel' />
        </Root>
      </main>
    );
  }
}

export default connect(function(props){
  return props;
})(App);
