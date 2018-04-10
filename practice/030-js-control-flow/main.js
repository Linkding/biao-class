// var age = 46;
// console.log(age)

// if (age < 18 ) {
//     console.log('kid')
// }
// else if(age == 18) {
//     console.log('小鲜肉');
// }
// else if (  age > 18 && age < 45) {
//     console.log('大好青年');
// }
// else if ( age >= 45 && age < 60 ) {
//     console.log('大叔');
// }

// else {
//     console.log('拜拜')
// }

var age_element = document.querySelector('#age');
var name_element = document.querySelector('#name');

age_element.addEventListener('change', function () {
    var age = age_element.value.trim();
    age = parseInt(age);
    if (!age) {
        console.log('年龄不能为空');
    }
    else if (typeof (age) !== "number") {
        console.log('年龄不能非数字')
    }
    else if (typeof (age) == "number") {
        console.log(age);
    }
    //   console.log(age);
});

name_element.addEventListener('change', function () {
    var name = name_element.value.trim();

    if (!name) {
        console.log('你是谁？');
    } else {
        console.log(name + ',你好啊')
    }
})