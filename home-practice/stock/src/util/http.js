import axios from 'axios'

const APP_KEY  = 'af9f36c4e5c171d1c2d7b5076030d238ca23a82bab5ab3aa59197401aa1504c6';
const BASE_API = 'http://mock.biaoyansu.com/api/';
const REAL_API = 'http://3s.net579.com:23484/todo/api/v1.0/tasks';
function sign (app_key, timestamp) {
  return btoa(app_key + timestamp);
}

function post (url, params) {
  let timestamp = (new Date).getTime();
  let signature = sign(APP_KEY, timestamp);

  let opt = {
    headers : {
      'biao-mock-app-key'   : APP_KEY,
      'biao-mock-timestamp' : timestamp,
      'biao-mock-signature' : signature,
    },
  };

  url = BASE_API + url;
  return axios
    .post(url, params, opt)
    .then(r => {
      return r;
    });
}

function api(){
  return axios
    .post(REAL_API)
    .then(r=>{
      return r;
    })
}

let http = {
  post,
  api,
}

export default http