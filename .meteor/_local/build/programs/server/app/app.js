var require = meteorInstall({"imports":{"models.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// imports/models.js                                                                                           //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
module.export({
  Tellers: () => Tellers,
  Stories: () => Stories,
  Subjects: () => Subjects
});
let Mongo;
module.watch(require("meteor/mongo"), {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
const Tellers = new Mongo.Collection('teller');
const Stories = new Mongo.Collection('story');
const Subjects = new Mongo.Collection('subject');
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"session.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// imports/session.js                                                                                          //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
class PersistentSession {
  constructor() {
    if (!('__miniblog__' in localStorage)) {
      localStorage['__miniblog__'] = '{}';
    }
  }

  get(key) {
    var all = getAll();
    return all[key];
  }

  set(key, value) {
    var all = getAll();
    all[key] = value;
    setAll(all);
  }

}

function getAll() {
  var all = localStorage['__miniblog__'];

  try {
    return JSON.parse(all);
  } catch (e) {
    console.log(e);
    return null;
  }
}

function setAll(all) {
  localStorage['__miniblog__'] = JSON.stringify(all);
}

module.exportDefault(Session = new PersistentSession());
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"redux":{"actions.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// redux/actions.js                                                                                            //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
module.export({
  LOGIN_TELLER: () => LOGIN_TELLER,
  LOGOUT_TELLER: () => LOGOUT_TELLER,
  loginTeller: () => loginTeller,
  logoutTeller: () => logoutTeller
});
const LOGIN_TELLER = 'LOGIN_TELLER';
const LOGOUT_TELLER = 'LOGOUT_TELLER';

function loginTeller(teller) {
  return {
    type: LOGIN_TELLER,
    payload: {
      teller: teller
    }
  };
}

function logoutTeller() {
  return {
    type: LOGOUT_TELLER,
    payload: true
  };
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// redux/index.js                                                                                              //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
let Actions;
module.watch(require("./actions"), {
  "*"(v) {
    Actions = v;
  }

}, 0);
let Session;
module.watch(require("../imports/session"), {
  default(v) {
    Session = v;
  }

}, 1);
const initial_state = {
  name: 'foo',
  teller: null
};
module.exportDefault(function (state = initial_state, action) {
  console.log('Reducer >> ', state, action);

  if (action.type == Actions.loginTeller) {
    Session.set('teller', action.teller);
    return Object.assign({}, state, {
      teller: action.teller
    });
  }

  if (action.type == Actions.logoutTeller) {
    Session.set('teller', null);
    return Object.assign({}, state, {
      teller: null
    });
  }

  return state;
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}},"server":{"main.js":function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                             //
// server/main.js                                                                                              //
//                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                               //
let Meteor;
module.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let Tellers, Stories, Subjects;
module.watch(require("../imports/models"), {
  Tellers(v) {
    Tellers = v;
  },

  Stories(v) {
    Stories = v;
  },

  Subjects(v) {
    Subjects = v;
  }

}, 1);
let slugify;
module.watch(require("slugify"), {
  default(v) {
    slugify = v;
  }

}, 2);
Meteor.startup(() => {// code to run on server at startup
});
Meteor.methods({
  'register.teller'(teller) {
    teller.subjects = [];
    teller._id = Tellers.insert(teller);
    return teller;
  },

  'login.teller'(teller) {
    var teller = Tellers.findOne(teller);
    return teller;
  },

  'panel.newStory'(story) {
    // var subjects = resolveSubjects(story.subjects);
    var subject_ids = [];
    story.subjects.forEach((subject, i) => {
      if (!('_id' in subject)) {
        subject = findOrCreateSubject(subject);
      }

      subject_ids.push(subject._id);
    });
    story.subjects = subject_ids;
    story._id = Stories.insert(story);
    return story;
  },

  'panel.updateSubjects'({
    teller_id,
    subjects
  }) {
    var subject_ids = [],
        subject_object;
    console.log(subjects);
    subjects.forEach((subject, i) => {
      if (!('_id' in subject)) {
        subject = findOrCreateSubject(subject);
      }

      subjects[i] = subject;
      subject_ids.push(subject._id);
    }); // Atualiza os subjects com os _ids

    Tellers.update({
      _id: teller_id
    }, {
      $set: {
        subjects: subject_ids
      }
    });
    return subjects;
  },

  'timeline.getStories'({
    subjects,
    story_ids
  }) {
    // Pega 20 histórias dos assuntos E que não estejam entre as histórias passadas
    // Se não completou 20 histórias, pegue 20 histórias quaisquer que não estejam entre as histórias passadas
    var amount = 20;
    var stories = Stories.find({
      $and: [{
        subjects: {
          $in: subjects
        }
      }, {
        _id: {
          $nin: story_ids
        }
      }]
    }, {
      limit: amount
    }).fetch();

    if (stories.length < amount) {
      stories.forEach(story => {
        story_ids.push(story._id);
      });
      var more_stories = Stories.find({
        _id: {
          $nin: story_ids
        }
      }, {
        limit: amount - stories.length
      }).fetch();
      stories = stories.concat(more_stories);
    }

    return stories;
  }

});

function findOrCreateSubject(subject) {
  subject.slug = slugifySubject(subject.name);
  subject_object = Subjects.findOne({
    slug: subject.slug
  });

  if (!subject_object) {
    subject._id = Subjects.insert(subject);
  } else subject = subject_object;

  return subject;
}

function slugifySubject(subject) {
  return slugify(subject.trim(), '-', /[^a-zA-Z0-9 -]/g, true);
}

function resolveSubjects(subjects) {
  return subjects.split(',').map(function (subject) {
    return slugifySubject(subject);
  });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json"
  ]
});
require("./redux/actions.js");
require("./redux/index.js");
require("./server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9tb2RlbHMuanMiLCJtZXRlb3I6Ly/wn5K7YXBwL2ltcG9ydHMvc2Vzc2lvbi5qcyIsIm1ldGVvcjovL/CfkrthcHAvcmVkdXgvYWN0aW9ucy5qcyIsIm1ldGVvcjovL/CfkrthcHAvcmVkdXgvaW5kZXguanMiLCJtZXRlb3I6Ly/wn5K7YXBwL3NlcnZlci9tYWluLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydCIsIlRlbGxlcnMiLCJTdG9yaWVzIiwiU3ViamVjdHMiLCJNb25nbyIsIndhdGNoIiwicmVxdWlyZSIsInYiLCJDb2xsZWN0aW9uIiwiUGVyc2lzdGVudFNlc3Npb24iLCJjb25zdHJ1Y3RvciIsImxvY2FsU3RvcmFnZSIsImdldCIsImtleSIsImFsbCIsImdldEFsbCIsInNldCIsInZhbHVlIiwic2V0QWxsIiwiSlNPTiIsInBhcnNlIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJzdHJpbmdpZnkiLCJleHBvcnREZWZhdWx0IiwiU2Vzc2lvbiIsIkxPR0lOX1RFTExFUiIsIkxPR09VVF9URUxMRVIiLCJsb2dpblRlbGxlciIsImxvZ291dFRlbGxlciIsInRlbGxlciIsInR5cGUiLCJwYXlsb2FkIiwiQWN0aW9ucyIsImRlZmF1bHQiLCJpbml0aWFsX3N0YXRlIiwibmFtZSIsInN0YXRlIiwiYWN0aW9uIiwiT2JqZWN0IiwiYXNzaWduIiwiTWV0ZW9yIiwic2x1Z2lmeSIsInN0YXJ0dXAiLCJtZXRob2RzIiwic3ViamVjdHMiLCJfaWQiLCJpbnNlcnQiLCJmaW5kT25lIiwic3RvcnkiLCJzdWJqZWN0X2lkcyIsImZvckVhY2giLCJzdWJqZWN0IiwiaSIsImZpbmRPckNyZWF0ZVN1YmplY3QiLCJwdXNoIiwidGVsbGVyX2lkIiwic3ViamVjdF9vYmplY3QiLCJ1cGRhdGUiLCIkc2V0Iiwic3RvcnlfaWRzIiwiYW1vdW50Iiwic3RvcmllcyIsImZpbmQiLCIkYW5kIiwiJGluIiwiJG5pbiIsImxpbWl0IiwiZmV0Y2giLCJsZW5ndGgiLCJtb3JlX3N0b3JpZXMiLCJjb25jYXQiLCJzbHVnIiwic2x1Z2lmeVN1YmplY3QiLCJ0cmltIiwicmVzb2x2ZVN1YmplY3RzIiwic3BsaXQiLCJtYXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUFBLE9BQU9DLE1BQVAsQ0FBYztBQUFDQyxXQUFRLE1BQUlBLE9BQWI7QUFBcUJDLFdBQVEsTUFBSUEsT0FBakM7QUFBeUNDLFlBQVMsTUFBSUE7QUFBdEQsQ0FBZDtBQUErRSxJQUFJQyxLQUFKO0FBQVVMLE9BQU9NLEtBQVAsQ0FBYUMsUUFBUSxjQUFSLENBQWIsRUFBcUM7QUFBQ0YsUUFBTUcsQ0FBTixFQUFRO0FBQUNILFlBQU1HLENBQU47QUFBUTs7QUFBbEIsQ0FBckMsRUFBeUQsQ0FBekQ7QUFFbEYsTUFBTU4sVUFBVSxJQUFJRyxNQUFNSSxVQUFWLENBQXFCLFFBQXJCLENBQWhCO0FBQ0EsTUFBTU4sVUFBVSxJQUFJRSxNQUFNSSxVQUFWLENBQXFCLE9BQXJCLENBQWhCO0FBQ0EsTUFBTUwsV0FBVyxJQUFJQyxNQUFNSSxVQUFWLENBQXFCLFNBQXJCLENBQWpCLEM7Ozs7Ozs7Ozs7O0FDSlAsTUFBTUMsaUJBQU4sQ0FBd0I7QUFDdEJDLGdCQUFhO0FBQ1gsUUFBRyxFQUFFLGtCQUFrQkMsWUFBcEIsQ0FBSCxFQUFxQztBQUNuQ0EsbUJBQWEsY0FBYixJQUErQixJQUEvQjtBQUNEO0FBQ0Y7O0FBRURDLE1BQUlDLEdBQUosRUFBUTtBQUNOLFFBQUlDLE1BQU1DLFFBQVY7QUFDQSxXQUFPRCxJQUFJRCxHQUFKLENBQVA7QUFDRDs7QUFFREcsTUFBSUgsR0FBSixFQUFTSSxLQUFULEVBQWU7QUFDYixRQUFJSCxNQUFNQyxRQUFWO0FBQ0FELFFBQUlELEdBQUosSUFBV0ksS0FBWDtBQUNBQyxXQUFPSixHQUFQO0FBQ0Q7O0FBaEJxQjs7QUFtQnhCLFNBQVNDLE1BQVQsR0FBaUI7QUFDZixNQUFJRCxNQUFNSCxhQUFhLGNBQWIsQ0FBVjs7QUFDQSxNQUFHO0FBQ0Qs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QztBQUFDTyxlQUFPTixTQUFPQyxRQUFRTztBQUF2QixPQUF2QyxFQUF1RUQsS0FBdkUsRUFBbkI7QUFDQU4sZ0JBQVVBLFFBQVFTLE1BQVIsQ0FBZUQsWUFBZixDQUFWO0FBQ0Q7O0FBRUQsV0FBT1IsT0FBUDtBQUNEOztBQTlEWSxDQUFmOztBQWlFQSxTQUFTUixtQkFBVCxDQUE2QkYsT0FBN0IsRUFBcUM7QUFDbkNBLFVBQVFvQixJQUFSLEdBQWVDLGVBQWVyQixRQUFRaEIsSUFBdkIsQ0FBZjtBQUNBcUIsbUJBQWlCdkQsU0FBUzhDLE9BQVQsQ0FBaUI7QUFBQ3dCLFVBQU1wQixRQUFRb0I7QUFBZixHQUFqQixDQUFqQjs7QUFDQSxNQUFHLENBQUNmLGNBQUosRUFBbUI7QUFDakJMLFlBQVFOLEdBQVIsR0FBYzVDLFNBQVM2QyxNQUFULENBQWdCSyxPQUFoQixDQUFkO0FBQ0QsR0FGRCxNQUVNQSxVQUFVSyxjQUFWOztBQUVOLFNBQU9MLE9BQVA7QUFDRDs7QUFFRCxTQUFTcUIsY0FBVCxDQUF3QnJCLE9BQXhCLEVBQWdDO0FBQzlCLFNBQU9WLFFBQVFVLFFBQVFzQixJQUFSLEVBQVIsRUFBdUIsR0FBdkIsRUFBMkIsaUJBQTNCLEVBQThDLElBQTlDLENBQVA7QUFDRDs7QUFFRCxTQUFTQyxlQUFULENBQXlCOUIsUUFBekIsRUFBa0M7QUFDaEMsU0FBT0EsU0FBUytCLEtBQVQsQ0FBZSxHQUFmLEVBQW9CQyxHQUFwQixDQUF3QixVQUFTekIsT0FBVCxFQUFpQjtBQUM5QyxXQUFPcUIsZUFBZXJCLE9BQWYsQ0FBUDtBQUNELEdBRk0sQ0FBUDtBQUdELEMiLCJmaWxlIjoiL2FwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvIH0gZnJvbSAnbWV0ZW9yL21vbmdvJztcblxuZXhwb3J0IGNvbnN0IFRlbGxlcnMgPSBuZXcgTW9uZ28uQ29sbGVjdGlvbigndGVsbGVyJyk7XG5leHBvcnQgY29uc3QgU3RvcmllcyA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdzdG9yeScpO1xuZXhwb3J0IGNvbnN0IFN1YmplY3RzID0gbmV3IE1vbmdvLkNvbGxlY3Rpb24oJ3N1YmplY3QnKTtcbiIsImNsYXNzIFBlcnNpc3RlbnRTZXNzaW9uIHtcbiAgY29uc3RydWN0b3IoKXtcbiAgICBpZighKCdfX21pbmlibG9nX18nIGluIGxvY2FsU3RvcmFnZSkpe1xuICAgICAgbG9jYWxTdG9yYWdlWydfX21pbmlibG9nX18nXSA9ICd7fSc7XG4gICAgfVxuICB9XG5cbiAgZ2V0KGtleSl7XG4gICAgdmFyIGFsbCA9IGdldEFsbCgpO1xuICAgIHJldHVybiBhbGxba2V5XTtcbiAgfVxuXG4gIHNldChrZXksIHZhbHVlKXtcbiAgICB2YXIgYWxsID0gZ2V0QWxsKCk7XG4gICAgYWxsW2tleV0gPSB2YWx1ZTtcbiAgICBzZXRBbGwoYWxsKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRBbGwoKXtcbiAgdmFyIGFsbCA9IGxvY2FsU3RvcmFnZVsnX19taW5pYmxvZ19fJ107XG4gIHRyeXtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShhbGwpO1xuICB9Y2F0Y2goZSl7XG4gICAgY29uc29sZS5sb2coZSk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0QWxsKGFsbCl7XG4gIGxvY2FsU3RvcmFnZVsnX19taW5pYmxvZ19fJ10gPSBKU09OLnN0cmluZ2lmeShhbGwpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBTZXNzaW9uID0gbmV3IFBlcnNpc3RlbnRTZXNzaW9uKCk7XG4iLCJleHBvcnQgY29uc3QgTE9HSU5fVEVMTEVSID0gJ0xPR0lOX1RFTExFUic7XG5leHBvcnQgY29uc3QgTE9HT1VUX1RFTExFUiA9ICdMT0dPVVRfVEVMTEVSJztcblxuZXhwb3J0IGZ1bmN0aW9uIGxvZ2luVGVsbGVyKHRlbGxlcil7XG4gIHJldHVybiB7XG4gICAgdHlwZTogTE9HSU5fVEVMTEVSLFxuICAgIHBheWxvYWQ6IHtcbiAgICAgIHRlbGxlcjogdGVsbGVyXG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9nb3V0VGVsbGVyKCl7XG4gIHJldHVybiB7XG4gICAgdHlwZTogTE9HT1VUX1RFTExFUixcbiAgICBwYXlsb2FkOiB0cnVlXG4gIH07XG59XG4iLCJpbXBvcnQgKiBhcyBBY3Rpb25zIGZyb20gJy4vYWN0aW9ucyc7XG5pbXBvcnQgU2Vzc2lvbiBmcm9tICcuLi9pbXBvcnRzL3Nlc3Npb24nO1xuXG5jb25zdCBpbml0aWFsX3N0YXRlID0ge1xuICBuYW1lOiAnZm9vJyxcbiAgdGVsbGVyOiBudWxsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdGF0ZSA9IGluaXRpYWxfc3RhdGUsIGFjdGlvbil7XG4gIGNvbnNvbGUubG9nKCdSZWR1Y2VyID4+ICcsIHN0YXRlLCBhY3Rpb24pO1xuXG4gIGlmKGFjdGlvbi50eXBlID09IEFjdGlvbnMubG9naW5UZWxsZXIpe1xuICAgIFNlc3Npb24uc2V0KCd0ZWxsZXInLCBhY3Rpb24udGVsbGVyKTtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHt0ZWxsZXI6IGFjdGlvbi50ZWxsZXJ9KTtcbiAgfVxuXG4gIGlmKGFjdGlvbi50eXBlID09IEFjdGlvbnMubG9nb3V0VGVsbGVyKXtcbiAgICBTZXNzaW9uLnNldCgndGVsbGVyJywgbnVsbCk7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7dGVsbGVyOiBudWxsfSk7XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59XG4iLCJpbXBvcnQgeyBNZXRlb3IgfSBmcm9tICdtZXRlb3IvbWV0ZW9yJztcbmltcG9ydCB7IFRlbGxlcnMsIFN0b3JpZXMsIFN1YmplY3RzIH0gZnJvbSAnLi4vaW1wb3J0cy9tb2RlbHMnO1xuaW1wb3J0IHNsdWdpZnkgZnJvbSAnc2x1Z2lmeSc7XG5cbk1ldGVvci5zdGFydHVwKCgpID0+IHtcbiAgLy8gY29kZSB0byBydW4gb24gc2VydmVyIGF0IHN0YXJ0dXBcbn0pO1xuXG5NZXRlb3IubWV0aG9kcyh7XG4gICdyZWdpc3Rlci50ZWxsZXInKHRlbGxlcil7XG4gICAgdGVsbGVyLnN1YmplY3RzID0gW107XG4gICAgdGVsbGVyLl9pZCA9IFRlbGxlcnMuaW5zZXJ0KHRlbGxlcik7XG5cbiAgICByZXR1cm4gdGVsbGVyO1xuICB9LFxuICAnbG9naW4udGVsbGVyJyh0ZWxsZXIpe1xuICAgIHZhciB0ZWxsZXIgPSBUZWxsZXJzLmZpbmRPbmUodGVsbGVyKTtcblxuICAgIHJldHVybiB0ZWxsZXI7XG4gIH0sXG4gICdwYW5lbC5uZXdTdG9yeScoc3Rvcnkpe1xuICAgIC8vIHZhciBzdWJqZWN0cyA9IHJlc29sdmVTdWJqZWN0cyhzdG9yeS5zdWJqZWN0cyk7XG4gICAgdmFyIHN1YmplY3RfaWRzID0gW107XG4gICAgc3Rvcnkuc3ViamVjdHMuZm9yRWFjaCgoc3ViamVjdCwgaSk9PntcbiAgICAgIGlmKCEoJ19pZCcgaW4gc3ViamVjdCkpe1xuICAgICAgICBzdWJqZWN0ID0gZmluZE9yQ3JlYXRlU3ViamVjdChzdWJqZWN0KTtcbiAgICAgIH1cblxuICAgICAgc3ViamVjdF9pZHMucHVzaChzdWJqZWN0Ll9pZCk7XG4gICAgfSk7XG5cbiAgICBzdG9yeS5zdWJqZWN0cyA9IHN1YmplY3RfaWRzO1xuXG4gICAgc3RvcnkuX2lkID0gU3Rvcmllcy5pbnNlcnQoc3RvcnkpO1xuXG4gICAgcmV0dXJuIHN0b3J5O1xuICB9LFxuICAncGFuZWwudXBkYXRlU3ViamVjdHMnKHt0ZWxsZXJfaWQsIHN1YmplY3RzfSl7XG4gICAgdmFyIHN1YmplY3RfaWRzID0gW10sIHN1YmplY3Rfb2JqZWN0O1xuICAgIGNvbnNvbGUubG9nKHN1YmplY3RzKVxuXG4gICAgc3ViamVjdHMuZm9yRWFjaCgoc3ViamVjdCwgaSk9PntcbiAgICAgIGlmKCEoJ19pZCcgaW4gc3ViamVjdCkpe1xuICAgICAgICBzdWJqZWN0ID0gZmluZE9yQ3JlYXRlU3ViamVjdChzdWJqZWN0KTtcbiAgICAgIH1cblxuICAgICAgc3ViamVjdHNbaV0gPSBzdWJqZWN0O1xuICAgICAgc3ViamVjdF9pZHMucHVzaChzdWJqZWN0Ll9pZCk7XG4gICAgfSk7XG5cbiAgICAvLyBBdHVhbGl6YSBvcyBzdWJqZWN0cyBjb20gb3MgX2lkc1xuICAgIFRlbGxlcnMudXBkYXRlKHtfaWQ6IHRlbGxlcl9pZH0sIHskc2V0OiB7c3ViamVjdHM6IHN1YmplY3RfaWRzfX0pO1xuXG4gICAgcmV0dXJuIHN1YmplY3RzO1xuICB9LFxuICAndGltZWxpbmUuZ2V0U3Rvcmllcycoe3N1YmplY3RzLCBzdG9yeV9pZHN9KXtcbiAgICAvLyBQZWdhIDIwIGhpc3TDs3JpYXMgZG9zIGFzc3VudG9zIEUgcXVlIG7Do28gZXN0ZWphbSBlbnRyZSBhcyBoaXN0w7NyaWFzIHBhc3NhZGFzXG4gICAgLy8gU2UgbsOjbyBjb21wbGV0b3UgMjAgaGlzdMOzcmlhcywgcGVndWUgMjAgaGlzdMOzcmlhcyBxdWFpc3F1ZXIgcXVlIG7Do28gZXN0ZWphbSBlbnRyZSBhcyBoaXN0w7NyaWFzIHBhc3NhZGFzXG4gICAgdmFyIGFtb3VudCA9IDIwO1xuICAgIHZhciBzdG9yaWVzID0gU3Rvcmllcy5maW5kKHskYW5kOiBbe3N1YmplY3RzOiB7JGluOiBzdWJqZWN0c319LCB7X2lkOiB7JG5pbjogc3RvcnlfaWRzfX1dfSwge2xpbWl0OiBhbW91bnR9KS5mZXRjaCgpO1xuICAgIGlmKHN0b3JpZXMubGVuZ3RoIDwgYW1vdW50KXtcbiAgICAgIHN0b3JpZXMuZm9yRWFjaCgoc3RvcnkpPT57XG4gICAgICAgIHN0b3J5X2lkcy5wdXNoKHN0b3J5Ll9pZCk7XG4gICAgICB9KTtcblxuICAgICAgdmFyIG1vcmVfc3RvcmllcyA9IFN0b3JpZXMuZmluZCh7X2lkOiB7JG5pbjogc3RvcnlfaWRzfX0sIHtsaW1pdDogYW1vdW50LXN0b3JpZXMubGVuZ3RofSkuZmV0Y2goKTtcbiAgICAgIHN0b3JpZXMgPSBzdG9yaWVzLmNvbmNhdChtb3JlX3N0b3JpZXMpO1xuICAgIH1cblxuICAgIHJldHVybiBzdG9yaWVzO1xuICB9XG59KTtcblxuZnVuY3Rpb24gZmluZE9yQ3JlYXRlU3ViamVjdChzdWJqZWN0KXtcbiAgc3ViamVjdC5zbHVnID0gc2x1Z2lmeVN1YmplY3Qoc3ViamVjdC5uYW1lKTtcbiAgc3ViamVjdF9vYmplY3QgPSBTdWJqZWN0cy5maW5kT25lKHtzbHVnOiBzdWJqZWN0LnNsdWd9KTtcbiAgaWYoIXN1YmplY3Rfb2JqZWN0KXtcbiAgICBzdWJqZWN0Ll9pZCA9IFN1YmplY3RzLmluc2VydChzdWJqZWN0KTtcbiAgfWVsc2Ugc3ViamVjdCA9IHN1YmplY3Rfb2JqZWN0O1xuXG4gIHJldHVybiBzdWJqZWN0O1xufVxuXG5mdW5jdGlvbiBzbHVnaWZ5U3ViamVjdChzdWJqZWN0KXtcbiAgcmV0dXJuIHNsdWdpZnkoc3ViamVjdC50cmltKCksJy0nLC9bXmEtekEtWjAtOSAtXS9nLCB0cnVlKTtcbn1cblxuZnVuY3Rpb24gcmVzb2x2ZVN1YmplY3RzKHN1YmplY3RzKXtcbiAgcmV0dXJuIHN1YmplY3RzLnNwbGl0KCcsJykubWFwKGZ1bmN0aW9uKHN1YmplY3Qpe1xuICAgIHJldHVybiBzbHVnaWZ5U3ViamVjdChzdWJqZWN0KTtcbiAgfSk7XG59XG4iXX0=
