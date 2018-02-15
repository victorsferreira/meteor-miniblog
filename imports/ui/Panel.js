import React, { Component } from 'react';
// import { Session } from 'meteor/session';
import Session from '../session';
import { Showdown } from 'meteor/markdown';
import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom'
import { Template } from 'meteor/templating';

import Timeline from './Timeline';
import { Tellers, Subjects } from '../models';
import '../css/style.css';
import Menu from './Menu'
import Helper from '../helper'

import { connect } from 'react-redux'

const Converter = new Showdown.converter();

class Panel extends Component {
  constructor(props){
    super(props);
    this.state = {
      new_story_content: '',
      new_story_subjects: '',
      subjects: [],
      new_subject: ''
    };

    this.update_subjects_timer;
    this.has_received_subjects = false;
    this.isLoggedIn = Helper.isLoggedIn();

    // this.foo = new ReactiveVar( false );
    // this.foo.set({'teste': true})
  }

  componentDidUpdate(){
    if(!Helper.isLoggedIn()){
      // this.props.history.push('/login');
    }else if(this.props.subjects && !this.has_received_subjects){
      this.has_received_subjects = true;
    }
    // alert(this.foo.get())
  }

  handleSubmitNewStory(e){
    e.preventDefault();

    // cria os objectos de subject

    var subjects = this.createSubjectsFromString(this.state.new_story_subjects);

    Meteor.call('panel.newStory', {content: this.state.new_story_content, subjects: subjects}, (err, data)=>{
      if(!err){
        console.log('data', data)
        ReactDOM.findDOMNode(this.refs['new-story-subjects']).value = '';
        ReactDOM.findDOMNode(this.refs['new-story-content']).value = '';
        this.setState({new_story_content: ''})
      }else{
        console.log('err', err)
      }
    });
  }

  createSubjectsFromString(subjects_string){
    var subjects = subjects_string.split(',').map((subject)=>{
      return {
        name: subject.trim()
      };
    });

    return subjects;
  }

  handleSubmitNewSubject(e){
    e.preventDefault();
    var subjects = this.props.subjects;
    subjects = subjects.concat(this.createSubjectsFromString(this.state.new_subject));
    Meteor.call('panel.updateSubjects', {teller_id: this.props.teller._id, subjects: subjects}, (err, data)=>{
      if(!err){
        ReactDOM.findDOMNode(this.refs['new-subject']).value = '';
      }else{
        console.log('err', err)
      }
    });
  }

  removeSubject(_id){
    console.log('subjects ANTES remover',  this.props.subjects)
    var subjects = this.props.subjects;
    subjects = subjects.filter((subject)=>{
      return subject._id !== _id;
    });

    Meteor.call('panel.updateSubjects', {teller_id: this.props.teller._id, subjects: subjects}, (err, data)=>{
      if(!err){
        console.log('subjects', data)
      }else{
        console.log('err', err)
      }
    });
  }

  render() {
console.log('this.props.',this.props)
    if(this.props.subjects){
      var subjects = this.props.subjects.map((subject, i)=>{
        return (
          <span key={i}>{subject.name} <button onClick={()=>{
            this.removeSubject(subject._id)
          }}>Remover</button></span>
        )
      })
    }

    console.log(this.props, '<<<<<<<<')
    // if(this.props.teller){
    return (
      <div className="container">
      <Menu history={this.props.history} />
      {
        (this.props.teller) ? (
          <div>
          <div>Seja bem vindo, {this.props.teller.email}</div>

          <div>
          { subjects }
          </div>

          <form id="new-subject-form" onSubmit={this.handleSubmitNewSubject.bind(this)}>
          <input id="new-subject" ref="new-subject"
          onChange={(e)=>{
            this.setState({new_subject: e.target.value});
          }}
          />
          </form>

          <form className='new-story-form' onSubmit={this.handleSubmitNewStory.bind(this)}>
          <div id='new-story-preview' dangerouslySetInnerHTML={{__html: Converter.makeHtml(this.state.new_story_content)}} />

          <textarea id='markdown-text' ref="new-story-content"
          onChange={(e)=>{
            this.setState({new_story_content: e.target.value})
          }}
          defaultValue={this.state.new_story_content}>
          </textarea>

          <input id="new-story-subjects" ref="new-story-subjects"
          defaultValue={this.state.new_story_subjects}
          onChange={(e)=>{
            this.setState({new_story_subjects: e.target.value})
          }}
          />

          <button>Send</button>
          </form>

          <Timeline subjects={this.props.teller.subjects} />
          </div>
        ) : null
      }
      </div>
    );
    // }else this.props.history.push('/panel');
  }
}

var trackedComponent = withTracker((props) =>{
  var object = {};
  if(props.teller){
    object.teller = Tellers.findOne({_id: props.teller._id});
    object.subjects = Subjects.find({_id: {$in: props.teller.subjects}}).fetch();
  }

  return object;
})(Panel);

var connectedComponent = connect(function(state){
  console.log('state >>>>> ', state)
  return state;
})(trackedComponent);

export default connectedComponent;
