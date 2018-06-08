function get_obj(data, key) {
    let result = Object.assign({}, data);

    // 将键通过点分割成数组：'a.b' ==> ['a','b']
    let layer = key.split('.');
    
    // 循环这个数组，每一次就是深入一级
    // data
    // |_user_
    //        |_name:
    //        |_age:
    //        |_chile:
    //          |_name:
    //          |_age:
    layer.forEach(function(key){
        result = result[key];
    });
    return result;
}

function parse(tpl, data) {
    const re = /{{([^{]+)}}/g;
    let match;

    let result = tpl;

    while (match = re.exec(tpl)) {
        //获取匹配到的第一部分 , {{user.name}}
        let variable = match[0];
        //获取匹配的第二部分(键名)， user.name
        let key = match[1].trim();
        //利用键名，从data中获取对应的值
        let replacement = get_obj(data, key);
        

        //将获取到的值，对源数据进行替换
        result = result.replace(variable, replacement)
    }
    return result;
}


let tpl = '我叫{{ user.name }}，我今年{{user.age}}岁了。我娃叫{{user.child.name}}';

let data = {
    user:
        {
            name: '王花花',
            age: 18,
            child: {
                name: '赵可爽',
            },
        },
};

// let r = parse(tpl,data)
// console.log('r',r);

window.parse = parse;