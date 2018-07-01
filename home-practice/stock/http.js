window.http = {
  post : function (url, data) {
    data = data || {};

    data.app_key   = 'af9f36c4e5c171d1c2d7b5076030d238ca23a82bab5ab3aa59197401aa1504c6';
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
