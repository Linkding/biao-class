import Vue from 'vue';

function parse_string_rule(str){
    let rule = {};
    str.split("|")
        .forEach(r => {
            let arr = r.split(':');
            let key  = arr[0];
            let val = arr[1];

            val = val === undefined? true:val;
            rule[key] = val;
        });
    return rule;
}
const valid = {
    required(val){
        if(typeof val === 'number')
            return false;
        return !!val;
    },
    username(val){
        if(!val)
            return
        let usernameregx = /^[a-zA-Z0-9]+$/ ;
        return  usernameregx.test(val)
    },
    max_length(val,max){
        return val.length < parseInt(max);
    },
    min_length(val,min){
        return val.length >= parseInt(min);
    }
}

export default Vue.directive('validator',{
    bind:function(el,bingding){
        let rule = parse_string_rule(bingding.value);

        el.addEventListener('keyup',()=>{
            let val = el.value;

            for(let r in rule){
                let arg = rule[r];
                let validator = valid[r];

                if(validator && validator(val,arg)){
                    console.log(r+'合法')
                }else{
                    console.log(r+'不合法')
                }
            }
        })
    }
})
/**
 * 设计，可以自定义检测标准和阀值，那么需要一个可以传参的插槽，通过指令对象提供的函数，可以进行传参(el,binding)。
 * 自定义validator函数需要：
 * 1、将自定义的标准和阀值，转化为一个对象，{key:val,key:val}, 这里的数据结构，key代码判断函数名字，key代表判断的阀值
 * 2、定义的标准和阀值对应的检验函数,每个审查都需要一一对应一个检验函数
 * 3、编写钩子函数
 * **/ 