import { Meteor } from 'meteor/meteor';
import { Tellers, Stories, Subjects } from '../imports/models';
import slugify from 'slugify';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  'register.teller'(teller){
    teller.subjects = [];
    teller._id = Tellers.insert(teller);

    return teller;
  },
  'login.teller'(teller){
    teller = Tellers.findOne(teller);
    return teller;
    // console.log('chegou aqui alguma coisa', teller)
    // var teller = Tellers.findOne(teller);
    // console.log('chegou aqui alguma coisa', teller)
    //
    // return teller;
  },
  'panel.newStory'(story){
    // var subjects = resolveSubjects(story.subjects);
    var subject_ids = [];
    story.subjects.forEach((subject, i)=>{
      if(!('_id' in subject)){
        subject = findOrCreateSubject(subject);
      }

      subject_ids.push(subject._id);
    });

    story.subjects = subject_ids;

    story._id = Stories.insert(story);

    return story;
  },
  'panel.updateSubjects'({teller_id, subjects}){
    var subject_ids = [], subject_object;
    console.log(subjects)

    subjects.forEach((subject, i)=>{
      if(!('_id' in subject)){
        subject = findOrCreateSubject(subject);
      }

      subjects[i] = subject;
      subject_ids.push(subject._id);
    });

    // Atualiza os subjects com os _ids
    Tellers.update({_id: teller_id}, {$set: {subjects: subject_ids}});

    return subjects;
  },
  'timeline.getStories'({subjects, story_ids}){
    // Pega 20 histórias dos assuntos E que não estejam entre as histórias passadas
    // Se não completou 20 histórias, pegue 20 histórias quaisquer que não estejam entre as histórias passadas
    var amount = 20;
    var stories = Stories.find({$and: [{subjects: {$in: subjects}}, {_id: {$nin: story_ids}}]}, {limit: amount}).fetch();
    if(stories.length < amount){
      stories.forEach((story)=>{
        story_ids.push(story._id);
      });

      var more_stories = Stories.find({_id: {$nin: story_ids}}, {limit: amount-stories.length}).fetch();
      stories = stories.concat(more_stories);
    }

    return stories;
  }
});

function findOrCreateSubject(subject){
  subject.slug = slugifySubject(subject.name);
  subject_object = Subjects.findOne({slug: subject.slug});
  if(!subject_object){
    subject._id = Subjects.insert(subject);
  }else subject = subject_object;

  return subject;
}

function slugifySubject(subject){
  return slugify(subject.trim(),'-',/[^a-zA-Z0-9 -]/g, true);
}

function resolveSubjects(subjects){
  return subjects.split(',').map(function(subject){
    return slugifySubject(subject);
  });
}
