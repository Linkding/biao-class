import send from '../Util/send'

let instance;


class Article {
    read(page){
        send.get('/api/article/read',data =>{
            console.log(data)
        })
    }
}

function init(){
    if(!instance)
        instance   = new Article();

}

init();

export default instance;