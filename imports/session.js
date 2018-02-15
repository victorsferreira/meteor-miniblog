class PersistentSession {
  constructor(){
    if(!('__miniblog__' in localStorage)){
      localStorage['__miniblog__'] = '{}';
    }
  }

  get(key){
    var all = getAll();
    return all[key];
  }

  set(key, value){
    var all = getAll();
    all[key] = value;
    setAll(all);
  }
}

function getAll(){
  var all = localStorage['__miniblog__'];
  try{
    return JSON.parse(all);
  }catch(e){
    console.log(e);
    return null;
  }
}

function setAll(all){
  localStorage['__miniblog__'] = JSON.stringify(all);
}

export default Session = new PersistentSession();
