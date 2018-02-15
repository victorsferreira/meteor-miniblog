var require = meteorInstall({"client":{"template.main.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// client/template.main.js                                                                        //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
                                                                                                  // 1
Template.body.addContent((function() {                                                            // 2
  var view = this;                                                                                // 3
  return HTML.Raw('<div id="root"></div>');                                                       // 4
}));                                                                                              // 5
Meteor.startup(Template.body.renderToDocument);                                                   // 6
                                                                                                  // 7
////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// client/main.js                                                                                 //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var Template = void 0;                                                                            // 1
module.watch(require("meteor/templating"), {                                                      // 1
  Template: function (v) {                                                                        // 1
    Template = v;                                                                                 // 1
  }                                                                                               // 1
}, 0);                                                                                            // 1
var ReactiveVar = void 0;                                                                         // 1
module.watch(require("meteor/reactive-var"), {                                                    // 1
  ReactiveVar: function (v) {                                                                     // 1
    ReactiveVar = v;                                                                              // 1
  }                                                                                               // 1
}, 1);                                                                                            // 1
var Meteor = void 0;                                                                              // 1
module.watch(require("meteor/meteor"), {                                                          // 1
  Meteor: function (v) {                                                                          // 1
    Meteor = v;                                                                                   // 1
  }                                                                                               // 1
}, 2);                                                                                            // 1
var React = void 0;                                                                               // 1
module.watch(require("react"), {                                                                  // 1
  "default": function (v) {                                                                       // 1
    React = v;                                                                                    // 1
  }                                                                                               // 1
}, 3);                                                                                            // 1
var render = void 0;                                                                              // 1
module.watch(require("react-dom"), {                                                              // 1
  render: function (v) {                                                                          // 1
    render = v;                                                                                   // 1
  }                                                                                               // 1
}, 4);                                                                                            // 1
var HashRouter = void 0;                                                                          // 1
module.watch(require("react-router-dom"), {                                                       // 1
  HashRouter: function (v) {                                                                      // 1
    HashRouter = v;                                                                               // 1
  }                                                                                               // 1
}, 5);                                                                                            // 1
var Provider = void 0;                                                                            // 1
module.watch(require("react-redux"), {                                                            // 1
  Provider: function (v) {                                                                        // 1
    Provider = v;                                                                                 // 1
  }                                                                                               // 1
}, 6);                                                                                            // 1
var createStore = void 0;                                                                         // 1
module.watch(require("redux"), {                                                                  // 1
  createStore: function (v) {                                                                     // 1
    createStore = v;                                                                              // 1
  }                                                                                               // 1
}, 7);                                                                                            // 1
var reducer = void 0;                                                                             // 1
module.watch(require("../redux"), {                                                               // 1
  "default": function (v) {                                                                       // 1
    reducer = v;                                                                                  // 1
  }                                                                                               // 1
}, 8);                                                                                            // 1
var App = void 0;                                                                                 // 1
module.watch(require("../imports/ui/App.js"), {                                                   // 1
  "default": function (v) {                                                                       // 1
    App = v;                                                                                      // 1
  }                                                                                               // 1
}, 9);                                                                                            // 1
var store = createStore(reducer);                                                                 // 15
Meteor.startup(function () {                                                                      // 17
  render(React.createElement(                                                                     // 18
    Provider,                                                                                     // 19
    {                                                                                             // 19
      store: store                                                                                // 19
    },                                                                                            // 19
    React.createElement(                                                                          // 20
      HashRouter,                                                                                 // 20
      null,                                                                                       // 20
      React.createElement(App, null)                                                              // 21
    )                                                                                             // 20
  ), document.getElementById('root'));                                                            // 19
}); // import './main.html';                                                                      // 25
// Template.hello.onCreated(function helloOnCreated() {                                           // 29
//   // counter starts at 0                                                                       // 30
//   this.counter = new ReactiveVar(0);                                                           // 31
// });                                                                                            // 32
//                                                                                                // 33
// Template.hello.helpers({                                                                       // 34
//   counter() {                                                                                  // 35
//     return Template.instance().counter.get();                                                  // 36
//   },                                                                                           // 37
// });                                                                                            // 38
//                                                                                                // 39
// Template.hello.events({                                                                        // 40
//   'click button'(event, instance) {                                                            // 41
//     // increment the counter when button is clicked                                            // 42
//     instance.counter.set(instance.counter.get() + 1);                                          // 43
//   },                                                                                           // 44
// });                                                                                            // 45
////////////////////////////////////////////////////////////////////////////////////////////////////

}},"imports":{"css":{"style.css":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/css/style.css                                                                          //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
module.exports = require("meteor/modules").addStyles(                                             // 1
  ".story{\n  padding: 5px;\n  background: rgb(245, 245, 245);\n  margin-bottom: 10px;\n}\n"      // 2
);                                                                                                // 3
                                                                                                  // 4
////////////////////////////////////////////////////////////////////////////////////////////////////

}},"ui":{"App.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/ui/App.js                                                                              //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                           //
                                                                                                  //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                  //
                                                                                                  //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");     //
                                                                                                  //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);            //
                                                                                                  //
var _inherits2 = require("babel-runtime/helpers/inherits");                                       //
                                                                                                  //
var _inherits3 = _interopRequireDefault(_inherits2);                                              //
                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
                                                                                                  //
module.export({                                                                                   // 1
  "default": function () {                                                                        // 1
    return App;                                                                                   // 1
  }                                                                                               // 1
});                                                                                               // 1
var React = void 0,                                                                               // 1
    Component = void 0;                                                                           // 1
module.watch(require("react"), {                                                                  // 1
  "default": function (v) {                                                                       // 1
    React = v;                                                                                    // 1
  },                                                                                              // 1
  Component: function (v) {                                                                       // 1
    Component = v;                                                                                // 1
  }                                                                                               // 1
}, 0);                                                                                            // 1
var Route = void 0,                                                                               // 1
    Switch = void 0;                                                                              // 1
module.watch(require("react-router-dom"), {                                                       // 1
  Route: function (v) {                                                                           // 1
    Route = v;                                                                                    // 1
  },                                                                                              // 1
  Switch: function (v) {                                                                          // 1
    Switch = v;                                                                                   // 1
  }                                                                                               // 1
}, 1);                                                                                            // 1
var Register = void 0;                                                                            // 1
module.watch(require("./Register"), {                                                             // 1
  "default": function (v) {                                                                       // 1
    Register = v;                                                                                 // 1
  }                                                                                               // 1
}, 2);                                                                                            // 1
var Login = void 0;                                                                               // 1
module.watch(require("./Login"), {                                                                // 1
  "default": function (v) {                                                                       // 1
    Login = v;                                                                                    // 1
  }                                                                                               // 1
}, 3);                                                                                            // 1
var Panel = void 0;                                                                               // 1
module.watch(require("./Panel"), {                                                                // 1
  "default": function (v) {                                                                       // 1
    Panel = v;                                                                                    // 1
  }                                                                                               // 1
}, 4);                                                                                            // 1
                                                                                                  //
var App = function (_Component) {                                                                 //
  (0, _inherits3.default)(App, _Component);                                                       //
                                                                                                  //
  function App() {                                                                                //
    (0, _classCallCheck3.default)(this, App);                                                     //
    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));     //
  }                                                                                               //
                                                                                                  //
  App.prototype.componentWillMount = function () {                                                //
    function componentWillMount() {// aqui, salva no redux o valor da sessão                      //
    }                                                                                             // 12
                                                                                                  //
    return componentWillMount;                                                                    //
  }();                                                                                            //
                                                                                                  //
  App.prototype.render = function () {                                                            //
    function render() {                                                                           //
      return React.createElement(                                                                 // 15
        "main",                                                                                   // 16
        null,                                                                                     // 16
        React.createElement(                                                                      // 17
          Switch,                                                                                 // 17
          null,                                                                                   // 17
          React.createElement(Route, {                                                            // 18
            exact: true,                                                                          // 18
            component: Login,                                                                     // 18
            path: "/"                                                                             // 18
          }),                                                                                     // 18
          React.createElement(Route, {                                                            // 19
            component: Register,                                                                  // 19
            path: "/register"                                                                     // 19
          }),                                                                                     // 19
          React.createElement(Route, {                                                            // 20
            component: Login,                                                                     // 20
            path: "/login"                                                                        // 20
          }),                                                                                     // 20
          React.createElement(Route, {                                                            // 21
            component: Panel,                                                                     // 21
            path: "/panel"                                                                        // 21
          })                                                                                      // 21
        )                                                                                         // 17
      );                                                                                          // 16
    }                                                                                             // 25
                                                                                                  //
    return render;                                                                                //
  }();                                                                                            //
                                                                                                  //
  return App;                                                                                     //
}(Component);                                                                                     //
////////////////////////////////////////////////////////////////////////////////////////////////////

},"Login.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/ui/Login.js                                                                            //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                           //
                                                                                                  //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                  //
                                                                                                  //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");     //
                                                                                                  //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);            //
                                                                                                  //
var _inherits2 = require("babel-runtime/helpers/inherits");                                       //
                                                                                                  //
var _inherits3 = _interopRequireDefault(_inherits2);                                              //
                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
                                                                                                  //
module.export({                                                                                   // 1
  "default": function () {                                                                        // 1
    return Login;                                                                                 // 1
  }                                                                                               // 1
});                                                                                               // 1
var React = void 0,                                                                               // 1
    Component = void 0;                                                                           // 1
module.watch(require("react"), {                                                                  // 1
  "default": function (v) {                                                                       // 1
    React = v;                                                                                    // 1
  },                                                                                              // 1
  Component: function (v) {                                                                       // 1
    Component = v;                                                                                // 1
  }                                                                                               // 1
}, 0);                                                                                            // 1
var Session = void 0;                                                                             // 1
module.watch(require("../session"), {                                                             // 1
  "default": function (v) {                                                                       // 1
    Session = v;                                                                                  // 1
  }                                                                                               // 1
}, 1);                                                                                            // 1
var Helper = void 0;                                                                              // 1
module.watch(require("../helper"), {                                                              // 1
  "default": function (v) {                                                                       // 1
    Helper = v;                                                                                   // 1
  }                                                                                               // 1
}, 2);                                                                                            // 1
var Menu = void 0;                                                                                // 1
module.watch(require("./Menu"), {                                                                 // 1
  "default": function (v) {                                                                       // 1
    Menu = v;                                                                                     // 1
  }                                                                                               // 1
}, 3);                                                                                            // 1
var loginTeller = void 0;                                                                         // 1
module.watch(require("../../redux/actions"), {                                                    // 1
  loginTeller: function (v) {                                                                     // 1
    loginTeller = v;                                                                              // 1
  }                                                                                               // 1
}, 4);                                                                                            // 1
                                                                                                  //
var Login = function (_Component) {                                                               //
  (0, _inherits3.default)(Login, _Component);                                                     //
                                                                                                  //
  function Login(props) {                                                                         // 9
    (0, _classCallCheck3.default)(this, Login);                                                   // 9
                                                                                                  //
    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));     // 9
                                                                                                  //
    _this.state = {                                                                               // 11
      email: '',                                                                                  // 12
      password: ''                                                                                // 13
    };                                                                                            // 11
    return _this;                                                                                 // 9
  }                                                                                               // 15
                                                                                                  //
  Login.prototype.componentDidMount = function () {                                               //
    function componentDidMount() {                                                                //
      if (Helper.isLoggedIn()) {                                                                  // 18
        this.props.history.push('/panel');                                                        // 19
      }                                                                                           // 20
    }                                                                                             // 21
                                                                                                  //
    return componentDidMount;                                                                     //
  }();                                                                                            //
                                                                                                  //
  Login.prototype.handleSubmit = function () {                                                    //
    function handleSubmit(e) {                                                                    //
      var _this2 = this;                                                                          // 23
                                                                                                  //
      e.preventDefault();                                                                         // 24
      Meteor.call('login.teller', this.state, function (err, data) {                              // 26
        if (!err) {                                                                               // 27
          if (data) {                                                                             // 28
            _this2.setState({                                                                     // 29
              email: '',                                                                          // 30
              password: ''                                                                        // 31
            });                                                                                   // 29
                                                                                                  //
            Session.set('teller_id', data._id);                                                   // 34
                                                                                                  //
            _this2.props.dispatch(loginTeller(data));                                             // 36
                                                                                                  //
            _this2.props.history.push('/panel');                                                  // 37
          }                                                                                       // 38
        } else {                                                                                  // 39
          console.log('err', err);                                                                // 40
        }                                                                                         // 41
      });                                                                                         // 42
    }                                                                                             // 43
                                                                                                  //
    return handleSubmit;                                                                          //
  }();                                                                                            //
                                                                                                  //
  Login.prototype.render = function () {                                                          //
    function render() {                                                                           //
      var _this3 = this;                                                                          // 45
                                                                                                  //
      return React.createElement(                                                                 // 46
        "div",                                                                                    // 47
        {                                                                                         // 47
          className: "container"                                                                  // 47
        },                                                                                        // 47
        React.createElement(Menu, null),                                                          // 48
        React.createElement(                                                                      // 49
          "h1",                                                                                   // 49
          null,                                                                                   // 49
          "Login"                                                                                 // 49
        ),                                                                                        // 49
        React.createElement(                                                                      // 50
          "form",                                                                                 // 50
          {                                                                                       // 50
            className: "login-form",                                                              // 50
            onSubmit: this.handleSubmit.bind(this)                                                // 50
          },                                                                                      // 50
          React.createElement("input", {                                                          // 51
            name: "email",                                                                        // 51
            placeholder: "email",                                                                 // 51
            onChange: function (e) {                                                              // 51
              _this3.setState({                                                                   // 51
                email: e.target.value                                                             // 51
              });                                                                                 // 51
            }                                                                                     // 51
          }),                                                                                     // 51
          React.createElement("input", {                                                          // 52
            name: "password",                                                                     // 52
            placeholder: "password",                                                              // 52
            onChange: function (e) {                                                              // 52
              _this3.setState({                                                                   // 52
                password: e.target.value                                                          // 52
              });                                                                                 // 52
            }                                                                                     // 52
          }),                                                                                     // 52
          React.createElement(                                                                    // 53
            "button",                                                                             // 53
            null,                                                                                 // 53
            "Send"                                                                                // 53
          )                                                                                       // 53
        )                                                                                         // 50
      );                                                                                          // 47
    }                                                                                             // 57
                                                                                                  //
    return render;                                                                                //
  }();                                                                                            //
                                                                                                  //
  return Login;                                                                                   //
}(Component);                                                                                     //
////////////////////////////////////////////////////////////////////////////////////////////////////

},"Menu.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/ui/Menu.js                                                                             //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                           //
                                                                                                  //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                  //
                                                                                                  //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");     //
                                                                                                  //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);            //
                                                                                                  //
var _inherits2 = require("babel-runtime/helpers/inherits");                                       //
                                                                                                  //
var _inherits3 = _interopRequireDefault(_inherits2);                                              //
                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
                                                                                                  //
var React = void 0,                                                                               // 1
    Component = void 0;                                                                           // 1
module.watch(require("react"), {                                                                  // 1
  "default": function (v) {                                                                       // 1
    React = v;                                                                                    // 1
  },                                                                                              // 1
  Component: function (v) {                                                                       // 1
    Component = v;                                                                                // 1
  }                                                                                               // 1
}, 0);                                                                                            // 1
var Session = void 0;                                                                             // 1
module.watch(require("../session"), {                                                             // 1
  "default": function (v) {                                                                       // 1
    Session = v;                                                                                  // 1
  }                                                                                               // 1
}, 1);                                                                                            // 1
var Helper = void 0;                                                                              // 1
module.watch(require("../helper"), {                                                              // 1
  "default": function (v) {                                                                       // 1
    Helper = v;                                                                                   // 1
  }                                                                                               // 1
}, 2);                                                                                            // 1
var NavLink = void 0;                                                                             // 1
module.watch(require("react-router-dom"), {                                                       // 1
  NavLink: function (v) {                                                                         // 1
    NavLink = v;                                                                                  // 1
  }                                                                                               // 1
}, 3);                                                                                            // 1
var connect = void 0;                                                                             // 1
module.watch(require("react-redux"), {                                                            // 1
  connect: function (v) {                                                                         // 1
    connect = v;                                                                                  // 1
  }                                                                                               // 1
}, 4);                                                                                            // 1
var logoutTeller = void 0;                                                                        // 1
module.watch(require("../../redux/actions"), {                                                    // 1
  logoutTeller: function (v) {                                                                    // 1
    logoutTeller = v;                                                                             // 1
  }                                                                                               // 1
}, 5);                                                                                            // 1
                                                                                                  //
var Menu = function (_Component) {                                                                //
  (0, _inherits3.default)(Menu, _Component);                                                      //
                                                                                                  //
  function Menu(props) {                                                                          // 10
    (0, _classCallCheck3.default)(this, Menu);                                                    // 10
                                                                                                  //
    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));     // 10
                                                                                                  //
    _this.state = {};                                                                             // 12
    _this.isLoggedIn = Helper.isLoggedIn();                                                       // 15
    return _this;                                                                                 // 10
  } //                                                                                            // 16
  // componentWillMount(){                                                                        // 18
  //   if(Helper.isLoggedIn()){                                                                   // 19
  //                                                                                              // 20
  //   }                                                                                          // 21
  // }                                                                                            // 22
                                                                                                  //
                                                                                                  //
  Menu.prototype.componentWillMount = function () {                                               //
    function componentWillMount() {                                                               //
      console.log('this.props', this.props);                                                      // 25
    }                                                                                             // 26
                                                                                                  //
    return componentWillMount;                                                                    //
  }();                                                                                            //
                                                                                                  //
  Menu.prototype.render = function () {                                                           //
    function render() {                                                                           //
      var _this2 = this;                                                                          // 28
                                                                                                  //
      return React.createElement(                                                                 // 29
        "div",                                                                                    // 30
        {                                                                                         // 30
          className: "container"                                                                  // 30
        },                                                                                        // 30
        this.props.teller ? React.createElement(                                                  // 32
          "div",                                                                                  // 33
          null,                                                                                   // 33
          React.createElement(                                                                    // 34
            "span",                                                                               // 34
            null,                                                                                 // 34
            " Hello, ",                                                                           // 34
            this.props.teller.email,                                                              // 34
            " "                                                                                   // 34
          ),                                                                                      // 34
          React.createElement(                                                                    // 35
            "span",                                                                               // 35
            {                                                                                     // 35
              to: "/logout",                                                                      // 35
              onClick: function (e) {                                                             // 35
                _this2.props.dispatch(logoutTeller);                                              // 36
              }                                                                                   // 37
            },                                                                                    // 35
            "logout"                                                                              // 35
          )                                                                                       // 35
        ) : React.createElement(                                                                  // 33
          "div",                                                                                  // 40
          null,                                                                                   // 40
          React.createElement(                                                                    // 41
            NavLink,                                                                              // 41
            {                                                                                     // 41
              to: "/login"                                                                        // 41
            },                                                                                    // 41
            "login"                                                                               // 41
          ),                                                                                      // 41
          React.createElement(                                                                    // 42
            NavLink,                                                                              // 42
            {                                                                                     // 42
              to: "/register"                                                                     // 42
            },                                                                                    // 42
            "register"                                                                            // 42
          ),                                                                                      // 42
          React.createElement(                                                                    // 43
            "span",                                                                               // 43
            {                                                                                     // 43
              to: "/logout",                                                                      // 43
              onClick: function (e) {                                                             // 43
                _this2.props.dispatch(logoutTeller());                                            // 44
              }                                                                                   // 45
            },                                                                                    // 43
            "logout"                                                                              // 43
          )                                                                                       // 43
        )                                                                                         // 40
      );                                                                                          // 30
    }                                                                                             // 51
                                                                                                  //
    return render;                                                                                //
  }();                                                                                            //
                                                                                                  //
  return Menu;                                                                                    //
}(Component);                                                                                     //
                                                                                                  //
module.exportDefault(connect(function (props) {                                                   // 1
  return props;                                                                                   // 55
})(Menu));                                                                                        // 56
////////////////////////////////////////////////////////////////////////////////////////////////////

},"Panel.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/ui/Panel.js                                                                            //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                           //
                                                                                                  //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                  //
                                                                                                  //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");     //
                                                                                                  //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);            //
                                                                                                  //
var _inherits2 = require("babel-runtime/helpers/inherits");                                       //
                                                                                                  //
var _inherits3 = _interopRequireDefault(_inherits2);                                              //
                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
                                                                                                  //
var React = void 0,                                                                               // 1
    Component = void 0;                                                                           // 1
module.watch(require("react"), {                                                                  // 1
  "default": function (v) {                                                                       // 1
    React = v;                                                                                    // 1
  },                                                                                              // 1
  Component: function (v) {                                                                       // 1
    Component = v;                                                                                // 1
  }                                                                                               // 1
}, 0);                                                                                            // 1
var Session = void 0;                                                                             // 1
module.watch(require("../session"), {                                                             // 1
  "default": function (v) {                                                                       // 1
    Session = v;                                                                                  // 1
  }                                                                                               // 1
}, 1);                                                                                            // 1
var Showdown = void 0;                                                                            // 1
module.watch(require("meteor/markdown"), {                                                        // 1
  Showdown: function (v) {                                                                        // 1
    Showdown = v;                                                                                 // 1
  }                                                                                               // 1
}, 2);                                                                                            // 1
var withTracker = void 0;                                                                         // 1
module.watch(require("meteor/react-meteor-data"), {                                               // 1
  withTracker: function (v) {                                                                     // 1
    withTracker = v;                                                                              // 1
  }                                                                                               // 1
}, 3);                                                                                            // 1
var ReactDOM = void 0;                                                                            // 1
module.watch(require("react-dom"), {                                                              // 1
  "default": function (v) {                                                                       // 1
    ReactDOM = v;                                                                                 // 1
  }                                                                                               // 1
}, 4);                                                                                            // 1
var Template = void 0;                                                                            // 1
module.watch(require("meteor/templating"), {                                                      // 1
  Template: function (v) {                                                                        // 1
    Template = v;                                                                                 // 1
  }                                                                                               // 1
}, 5);                                                                                            // 1
var Timeline = void 0;                                                                            // 1
module.watch(require("./Timeline"), {                                                             // 1
  "default": function (v) {                                                                       // 1
    Timeline = v;                                                                                 // 1
  }                                                                                               // 1
}, 6);                                                                                            // 1
var Tellers = void 0,                                                                             // 1
    Subjects = void 0;                                                                            // 1
module.watch(require("../models"), {                                                              // 1
  Tellers: function (v) {                                                                         // 1
    Tellers = v;                                                                                  // 1
  },                                                                                              // 1
  Subjects: function (v) {                                                                        // 1
    Subjects = v;                                                                                 // 1
  }                                                                                               // 1
}, 7);                                                                                            // 1
module.watch(require("../css/style.css"));                                                        // 1
var Menu = void 0;                                                                                // 1
module.watch(require("./Menu"), {                                                                 // 1
  "default": function (v) {                                                                       // 1
    Menu = v;                                                                                     // 1
  }                                                                                               // 1
}, 8);                                                                                            // 1
var Helper = void 0;                                                                              // 1
module.watch(require("../helper"), {                                                              // 1
  "default": function (v) {                                                                       // 1
    Helper = v;                                                                                   // 1
  }                                                                                               // 1
}, 9);                                                                                            // 1
var connect = void 0;                                                                             // 1
module.watch(require("react-redux"), {                                                            // 1
  connect: function (v) {                                                                         // 1
    connect = v;                                                                                  // 1
  }                                                                                               // 1
}, 10);                                                                                           // 1
var Converter = new Showdown.converter();                                                         // 17
                                                                                                  //
var Panel = function (_Component) {                                                               //
  (0, _inherits3.default)(Panel, _Component);                                                     //
                                                                                                  //
  function Panel(props) {                                                                         // 20
    (0, _classCallCheck3.default)(this, Panel);                                                   // 20
                                                                                                  //
    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));     // 20
                                                                                                  //
    _this.state = {                                                                               // 22
      new_story_content: '',                                                                      // 23
      new_story_subjects: '',                                                                     // 24
      subjects: [],                                                                               // 25
      new_subject: ''                                                                             // 26
    };                                                                                            // 22
    _this.update_subjects_timer;                                                                  // 29
    _this.has_received_subjects = false;                                                          // 30
    _this.isLoggedIn = Helper.isLoggedIn(); // this.foo = new ReactiveVar( false );               // 31
    // this.foo.set({'teste': true})                                                              // 34
                                                                                                  //
    return _this;                                                                                 // 20
  }                                                                                               // 35
                                                                                                  //
  Panel.prototype.componentDidUpdate = function () {                                              //
    function componentDidUpdate() {                                                               //
      console.log('will update', this.props.teller);                                              // 39
                                                                                                  //
      if (this.props.subjects && !this.has_received_subjects) {                                   // 40
        this.has_received_subjects = true;                                                        // 41
      } // alert(this.foo.get())                                                                  // 42
                                                                                                  //
    }                                                                                             // 45
                                                                                                  //
    return componentDidUpdate;                                                                    //
  }();                                                                                            //
                                                                                                  //
  Panel.prototype.handleSubmitNewStory = function () {                                            //
    function handleSubmitNewStory(e) {                                                            //
      var _this2 = this;                                                                          // 47
                                                                                                  //
      e.preventDefault(); // cria os objectos de subject                                          // 48
                                                                                                  //
      var subjects = this.createSubjectsFromString(this.state.new_story_subjects);                // 52
      Meteor.call('panel.newStory', {                                                             // 54
        content: this.state.new_story_content,                                                    // 54
        subjects: subjects                                                                        // 54
      }, function (err, data) {                                                                   // 54
        if (!err) {                                                                               // 55
          console.log('data', data);                                                              // 56
          ReactDOM.findDOMNode(_this2.refs['new-story-subjects']).value = '';                     // 57
          ReactDOM.findDOMNode(_this2.refs['new-story-content']).value = '';                      // 58
                                                                                                  //
          _this2.setState({                                                                       // 59
            new_story_content: ''                                                                 // 59
          });                                                                                     // 59
        } else {                                                                                  // 60
          console.log('err', err);                                                                // 61
        }                                                                                         // 62
      });                                                                                         // 63
    }                                                                                             // 64
                                                                                                  //
    return handleSubmitNewStory;                                                                  //
  }();                                                                                            //
                                                                                                  //
  Panel.prototype.createSubjectsFromString = function () {                                        //
    function createSubjectsFromString(subjects_string) {                                          //
      var subjects = subjects_string.split(',').map(function (subject) {                          // 67
        return {                                                                                  // 68
          name: subject.trim()                                                                    // 69
        };                                                                                        // 68
      });                                                                                         // 71
      return subjects;                                                                            // 73
    }                                                                                             // 74
                                                                                                  //
    return createSubjectsFromString;                                                              //
  }();                                                                                            //
                                                                                                  //
  Panel.prototype.handleSubmitNewSubject = function () {                                          //
    function handleSubmitNewSubject(e) {                                                          //
      var _this3 = this;                                                                          // 76
                                                                                                  //
      e.preventDefault();                                                                         // 77
      var subjects = this.props.subjects;                                                         // 78
      subjects = subjects.concat(this.createSubjectsFromString(this.state.new_subject));          // 79
      Meteor.call('panel.updateSubjects', {                                                       // 80
        teller_id: this.props.teller._id,                                                         // 80
        subjects: subjects                                                                        // 80
      }, function (err, data) {                                                                   // 80
        if (!err) {                                                                               // 81
          ReactDOM.findDOMNode(_this3.refs['new-subject']).value = '';                            // 82
        } else {                                                                                  // 83
          console.log('err', err);                                                                // 84
        }                                                                                         // 85
      });                                                                                         // 86
    }                                                                                             // 87
                                                                                                  //
    return handleSubmitNewSubject;                                                                //
  }();                                                                                            //
                                                                                                  //
  Panel.prototype.removeSubject = function () {                                                   //
    function removeSubject(_id) {                                                                 //
      console.log('subjects ANTES remover', this.props.subjects);                                 // 90
      var subjects = this.props.subjects;                                                         // 91
      subjects = subjects.filter(function (subject) {                                             // 92
        return subject._id !== _id;                                                               // 93
      });                                                                                         // 94
      Meteor.call('panel.updateSubjects', {                                                       // 96
        teller_id: this.props.teller._id,                                                         // 96
        subjects: subjects                                                                        // 96
      }, function (err, data) {                                                                   // 96
        if (!err) {                                                                               // 97
          console.log('subjects', data);                                                          // 98
        } else {                                                                                  // 99
          console.log('err', err);                                                                // 100
        }                                                                                         // 101
      });                                                                                         // 102
    }                                                                                             // 103
                                                                                                  //
    return removeSubject;                                                                         //
  }();                                                                                            //
                                                                                                  //
  Panel.prototype.render = function () {                                                          //
    function render() {                                                                           //
      var _this4 = this;                                                                          // 105
                                                                                                  //
      if (this.props.subjects) {                                                                  // 106
        var subjects = this.props.subjects.map(function (subject, i) {                            // 107
          return React.createElement(                                                             // 108
            "span",                                                                               // 109
            {                                                                                     // 109
              key: i                                                                              // 109
            },                                                                                    // 109
            subject.name,                                                                         // 109
            " ",                                                                                  // 109
            React.createElement(                                                                  // 109
              "button",                                                                           // 109
              {                                                                                   // 109
                onClick: function () {                                                            // 109
                  _this4.removeSubject(subject._id);                                              // 110
                }                                                                                 // 111
              },                                                                                  // 109
              "Remover"                                                                           // 109
            )                                                                                     // 109
          );                                                                                      // 109
        });                                                                                       // 113
      } // if(this.props.teller){                                                                 // 114
                                                                                                  //
                                                                                                  //
      return React.createElement(                                                                 // 116
        "div",                                                                                    // 117
        {                                                                                         // 117
          className: "container"                                                                  // 117
        },                                                                                        // 117
        React.createElement(Menu, null),                                                          // 118
        this.props.teller ? React.createElement(                                                  // 120
          "div",                                                                                  // 121
          null,                                                                                   // 121
          React.createElement(                                                                    // 122
            "div",                                                                                // 122
            null,                                                                                 // 122
            "Seja bem vindo, ",                                                                   // 122
            this.props.teller.email                                                               // 122
          ),                                                                                      // 122
          React.createElement(                                                                    // 124
            "div",                                                                                // 124
            null,                                                                                 // 124
            subjects                                                                              // 125
          ),                                                                                      // 124
          React.createElement(                                                                    // 128
            "form",                                                                               // 128
            {                                                                                     // 128
              id: "new-subject-form",                                                             // 128
              onSubmit: this.handleSubmitNewSubject.bind(this)                                    // 128
            },                                                                                    // 128
            React.createElement("input", {                                                        // 129
              id: "new-subject",                                                                  // 129
              ref: "new-subject",                                                                 // 129
              onChange: function (e) {                                                            // 130
                _this4.setState({                                                                 // 131
                  new_subject: e.target.value                                                     // 131
                });                                                                               // 131
              }                                                                                   // 132
            })                                                                                    // 129
          ),                                                                                      // 128
          React.createElement(                                                                    // 136
            "form",                                                                               // 136
            {                                                                                     // 136
              className: "new-story-form",                                                        // 136
              onSubmit: this.handleSubmitNewStory.bind(this)                                      // 136
            },                                                                                    // 136
            React.createElement("div", {                                                          // 137
              id: "new-story-preview",                                                            // 137
              dangerouslySetInnerHTML: {                                                          // 137
                __html: Converter.makeHtml(this.state.new_story_content)                          // 137
              }                                                                                   // 137
            }),                                                                                   // 137
            React.createElement("textarea", {                                                     // 139
              id: "markdown-text",                                                                // 139
              ref: "new-story-content",                                                           // 139
              onChange: function (e) {                                                            // 140
                _this4.setState({                                                                 // 141
                  new_story_content: e.target.value                                               // 141
                });                                                                               // 141
              },                                                                                  // 142
              defaultValue: this.state.new_story_content                                          // 143
            }),                                                                                   // 139
            React.createElement("input", {                                                        // 146
              id: "new-story-subjects",                                                           // 146
              ref: "new-story-subjects",                                                          // 146
              defaultValue: this.state.new_story_subjects,                                        // 147
              onChange: function (e) {                                                            // 148
                _this4.setState({                                                                 // 149
                  new_story_subjects: e.target.value                                              // 149
                });                                                                               // 149
              }                                                                                   // 150
            }),                                                                                   // 146
            React.createElement(                                                                  // 153
              "button",                                                                           // 153
              null,                                                                               // 153
              "Send"                                                                              // 153
            )                                                                                     // 153
          ),                                                                                      // 136
          React.createElement(Timeline, {                                                         // 156
            subjects: this.props.teller.subjects                                                  // 156
          })                                                                                      // 156
        ) : null                                                                                  // 121
      ); // }else this.props.history.push('/panel');                                              // 117
    }                                                                                             // 163
                                                                                                  //
    return render;                                                                                //
  }();                                                                                            //
                                                                                                  //
  return Panel;                                                                                   //
}(Component);                                                                                     //
                                                                                                  //
var trackedComponent = withTracker(function (props) {                                             // 166
  console.log('props', props);                                                                    // 167
  var teller = Tellers.findOne({                                                                  // 168
    _id: Session.get('teller_id')                                                                 // 168
  });                                                                                             // 168
  return {                                                                                        // 169
    teller: teller,                                                                               // 170
    subjects: teller ? Subjects.find({                                                            // 171
      _id: {                                                                                      // 171
        $in: teller.subjects                                                                      // 171
      }                                                                                           // 171
    }).fetch() : []                                                                               // 171
  };                                                                                              // 169
})(Panel);                                                                                        // 173
var connectedComponent = connect(function (state) {                                               // 175
  console.log('state', state);                                                                    // 176
  return state;                                                                                   // 177
})(trackedComponent);                                                                             // 178
module.exportDefault(connectedComponent);                                                         // 1
////////////////////////////////////////////////////////////////////////////////////////////////////

},"Register.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/ui/Register.js                                                                         //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                           //
                                                                                                  //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                  //
                                                                                                  //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");     //
                                                                                                  //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);            //
                                                                                                  //
var _inherits2 = require("babel-runtime/helpers/inherits");                                       //
                                                                                                  //
var _inherits3 = _interopRequireDefault(_inherits2);                                              //
                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
                                                                                                  //
module.export({                                                                                   // 1
  "default": function () {                                                                        // 1
    return Register;                                                                              // 1
  }                                                                                               // 1
});                                                                                               // 1
var React = void 0,                                                                               // 1
    Component = void 0;                                                                           // 1
module.watch(require("react"), {                                                                  // 1
  "default": function (v) {                                                                       // 1
    React = v;                                                                                    // 1
  },                                                                                              // 1
  Component: function (v) {                                                                       // 1
    Component = v;                                                                                // 1
  }                                                                                               // 1
}, 0);                                                                                            // 1
var Session = void 0;                                                                             // 1
module.watch(require("../session"), {                                                             // 1
  "default": function (v) {                                                                       // 1
    Session = v;                                                                                  // 1
  }                                                                                               // 1
}, 1);                                                                                            // 1
var Helper = void 0;                                                                              // 1
module.watch(require("../helper"), {                                                              // 1
  "default": function (v) {                                                                       // 1
    Helper = v;                                                                                   // 1
  }                                                                                               // 1
}, 2);                                                                                            // 1
var Tellers = void 0;                                                                             // 1
module.watch(require("../models"), {                                                              // 1
  Tellers: function (v) {                                                                         // 1
    Tellers = v;                                                                                  // 1
  }                                                                                               // 1
}, 3);                                                                                            // 1
var Menu = void 0;                                                                                // 1
module.watch(require("./Menu"), {                                                                 // 1
  "default": function (v) {                                                                       // 1
    Menu = v;                                                                                     // 1
  }                                                                                               // 1
}, 4);                                                                                            // 1
var loginTeller = void 0;                                                                         // 1
module.watch(require("../../redux/actions"), {                                                    // 1
  loginTeller: function (v) {                                                                     // 1
    loginTeller = v;                                                                              // 1
  }                                                                                               // 1
}, 5);                                                                                            // 1
                                                                                                  //
var Register = function (_Component) {                                                            //
  (0, _inherits3.default)(Register, _Component);                                                  //
                                                                                                  //
  function Register(props) {                                                                      // 12
    (0, _classCallCheck3.default)(this, Register);                                                // 12
                                                                                                  //
    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));     // 12
                                                                                                  //
    _this.state = {                                                                               // 14
      email: '',                                                                                  // 15
      password: ''                                                                                // 16
    };                                                                                            // 14
    return _this;                                                                                 // 12
  }                                                                                               // 18
                                                                                                  //
  Register.prototype.componentDidMount = function () {                                            //
    function componentDidMount() {                                                                //
      if (Helper.isLoggedIn()) {                                                                  // 21
        this.props.history.push('/panel');                                                        // 22
      }                                                                                           // 23
    }                                                                                             // 24
                                                                                                  //
    return componentDidMount;                                                                     //
  }();                                                                                            //
                                                                                                  //
  Register.prototype.componentWillMount = function () {                                           //
    function componentWillMount() {}                                                              //
                                                                                                  //
    return componentWillMount;                                                                    //
  }();                                                                                            //
                                                                                                  //
  Register.prototype.handleSubmit = function () {                                                 //
    function handleSubmit(e) {                                                                    //
      var _this2 = this;                                                                          // 30
                                                                                                  //
      e.preventDefault();                                                                         // 31
      Meteor.call('register.teller', this.state, function (err, data) {                           // 33
        if (!err) {                                                                               // 34
          _this2.setState({                                                                       // 35
            email: '',                                                                            // 36
            password: ''                                                                          // 37
          });                                                                                     // 35
                                                                                                  //
          Session.set('teller_id', data._id);                                                     // 40
                                                                                                  //
          _this2.props.dispatch(loginTeller(data));                                               // 42
                                                                                                  //
          _this2.props.history.push('/panel');                                                    // 43
        } else {                                                                                  // 44
          console.log('err', err);                                                                // 45
        }                                                                                         // 46
      });                                                                                         // 47
    }                                                                                             // 48
                                                                                                  //
    return handleSubmit;                                                                          //
  }();                                                                                            //
                                                                                                  //
  Register.prototype.render = function () {                                                       //
    function render() {                                                                           //
      var _this3 = this;                                                                          // 50
                                                                                                  //
      return React.createElement(                                                                 // 51
        "div",                                                                                    // 52
        {                                                                                         // 52
          className: "container"                                                                  // 52
        },                                                                                        // 52
        React.createElement(                                                                      // 53
          "h1",                                                                                   // 53
          null,                                                                                   // 53
          "Register"                                                                              // 53
        ),                                                                                        // 53
        React.createElement(                                                                      // 54
          "form",                                                                                 // 54
          {                                                                                       // 54
            className: "register-form",                                                           // 54
            onSubmit: this.handleSubmit.bind(this)                                                // 54
          },                                                                                      // 54
          React.createElement("input", {                                                          // 55
            value: this.state.email,                                                              // 55
            ref: "email",                                                                         // 55
            name: "email",                                                                        // 55
            placeholder: "email",                                                                 // 55
            onChange: function (e) {                                                              // 55
              _this3.setState({                                                                   // 55
                email: e.target.value                                                             // 55
              });                                                                                 // 55
            }                                                                                     // 55
          }),                                                                                     // 55
          React.createElement("input", {                                                          // 56
            value: this.state.password,                                                           // 56
            ref: "password",                                                                      // 56
            name: "password",                                                                     // 56
            placeholder: "password",                                                              // 56
            onChange: function (e) {                                                              // 56
              _this3.setState({                                                                   // 56
                password: e.target.value                                                          // 56
              });                                                                                 // 56
            }                                                                                     // 56
          }),                                                                                     // 56
          React.createElement(                                                                    // 57
            "button",                                                                             // 57
            null,                                                                                 // 57
            "Send"                                                                                // 57
          )                                                                                       // 57
        )                                                                                         // 54
      );                                                                                          // 52
    }                                                                                             // 61
                                                                                                  //
    return render;                                                                                //
  }();                                                                                            //
                                                                                                  //
  return Register;                                                                                //
}(Component);                                                                                     //
////////////////////////////////////////////////////////////////////////////////////////////////////

},"Timeline.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/ui/Timeline.js                                                                         //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                           //
                                                                                                  //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                  //
                                                                                                  //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");     //
                                                                                                  //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);            //
                                                                                                  //
var _inherits2 = require("babel-runtime/helpers/inherits");                                       //
                                                                                                  //
var _inherits3 = _interopRequireDefault(_inherits2);                                              //
                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
                                                                                                  //
var React = void 0,                                                                               // 1
    Component = void 0;                                                                           // 1
module.watch(require("react"), {                                                                  // 1
  "default": function (v) {                                                                       // 1
    React = v;                                                                                    // 1
  },                                                                                              // 1
  Component: function (v) {                                                                       // 1
    Component = v;                                                                                // 1
  }                                                                                               // 1
}, 0);                                                                                            // 1
var Session = void 0;                                                                             // 1
module.watch(require("meteor/session"), {                                                         // 1
  Session: function (v) {                                                                         // 1
    Session = v;                                                                                  // 1
  }                                                                                               // 1
}, 1);                                                                                            // 1
var Showdown = void 0;                                                                            // 1
module.watch(require("meteor/markdown"), {                                                        // 1
  Showdown: function (v) {                                                                        // 1
    Showdown = v;                                                                                 // 1
  }                                                                                               // 1
}, 2);                                                                                            // 1
var withTracker = void 0;                                                                         // 1
module.watch(require("meteor/react-meteor-data"), {                                               // 1
  withTracker: function (v) {                                                                     // 1
    withTracker = v;                                                                              // 1
  }                                                                                               // 1
}, 3);                                                                                            // 1
var Stories = void 0;                                                                             // 1
module.watch(require("../models"), {                                                              // 1
  Stories: function (v) {                                                                         // 1
    Stories = v;                                                                                  // 1
  }                                                                                               // 1
}, 4);                                                                                            // 1
var Converter = new Showdown.converter();                                                         // 8
                                                                                                  //
var Timeline = function (_Component) {                                                            //
  (0, _inherits3.default)(Timeline, _Component);                                                  //
                                                                                                  //
  function Timeline(props) {                                                                      // 11
    (0, _classCallCheck3.default)(this, Timeline);                                                // 11
                                                                                                  //
    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));     // 11
                                                                                                  //
    _this.state = {                                                                               // 13
      loading: false,                                                                             // 14
      story_ids: [],                                                                              // 15
      stories: []                                                                                 // 16
    };                                                                                            // 13
                                                                                                  //
    _this.setPageScrollListener();                                                                // 19
                                                                                                  //
    return _this;                                                                                 // 11
  }                                                                                               // 20
                                                                                                  //
  Timeline.prototype.componentDidMount = function () {                                            //
    function componentDidMount() {                                                                //
      this.getStories();                                                                          // 23
    }                                                                                             // 24
                                                                                                  //
    return componentDidMount;                                                                     //
  }();                                                                                            //
                                                                                                  //
  Timeline.prototype.setPageScrollListener = function () {                                        //
    function setPageScrollListener() {                                                            //
      var _this2 = this;                                                                          // 26
                                                                                                  //
      window.onscroll = function () {                                                             // 27
        var d = document.documentElement;                                                         // 28
        var offset = d.scrollTop + window.innerHeight;                                            // 29
        var height = d.offsetHeight;                                                              // 30
        var padding = 10;                                                                         // 31
                                                                                                  //
        if (offset >= height - padding) {                                                         // 33
          // Get more stories                                                                     // 34
          _this2.getStories();                                                                    // 35
        }                                                                                         // 36
      };                                                                                          // 37
    }                                                                                             // 38
                                                                                                  //
    return setPageScrollListener;                                                                 //
  }();                                                                                            //
                                                                                                  //
  Timeline.prototype.getStories = function () {                                                   //
    function getStories() {                                                                       //
      var _this3 = this;                                                                          // 40
                                                                                                  //
      if (!this.state.loading) {                                                                  // 41
        this.setState({                                                                           // 42
          loading: true                                                                           // 42
        });                                                                                       // 42
        Meteor.call('timeline.getStories', {                                                      // 43
          subjects: this.props.subjects,                                                          // 43
          story_ids: this.state.story_ids                                                         // 43
        }, function (err, data) {                                                                 // 43
          if (!err) {                                                                             // 44
            var story_ids = _this3.state.story_ids;                                               // 45
            data.forEach(function (story) {                                                       // 46
              story_ids.push(story._id);                                                          // 47
            });                                                                                   // 48
                                                                                                  //
            var stories = _this3.state.stories.concat(data);                                      // 50
                                                                                                  //
            _this3.setState({                                                                     // 52
              loading: false,                                                                     // 52
              story_ids: story_ids,                                                               // 52
              stories: stories                                                                    // 52
            });                                                                                   // 52
          } else {                                                                                // 53
            _this3.setState({                                                                     // 54
              loading: false                                                                      // 54
            });                                                                                   // 54
          }                                                                                       // 55
        });                                                                                       // 56
      }                                                                                           // 57
    }                                                                                             // 58
                                                                                                  //
    return getStories;                                                                            //
  }();                                                                                            //
                                                                                                  //
  Timeline.prototype.render = function () {                                                       //
    function render() {                                                                           //
      var stories = this.state.stories.map(function (story) {                                     // 61
        return React.createElement(                                                               // 62
          "div",                                                                                  // 63
          {                                                                                       // 63
            key: story._id,                                                                       // 63
            className: "story"                                                                    // 63
          },                                                                                      // 63
          React.createElement("div", {                                                            // 64
            id: "content",                                                                        // 64
            dangerouslySetInnerHTML: {                                                            // 64
              __html: Converter.makeHtml(story.content)                                           // 64
            }                                                                                     // 64
          })                                                                                      // 64
        );                                                                                        // 63
      });                                                                                         // 67
      return React.createElement(                                                                 // 69
        "div",                                                                                    // 70
        {                                                                                         // 70
          className: "container"                                                                  // 70
        },                                                                                        // 70
        stories                                                                                   // 71
      );                                                                                          // 70
    }                                                                                             // 74
                                                                                                  //
    return render;                                                                                //
  }();                                                                                            //
                                                                                                  //
  return Timeline;                                                                                //
}(Component);                                                                                     //
                                                                                                  //
module.exportDefault(withTracker(function (_ref) {                                                // 1
  var subjects = _ref.subjects;                                                                   // 77
  return {}; // A outra prossibilidade seria modificar variáveis dentro deste módulo              // 78
  // para as variáveis reativas, por exemplo, de stories,                                         // 81
  // fizesse as buscas                                                                            // 82
  // mas o minimongo não permitiria em produção                                                   // 83
  // var stories_from_subjects = Stories.find({subjects: {$in: subjects}}).fetch();               // 85
  // var ids = stories_from_subjects.map((story)=>{                                               // 86
  //   return story._id;                                                                          // 87
  // });                                                                                          // 88
  //                                                                                              // 89
  // var more_stories = Stories.find({_id: {$nin: ids}}).fetch();                                 // 90
  //                                                                                              // 91
  // return {                                                                                     // 92
  //   stories: stories_from_subjects.concat(more_stories)                                        // 93
  // }                                                                                            // 94
})(Timeline));                                                                                    // 95
////////////////////////////////////////////////////////////////////////////////////////////////////

}},"helper.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/helper.js                                                                              //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                           //
                                                                                                  //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                  //
                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
                                                                                                  //
module.export({                                                                                   // 1
  "default": function () {                                                                        // 1
    return Helper;                                                                                // 1
  }                                                                                               // 1
});                                                                                               // 1
var Session = void 0;                                                                             // 1
module.watch(require("./session"), {                                                              // 1
  "default": function (v) {                                                                       // 1
    Session = v;                                                                                  // 1
  }                                                                                               // 1
}, 0);                                                                                            // 1
                                                                                                  //
var Helper = function () {                                                                        //
  function Helper() {                                                                             //
    (0, _classCallCheck3.default)(this, Helper);                                                  //
  }                                                                                               //
                                                                                                  //
  Helper.isLoggedIn = function () {                                                               //
    function isLoggedIn() {                                                                       //
      var teller_id = Session.get('teller_id');                                                   // 5
      if (teller_id) return true;                                                                 // 6
      return false;                                                                               // 7
    }                                                                                             // 8
                                                                                                  //
    return isLoggedIn;                                                                            //
  }();                                                                                            //
                                                                                                  //
  Helper.logout = function () {                                                                   //
    function logout() {                                                                           //
      Session.set('teller_id', null);                                                             // 10
      return false;                                                                               // 11
    }                                                                                             // 12
                                                                                                  //
    return logout;                                                                                //
  }();                                                                                            //
                                                                                                  //
  return Helper;                                                                                  //
}();                                                                                              //
////////////////////////////////////////////////////////////////////////////////////////////////////

},"models.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/models.js                                                                              //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
module.export({                                                                                   // 1
  Tellers: function () {                                                                          // 1
    return Tellers;                                                                               // 1
  },                                                                                              // 1
  Stories: function () {                                                                          // 1
    return Stories;                                                                               // 1
  },                                                                                              // 1
  Subjects: function () {                                                                         // 1
    return Subjects;                                                                              // 1
  }                                                                                               // 1
});                                                                                               // 1
var Mongo = void 0;                                                                               // 1
module.watch(require("meteor/mongo"), {                                                           // 1
  Mongo: function (v) {                                                                           // 1
    Mongo = v;                                                                                    // 1
  }                                                                                               // 1
}, 0);                                                                                            // 1
var Tellers = new Mongo.Collection('teller');                                                     // 3
var Stories = new Mongo.Collection('story');                                                      // 4
var Subjects = new Mongo.Collection('subject');                                                   // 5
////////////////////////////////////////////////////////////////////////////////////////////////////

},"session.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/session.js                                                                             //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                           //
                                                                                                  //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                  //
                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
                                                                                                  //
var PersistentSession = function () {                                                             //
  function PersistentSession() {                                                                  // 2
    (0, _classCallCheck3.default)(this, PersistentSession);                                       // 2
                                                                                                  //
    if (!('__miniblog__' in localStorage)) {                                                      // 3
      localStorage['__miniblog__'] = '{}';                                                        // 4
    }                                                                                             // 5
  }                                                                                               // 6
                                                                                                  //
  PersistentSession.prototype.get = function () {                                                 //
    function get(key) {                                                                           //
      var all = getAll();                                                                         // 9
      return all[key];                                                                            // 10
    }                                                                                             // 11
                                                                                                  //
    return get;                                                                                   //
  }();                                                                                            //
                                                                                                  //
  PersistentSession.prototype.set = function () {                                                 //
    function set(key, value) {                                                                    //
      var all = getAll();                                                                         // 14
      all[key] = value;                                                                           // 15
      setAll(all);                                                                                // 16
    }                                                                                             // 17
                                                                                                  //
    return set;                                                                                   //
  }();                                                                                            //
                                                                                                  //
  return PersistentSession;                                                                       //
}();                                                                                              //
                                                                                                  //
function getAll() {                                                                               // 20
  var all = localStorage['__miniblog__'];                                                         // 21
                                                                                                  //
  try {                                                                                           // 22
    return JSON.parse(all);                                                                       // 23
  } catch (e) {                                                                                   // 24
    console.log(e);                                                                               // 25
    return null;                                                                                  // 26
  }                                                                                               // 27
}                                                                                                 // 28
                                                                                                  //
function setAll(all) {                                                                            // 30
  localStorage['__miniblog__'] = JSON.stringify(all);                                             // 31
}                                                                                                 // 32
                                                                                                  //
module.exportDefault(Session = new PersistentSession());                                          // 1
////////////////////////////////////////////////////////////////////////////////////////////////////

}},"redux":{"actions.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// redux/actions.js                                                                               //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
module.export({                                                                                   // 1
  LOGIN_TELLER: function () {                                                                     // 1
    return LOGIN_TELLER;                                                                          // 1
  },                                                                                              // 1
  LOGOUT_TELLER: function () {                                                                    // 1
    return LOGOUT_TELLER;                                                                         // 1
  },                                                                                              // 1
  loginTeller: function () {                                                                      // 1
    return loginTeller;                                                                           // 1
  },                                                                                              // 1
  logoutTeller: function () {                                                                     // 1
    return logoutTeller;                                                                          // 1
  }                                                                                               // 1
});                                                                                               // 1
var LOGIN_TELLER = 'LOGIN_TELLER';                                                                // 1
var LOGOUT_TELLER = 'LOGOUT_TELLER';                                                              // 2
                                                                                                  //
function loginTeller(teller) {                                                                    // 4
  return {                                                                                        // 5
    type: LOGIN_TELLER,                                                                           // 6
    payload: {                                                                                    // 7
      teller: teller                                                                              // 8
    }                                                                                             // 7
  };                                                                                              // 5
}                                                                                                 // 11
                                                                                                  //
function logoutTeller() {                                                                         // 13
  return {                                                                                        // 14
    type: LOGOUT_TELLER,                                                                          // 15
    payload: true                                                                                 // 16
  };                                                                                              // 14
}                                                                                                 // 18
////////////////////////////////////////////////////////////////////////////////////////////////////

},"index.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// redux/index.js                                                                                 //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var Actions = void 0;                                                                             // 1
module.watch(require("./actions"), {                                                              // 1
  "*": function (v) {                                                                             // 1
    Actions = v;                                                                                  // 1
  }                                                                                               // 1
}, 0);                                                                                            // 1
var Session = void 0;                                                                             // 1
module.watch(require("../imports/session"), {                                                     // 1
  "default": function (v) {                                                                       // 1
    Session = v;                                                                                  // 1
  }                                                                                               // 1
}, 1);                                                                                            // 1
var initial_state = {                                                                             // 4
  name: 'foo',                                                                                    // 5
  teller: null                                                                                    // 6
};                                                                                                // 4
module.exportDefault(function () {                                                                // 1
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initial_state;  // 9
  var action = arguments[1];                                                                      // 9
  console.log('Reducer >> ', state, action);                                                      // 10
                                                                                                  //
  if (action.type == Actions.loginTeller) {                                                       // 12
    Session.set('teller', action.teller);                                                         // 13
    return Object.assign({}, state, {                                                             // 14
      teller: action.teller                                                                       // 14
    });                                                                                           // 14
  }                                                                                               // 15
                                                                                                  //
  if (action.type == Actions.logoutTeller) {                                                      // 17
    Session.set('teller', null);                                                                  // 18
    return Object.assign({}, state, {                                                             // 19
      teller: null                                                                                // 19
    });                                                                                           // 19
  }                                                                                               // 20
                                                                                                  //
  return state;                                                                                   // 22
});                                                                                               // 23
////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".css"
  ]
});
require("./client/template.main.js");
require("./redux/actions.js");
require("./redux/index.js");
require("./client/main.js");