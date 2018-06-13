window.http = {
    post,
    send
};

window.send = send;

let config = {
    app_key : 'f9d71547efe93859e344be345859d51c114f6e16234c1c9e49b0f3f281cdfc77'
}

// 制作签名
function sign(key,timestamp){
    return btoa(key + timestamp);
}


function send(url, method, data,on_succeed, on_error) {
    method = method || 'get';

   let def = {
       app_key : config.app_key,
       timestamp: (new Date).getTime(),// 等于 let a = new Date; a.getTime();
   }

   def.signature = sign(def.app_key,def.timestamp);

   data = Object.assign({},def,data);

   let http = new XMLHttpRequest();
   http.open(method,url);
   http.setRequestHeader('Content-Type', 'application/json');
   http.send(JSON.stringify(data));

   http.addEventListener('load',()=>{
       let res = JSON.parse(http.responseText);
       on_succeed(res);
   });
}

function post(url,data,on_succeed,on_error){
    send(url,'post',data,on_succeed,on_error);
}
