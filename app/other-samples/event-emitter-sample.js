const EventEmitter = require('events');
const util = require('util');

//sample custom event creation
var myCustEmitter = new EventEmitter.EventEmitter();

myCustEmitter.on('custEvent1',(msg)=>{
    console.log(msg);
});

myCustEmitter.emit('custEvent1','this is simple event emit flow');
// end of sample

/*
-- old way before es6 syntax - so commented
var Person = function(name){
    this.name = name;
}

util.inherits(Person,EventEmitter); // this helps an obj Person to inherit obj event emitter for using custom events
*/
class Person extends EventEmitter{
    constructor(name){
        super();
        this.name = name;
    }
}

var om = new Person("Om");
var shr = new Person("Shreyas");
var ram = new Person("Ram");

var ppl = [om,shr,ram];

ppl.forEach((person)=>{
    person.on('speak',(msg)=>{
        console.log(`${person.name} said ${msg}`);
    });
});
om.emit("speak","Hello Guys , wats up");
ram.emit("speak","Hello Guys , wats up");