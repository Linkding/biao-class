function uinfo(){
    return JSON.parse(localStorage.getItem('uinfo'))
}

function logout(url){
    localStorage.removeItem('uinfo');
    location.href = url || '/';
}
function login(row){
    localStorage.setItem('uinfo',JSON.stringify(row))
    if(row.username == 'admin'){
        this.$router.push('/admin/user')
    }else{
        this.$router.push('/')
    }
}
export default {
    uinfo,
    logout,
    login,
}