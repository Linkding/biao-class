function uinfo(){
    return JSON.parse(localStorage.getItem('uinfo'))
}

function logout(url){
    localStorage.removeItem('uinfo');
    location.href = url || '/';
}
function login(row){
    localStorage.setItem('uinfo',JSON.stringify(row))
}
function is_admin(){
    let info = this.uinfo();
    return info && this.uinfo().is_admin;
}
export default {
    uinfo,
    logout,
    login,
    is_admin,
}