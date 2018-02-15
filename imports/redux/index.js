import * as Actions from './actions';
import Session from '../session';
import { createHashHistory } from 'history';

const history = createHashHistory();

const initial_state = {
  name: 'foo',
  teller: null
};

export default function(state = initial_state, action){
  console.log('Reducer >> ', state, action);

  if(action.type == Actions.LOGIN_TELLER){
    Session.set('teller', action.payload.teller);
    const new_state = Object.assign({}, state, {teller: action.payload.teller});
    // history.push('/panel');
    return new_state;
  }

  if(action.type == Actions.LOGOUT_TELLER){
    Session.set('teller', null);
    const new_state = Object.assign({}, state, {teller: null});
    // history.push('/login');
    return new_state;
  }

  if(action.type == Actions.SET_TELLER){
    console.log('SET TELLER', action.payload)
    return Object.assign({}, state, {teller: action.payload.teller});
  }

  return state;
}
