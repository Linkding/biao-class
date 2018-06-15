window.http = {
    post,
}

let config = {
    app_key: 'f9d71547efe93859e344be345859d51c114f6e16234c1c9e49b0f3f281cdfc77',
    timestamp: (new Date).getTime(),
};
config.signature = sign(config.app_key,config.timestamp);

function post(url,data){
    url =  'http://mock.biaoyansu.com/api/' + url;
    let sign = this.sign
    data = Object.assign({},config,data);

    return axios
            .post(url,data)
            .then((res)=>{
                return res;
            })
}


function sign(app_key,datestamp){
    return btoa(app_key + datestamp)
}
