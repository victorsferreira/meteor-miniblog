import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Showdown } from 'meteor/markdown';
import { withTracker } from 'meteor/react-meteor-data';

import { Stories } from '../models';

const Converter = new Showdown.converter();

class Timeline extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      story_ids: [],
      stories: []
    };

    this.setPageScrollListener();
  }

  componentDidMount(){
    this.getStories();
  }

  setPageScrollListener(){
    window.onscroll = ()=>{
      var d = document.documentElement;
      var offset = d.scrollTop + window.innerHeight;
      var height = d.offsetHeight;
      var padding = 10;

      if (offset >= height-padding) {
        // Get more stories
        this.getStories();
      }
    };
  }

  getStories(){
    if(!this.state.loading){
      this.setState({loading: true});
      Meteor.call('timeline.getStories', {subjects: this.props.subjects, story_ids: this.state.story_ids}, (err, data)=>{
        if(!err){
          var story_ids = this.state.story_ids;
          data.forEach((story)=>{
            story_ids.push(story._id);
          });

          var stories = this.state.stories.concat(data);

          this.setState({loading: false, story_ids, stories});
        }else{
          this.setState({loading: false});
        }
      });
    }
  }

  render() {
    var stories = this.state.stories.map( (story)=>{
      return (
        <div key={story._id} className='story'>
        <div id='content' dangerouslySetInnerHTML={{__html: Converter.makeHtml(story.content)}} />
        </div>
      );
    } );

    return (
      <div className="container">
      { stories }
      </div>
    )
  }
}

export default withTracker(({subjects}) =>{
  return {};

  // A outra prossibilidade seria modificar variáveis dentro deste módulo
  // para as variáveis reativas, por exemplo, de stories,
  // fizesse as buscas
  // mas o minimongo não permitiria em produção

  // var stories_from_subjects = Stories.find({subjects: {$in: subjects}}).fetch();
  // var ids = stories_from_subjects.map((story)=>{
  //   return story._id;
  // });
  //
  // var more_stories = Stories.find({_id: {$nin: ids}}).fetch();
  //
  // return {
  //   stories: stories_from_subjects.concat(more_stories)
  // }
})(Timeline);
