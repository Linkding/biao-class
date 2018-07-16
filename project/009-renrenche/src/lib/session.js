function uinfo(){
    return JSON.parse(localStorage.getItem('uinfo'))
}

function logout(url){
    localStorage.removeItem('uinfo');
    location.href = url || '/';
}

export default {
    uinfo,
    logout,
}