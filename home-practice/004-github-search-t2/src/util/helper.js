function find_and_delete(arr,kwd){
    var index_shit = arr.indexOf(kwd);
    if(index_shit == -1)
        return false;
    arr.splice(kwd,1);
    return true;
}

module.exports = {
    find_and_delete:find_and_delete
}