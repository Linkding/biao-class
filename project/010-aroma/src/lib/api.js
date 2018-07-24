import axios from 'axios'

const APP_KEY  = '2d134a77815444297452e95bdde2843636588fdab061d704a204dd407752e81a';
const BASE_API = 'http://mock.biaoyansu.com/api/1/';

function sign (app_key, timestamp) {
  return btoa(app_key + timestamp);
}

export default function api (url, params) {
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