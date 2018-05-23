window.helper = {
    get_form_data: get_form_data,
    set_form_data: set_form_data,
    clear_form: clear_form,
}

function get_form_data(form_selector){
    /*看看是不是选择器，如果是选择器就一定是字符串。*/
    if(typeof form_selector == 'string')
        form_selector = document.querySelector(form_selector);
    
    var data  = {};
    var list = form_selector.querySelectorAll('[name]');

    list.forEach(function(input){
        switch (input.nodeName){
            case 'INPUT':
                switch (input.type){
                    case 'text':
                    case 'search':
                    case 'number':
                    case 'password':
                    case 'input':
                    case 'hidden':
                        data[input.name] = input.value;
                        break;
                    case 'radio':
                    case 'checkbox':
                        data[input.name] = input.checked;
                        break;
                }
                break;
            case 'TEXTAREA':
                data[input.name] = input.value;
                break;
        }
    })
    return data;
}

function set_form_data(form_selector, data) {
    /*看看是不是选择器，如果是选择器就一定是字符串。*/
    if(typeof form_selector == 'string')
        form_selector = document.querySelector(form_selector);

    for (var key in data) { //data类型为对象时，遍历的key为键
        var value = data[key];

        var input = form_selector.querySelector(`[name=${key}]`);
        // 如果不存在指定这个元素name，跳过继续下一个
        if (!input)
            continue;

        var data_type = typeof value; //获取值的类型
        switch (data_type) {
            // 如果是字符串或者数字，就默认为input[type=text|password|...]
            case 'string':
            case 'number':
                input.value = value;
                break;
            // 如果是布尔值，默认input[type=radio|checkbox|...]
            case 'boolean':
                input.checked = value;
                break;

        }
    }


}

/**
 * 清空表单（并非重置表单）
 *
 * 将所有的字符类input设为空字符串；
 * 将所有radio和checkbox设为unchecked
 * @param String|HTMLFormElement 选择器或表单元素
 * */
function clear_form(form) {
    /*看看是不是选择器，如果是选择器就一定是字符串。*/
    if (typeof form == 'string')
      form = document.querySelector(form); // 通过选择器拿到元素对象
  
    form
      .querySelectorAll('[name]')
      .forEach(function (input) {
        if (input.type == 'radio' || input.type == 'checkbox')
          input.checked = false;
        else
          input.value = '';
      });
  }