 function withoutLetTest(){
    console.log('without using let:');
  for(i = 1; i < 5; i++) {
    setTimeout(() => {
      console.log(i);
    },i*1000);
  }  
}

withoutLetTest();
// pgm2
// o/p: 5 5 5 5

function withLet(){
console.log("with let:");
for(let i = 1; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  },i*1000);
}
}
//withLet();
// o/p: 1 2 3 4