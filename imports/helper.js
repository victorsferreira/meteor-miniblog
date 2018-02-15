import Session from './session';

export default class Helper{
  static isLoggedIn(){
    var teller = Session.get('teller');
    if(teller) return true;
    return false
  }
    static logout(){
      Session.set('teller_id', null);
      return false;
    }
}
