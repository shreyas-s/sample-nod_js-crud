var cp = require('child_process');
var tasks = {
    list: "ls",
    copy: "cp",
    make_dir: "mkdir"
}

var child = cp.spawn(tasks.list,["-l"],{cwd: ".."});
child.stdout.on("data",(data)=>{
    console.log(`data :\n ${data}`);
});

child.stderr.on("data",(err)=>{
    console.log(`error occured :\n ${err}`);
});

child.on("error",(err)=>{
    console.log("error occured while creating child process");
});