window.http = {
    post: function (url, data) {
        data = data || {};

        data.app_key = 'f9d71547efe93859e344be345859d51c114f6e16234c1c9e49b0f3f281cdfc77';
        data.timestamp = (new Date).getTime();
        data.signature = this.sign(data.app_key, data.timestamp)

        return axios.post('http://mock.biaoyansu.com/api/' + url, data)
            .then((res) => {
                return res;
            })
    },
    sign: function (key, timestamp) {
        return btoa(key + timestamp)
    }
}  