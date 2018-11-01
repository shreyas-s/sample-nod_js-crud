var fs = require('fs');
var chalk = require('chalk');
/*console.log("here");
fs.readFile('sample.txt',(err,data)=>{
  if(err){
      console.log(chalk.red("issue in reading file"));
  }
  else{
   console.log(`data in async way is \n ${data}`);
  }
});
console.log("there");
// o/p : here -> there -> o/p (since async)

console.log("sync way");

var data = fs.readFileSync('sample.txt');
console.log(`data in sync way is \n ${data}`);

console.log("ends sync way");

fs.writeFile('test.txt', 'Hello Om', function (err) { 
    if (err)
console.log(err);
    else
console.log('Write operation complete.');
});

fs.appendFile('test.txt', 'i am experiencing node', function (err) { 
    if (err)
console.log(err);
    else
console.log('Append operation complete.');
});*/
fs.readdir('.',((err,data)=>{
  console.log(data);
})
);


