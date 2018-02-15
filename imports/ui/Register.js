import React, { Component } from 'react';
// import { Session } from 'meteor/session'
import Session from '../session';
import Helper from '../helper';

import { Tellers } from '../models';

import Menu from './Menu'
import { loginTeller } from '../redux/actions'

import { connect } from 'react-redux'

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  componentDidMount(){
    if(Helper.isLoggedIn()){
      this.props.history.push('/panel');
    }
  }

  handleSubmit(e){
    e.preventDefault();
            console.log(this.props)

    Meteor.call('register.teller', this.state, (err, data)=>{
      if(!err){

        this.setState({
          email: '',
          password: ''
        });

        this.props.dispatch(loginTeller(data));
        // this.props.history.push('/panel');
        setTimeout(()=>{
          this.props.history.push('/panel');
        },100)

        // Session.set('teller_id', data._id);

        // this.props.dispatch(loginTeller(data));
        // this.props.history.push('/panel');
      }else{
        console.log('err', err)
      }
    });
  }

  render() {
    console.log('this,props', this.props)
    return (
      <div className="container">
        <Menu />
        <h1>Register</h1>
        <form className="register-form" onSubmit={this.handleSubmit.bind(this)}>
          <input value={this.state.email} ref="email" name="email" placeholder="email" onChange={ (e)=>{ this.setState({email: e.target.value}) } }/>
          <input value={this.state.password} ref="password" name="password" placeholder="password" onChange={ (e)=>{ this.setState({password: e.target.value}) } }/>
          <button>Send</button>
        </form>
      </div>
    );
  }
}


export default connect(function(props){
  return props;
})(Register);
