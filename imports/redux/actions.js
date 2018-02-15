export const LOGIN_TELLER = 'LOGIN_TELLER';
export const LOGOUT_TELLER = 'LOGOUT_TELLER';
export const SET_TELLER = 'SET_TELLER';

export function setTeller(teller){
  return {
    type: SET_TELLER,
    payload: {
      teller: teller
    }
  };
}

export function loginTeller(teller){
  return {
    type: LOGIN_TELLER,
    payload: {
      teller: teller
    }
  };
}

export function logoutTeller(){
  return {
    type: LOGOUT_TELLER,
    payload: true
  };
}
