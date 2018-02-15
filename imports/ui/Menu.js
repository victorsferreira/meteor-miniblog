import React, { Component } from 'react';
import Session from '../session';
import Helper from '../helper';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux'
import { logoutTeller } from '../redux/actions'

class Menu extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
  }

  componentWillMount(){
    console.log('this.props', this.props)
  }

  render() {
    return (
      <div className="container">
      {
        this.props.teller ? (
          <div>
          <span> Hello, { this.props.teller.email } </span>
          <span to="/logout" onClick={(e)=>{
            this.props.dispatch(logoutTeller());
            this.props.history.push('/login');
          }}>logout</span>
          </div>
        ) : (
          <div>
          <NavLink to="/login">login</NavLink>
          <NavLink to="/register">register</NavLink>
          </div>
        )
      }
      </div>
    );
  }
}

export default connect(function(props){
  return props;
})(Menu);
