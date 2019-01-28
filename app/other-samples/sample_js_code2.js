
var a = 1000;
(function(){
    console.log("a val is",a); // a is undefined
    var a = 20;
    console.log(" test a ",a); // a = 20
})();
// above function syntax - iife (Immediately Invoked function expression)
//https://stackoverflow.com/questions/8228281/what-is-the-function-construct-in-javascript
/***************/

var t = 1+"2"+3+4;
console.log(t); // 1234

var t1 = 1+2+3+"4";
console.log(t1); // 64 { left to right }

/***************/
var b = 100;

function testVariableHosting(){
    console.log("b val is:",b);  
    var b;
}

testVariableHosting();// b is undefined . This effect due to variable hosting. next line will come on top before console.log so .

/***************/


function sum(a,b){
    return a+b;
}

function sum(a){
    return a;
}

console.log(sum(3,5)); // 3 . as the earlier sum(a,b) will now replaced with sum(a) - no function overriding in js
console.log(sum(2)); //2
 
/************/

var a = null;
console.log(typeof(a) === 'object'); //true

/***********/

//unhandled exceptions handling:
process.on('uncaughtException', function (err) {
    console.log(err);
  })


/*******
 * CREATING GLOBAL VARIABLES IN NODEJS*/
//
// Global.js

global.globalString = "This can be accessed anywhere!";  
console.log(globalString); // Output: "This can be accessed anywhere!"

globalString = "Check me out now";  
console.log(globalString); // Output: "Check me out now"

globalString = undefined;  
console.log(globalString); // Output: undefined  

//Example.js
console.log(globalString); // Output: undefined

globalString = "We can change it too!";  
console.log(globalString); // Output: "We can change it too!"  
/**************/

/* Create & set Session in Nodejs -https://stackoverflow.com/questions/5765777/nodejs-how-to-create-and-read-session-with-express */

// closures.

