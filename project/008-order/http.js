window.http = {
  post : function (url, data) {
    data = data || {};

    data.app_key   = '1405467a257039494b71d95fb411ec4d68e7ba3c20c987dc1207e78886d5e94e';
    data.timestamp = (new Date).getTime();
    data.signature = this.sign(data.app_key, data.timestamp);

    return axios
      .post('http://mock.biaoyansu.com/api/' + url, data)
      .then(function (res) {
        return res;
      });
  },

  sign : function (app_key, timestamp) {
    return btoa(app_key + timestamp);
  },
};
