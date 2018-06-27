window.http = {
  post : function (url, data) {
    data = data || {};

    data.app_key   = 'b4a4abf584199f4a5022b3e17241ba16178e4c1668a57dace6430fbbf31b5155';
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
