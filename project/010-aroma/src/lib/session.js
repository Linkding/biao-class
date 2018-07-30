function uinfo(){
    return JSON.parse(localStorage.getItem('uinfo'))
}

function logout(url){
    localStorage.removeItem('uinfo');
    location.href = url || '/'; //退出后默认跳转首页，或者自定义
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