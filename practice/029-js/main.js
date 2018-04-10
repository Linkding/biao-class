// alert('yo')
var arr = [1,2,3];

arr = ['a','b','c'];

// persion = arr[1];
// persion2 = arr[2];

// console.log(persion);
// console.log(persion2);

// 

// var a = {
//     a1: [
//         'a','b', { v:666 }
//     ]
// }
// console.log('a的666')
// console.log(a.a1[2].v);

// var b = [
//     1,3, 'a', {
//         b2: {
//             a:1,
//             v:7,
//             c: [{
//                 z:666
//             }]
//         }
//     }
// ]

// console.log('b的666');
// console.log(b[3].b2.c[0].z);

// var c = {
//     a: {
//       u: 1,
//       d: {
//         o: {
//           z: { 1: 2, y: [1, 2] }
//         },
//         p: {
//           yo: [3, 5, 666]
//         }
//       }
//     }
// }

// console.log('c的666')
// console.log(c.a.d.p.yo[2])


// var d = [
//     [1,3,'abc'],
//     [
//         'muhaha',
//         {d:1,v:['a','b',{z:666}]}
//     ]
// ]

// console.log('d的666')
// console.log(d[1][1].v[2].z)

// var e = {
//     a: [3, {
//         b: 1,
//         v: [1, 3, {
//         p: 666
//         }]
//     }, 9]
// }

// console.log('e的666')
// console.log(e.a[1].v[2].p)

/* 打印出“我叫王花花，我今年18岁了” */

var person = {
name: '王花花',
age: 18,
}

a = '我叫' + person.name + ',我今年' + person.age + '岁';
console.log(a)

/* 打印出“我叫李拴蛋，我老婆叫王花花，今年18岁了” */

person = {
name: '李拴蛋',
wife: {
    name: '王花花',
    age: 18
    }
}

a = '我叫' + person.name + '，我老婆叫' + person.wife.name +  '，今年' + person.wife.age + '岁了';
console.log(a)

/* 打印出“我叫李拴蛋，我老婆一共有200块” */

person = {
name: '李拴蛋',
wife: {
    name: '王花花',
    age: 18,
    huabei: 1000,
    balance: 1200
},
}

count = person.wife.balance - person.wife.huabei
a = '我叫' + person.name + '，我老婆一共有' +  count + '块';
console.log(a)

/* 打印出“我叫李拴蛋，我丈人有3个朋友” */

person = {
name: '李拴蛋',
wife: {
    name: '王花花',
    dad: {
    friends: ['王一','王二','李三']
    }
},
}
len = person.wife.dad.friends.length
a = '我叫' + person.name + '，我丈人有' + len + '个朋友';
console.log(a);

/* 打印出“我叫李拴蛋，我丈人的第一个朋友叫王一，第三个朋友叫李三” */

person = {
name: '李拴蛋',
wife: {
    name: '王花花',
    dad: {
    friends: [{
        name: '王一',
        children: 1,
        averageScore: 44
    }, {
        name: '王二',
        children: 3,
        averageScore: 98        
    } ,{
        name:'李三',
        children: 5,
        averageScore: 87        
    }]
    }
},
}

a = '我叫' + person.name + '，我丈人的第一个朋友叫' + person.wife.dad.friends[0].name + '，第三个朋友叫' + person.wife.dad.friends[2].name
console.log(a);

/* 打印出“我叫李拴蛋，我丈人朋友们的孩子们的平均分是85.888888888” */

person = {
name: '李拴蛋',
wife: {
    name: '王花花',
    dad: {
    friends: [{
        name: '王一',
        children: 1,
        averageScore: 44
    }, {
        name: '王二',
        children: 3,
        averageScore: 98        
    } ,{
        name:'李三',
        children: 5,
        averageScore: 87        
    }]
    }
},
}

// console.log(person.wife.dad.friends[0].averageScore);
all = person.wife.dad.friends[0].averageScore + person.wife.dad.friends[1].averageScore + person.wife.dad.friends[2].averageScore
// all = sum([person.wife.dad.friends[0].averageScore , person.wife.dad.friends[1].averageScore , person.wife.dad.friends[2].averageScore])
averge = all / person.wife.dad.friends.length
a = '我叫' + person.name +   '，我丈人朋友们的孩子们的平均分是'  + averge;
console.log(a)