function set(name,data){
    var json = JSON.stringify(data);
    localStorage.setItem(name,json);
}

function get(name){
    var data = localStorage.getItem(name);
    return data = JSON.parse(data);

}

module.exports = {
    get:get,
    set:set,
}