// alert('yo')
var arr = [1,2,3];

arr = ['a','b','c'];

// persion = arr[1];
// persion2 = arr[2];

// console.log(persion);
// console.log(persion2);

// 

var a = {
    a1: [
        'a','b', { v:666 }
    ]
}
console.log('a的666')
console.log(a.a1[2].v);

var b = [
    1,3, 'a', {
        b2: {
            a:1,
            v:7,
            c: [{
                z:666
            }]
        }
    }
]

console.log('b的666');
console.log(b[3].b2.c[0].z);

var c = {
    a: {
      u: 1,
      d: {
        o: {
          z: { 1: 2, y: [1, 2] }
        },
        p: {
          yo: [3, 5, 666]
        }
      }
    }
}

console.log('c的666')
console.log(c.a.d.p.yo[2])


var d = [
    [1,3,'abc'],
    [
        'muhaha',
        {d:1,v:['a','b',{z:666}]}
    ]
]

console.log('d的666')
console.log(d[1][1].v[2].z)

var e = {
    a: [3, {
        b: 1,
        v: [1, 3, {
        p: 666
        }]
    }, 9]
}

console.log('e的666')
console.log(e.a[1].v[2].p)