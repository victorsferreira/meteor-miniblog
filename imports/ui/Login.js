import React, { Component } from 'react';
import Session from '../session';
import Helper from '../helper';
import Menu from './Menu';

import { loginTeller } from '../redux/actions'
import { connect } from 'react-redux'

class Login extends Component {
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

    Meteor.call('login.teller', this.state, (err, data)=>{
        console.log('this.state', this.state, data, err)
      if(!err){
        if(data){
          this.setState({
            email: '',
            password: ''
          });

          this.props.dispatch(loginTeller(data));
          setTimeout(()=>{
            this.props.history.push('/panel');
          },100)
        }
      }else{
        console.log('err', err)
      }
    });
  }

  render() {
    return (
      <div className="container">
        <Menu />
        <h1>Login</h1>
        <form className="login-form" onSubmit={this.handleSubmit.bind(this)}>
          <input name="email" placeholder="email" onChange={ (e)=>{ this.setState({email: e.target.value}) } }/>
          <input name="password" placeholder="password" onChange={ (e)=>{ this.setState({password: e.target.value}) } }/>
          <button>Send</button>
        </form>
      </div>
    );
  }
}


export default connect(function(props){
  return props;
})(Login);
