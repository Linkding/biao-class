import axios from 'axios'

const APP_KEY  = 'af9f36c4e5c171d1c2d7b5076030d238ca23a82bab5ab3aa59197401aa1504c6';
const BASE_API = 'http://mock.biaoyansu.com/api/1/';
const REAL_API = 'http://119.29.72.177:8888/todo/api/v1.0/tasks';
function sign (app_key, timestamp) {
  return btoa(app_key + timestamp);
}

function post (url, params) {
  let timestamp = (new Date).getTime();
  let signature = sign(APP_KEY, timestamp);

  let opt = {
    headers : {
      'BIAO-MOCK-APP-KEY'   : APP_KEY,
      'BIAO-MOCK-TIMESTAMP' : timestamp,
      'BIAO-MOCK-SIGNATURE' : signature,
    },
  };

  url = BASE_API + url;
  return axios
    .post(url, params, opt)
    .then(r => {
      return r.data;
    });
}

function api(params){
  let opt =  {
    headers: {
    'Content-Type': 'application/json;charset=UTF-8'
    },
  }
  return axios
    .post(REAL_API,params,opt)
    .then(r=>{
      return r.data;
    })
}

let http = {
  post,
  api,
}

export default http