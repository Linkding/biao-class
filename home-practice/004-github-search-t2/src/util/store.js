function set(key,val){
    var json = JSON.stringify(val)
    localStorage.setItem(key,json)
}

function get(key){
    var data = localStorage.getItem(key)
    return data = JSON.parse(data)
}

module.exports = {
    set:set,
    get:get,
}