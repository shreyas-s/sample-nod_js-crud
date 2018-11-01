//var arr = [5, 5, 5, 2, 2, 2, 2, 2, 9, 4];
//brill Int Q1:

var arr = ["hello","hi","Om","hi","hello","text","text","hello","text","text"];
var counts = {};

for (var i = 0; i < arr.length; i++) {
  var num = arr[i];
  counts[num] = counts[num] ? counts[num] + 1 : 1;
}

console.log(counts);

// brill Int Q2: - Object Copy

var obj1 = { a: 3 , b: 2 , c :5 };

var obj2 = Object.assign({},obj1); // method1
obj2.a = 10;
console.log(obj2);
console.log("original obj is not modified here:");
console.log(obj1);

var obj3 = JSON.parse(JSON.stringify(obj1)); // method2
obj3.c = 19;
console.log(obj3);
console.log("original obj is not modified here:");
console.log(obj1);

 const obj4 = Object.assign({ a: 20},obj1);
console.log(obj4);
console.log("original obj is not modified here:");
console.log(obj1);



var obj5 = obj1; 
obj5.b = 6;
console.log(obj5);
// obj1 value will be changed now. since a new ref to same obj is created above.
console.log("original obj is changed here:");
console.log(obj1);


/*What is the difference between Arrow function and normal function?
The key difference, despite being shorter to write, is that arrow functions do not create their own value for 'this'. They will instead use the value of the enclosing block. ... With a regular function, this.x would be undefined, so it would log NaN. The body of an arrow function is assumed to be the return value from it.*/



for(i = 1; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  },i*1000);
}