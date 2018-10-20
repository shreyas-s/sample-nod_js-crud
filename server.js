var {mongoose} = require('./app/db/mongoose_config');
const express = require('express');
var {User} = require('./app/models/user');
const bodyParser = require('body-parser');
const _ = require('lodash');
var {importer} = require('./app/helper/csvtojson_helper');
const bcrypt = require('bcryptjs');
const chalk = require('chalk');

var app = express();
app.use(bodyParser.json());

app.get("/users",(req,resp)=>{
    console.log("inside get all users request");
 User.find().then((users)=>{
     resp.send({users});
 },
 (err)=>{
     resp.status(400).send(e);
 }

);

});

app.post("/user/login",(req,resp)=>{
    var email = req.body.email;
    var pwd = req.body.password;
    console.log(chalk.blue("Inside Login Module"));
    User.findOne({'email': email}).then((user)=>{
        if(!(user)){
            console.log(chalk.red("no user exists with this email"));
            resp.status(400).send("no user exists with this email");
        }
        else{
        bcrypt.compare(pwd,user.password,function(err,matchFlg){
            if(err){
                console.log(chalk.red("Error occured during matching",err));
                resp.status(500).send("Err occured"); 
            }
            if(matchFlg == true){
                console.log(chalk.green("pasword matched success"));
               // resp.header('x-auth',user.tokens[0].token).send(user);
               user.generateTokenForAuthentication().then((token) => 
            {
                resp.header('x-auth',token).send(user);
            });
            }
            else{
                console.log(chalk.red("password does not matches"));
                resp.status(401).send("Password doesnot match for given user");
            }
        });
    }
    });  
});


app.get("/user/:id",(req,resp)=>{
var id = req.params.id;
User.findById(id).then((user)=>{
    if(!(user)){
        resp.status(400).send('No User FOund FOr Id');
    }
    var usrRes = _.pick(user,['email','name','_id']); // to restrict showing pwd
   resp.status(200).send(usrRes);
}).catch((e)=>{
    resp.status(400).send(e);
});

});

app.post('/user',(req,resp)=>{
    console.log("inside post users request");
var emailInp = req.body.email;
var pwd = req.body.password;
var name = req.body.name;
var usr = new User({
    email: emailInp,
    password: pwd,
    name: name
});
/*
usr.save().then((doc)=>{
resp.status(200).send(doc);

},(e)=>{resp.status(400).send(e)});
*/
usr.save().then(()=>{
    return usr.generateTokenForAuthentication();
}).then((token)=>{ resp.header('x-auth',token).send(usr)}).catch((e) => {resp.status(400).send(e); })
});

app.get('/usr/dashboard',(req,resp)=>{
    var token = req.header('x-auth');
    if(token){
    User.findByAuthTokenId(token).then((usr)=>{
        if(!(usr)){
            resp.status(401).send("No Proper token provided");
        }
        console.log("successfully fetched User info for token");
        resp.send(usr);
    }).catch((e) => {
        console.log("error occured in finding by token",e);
        resp.status(401).send("No Proper Token Provided for X-auth");
    });
}
else{
    resp.status(401).send("This resource can be accessed only with proper token headers");
}
});

app.put('/user/:id',(req,resp)=>{
 console.log("inside update users Block");
 // here we try to restrict to update only email & name , not pwd using pick function.
 var userId = req.params.id;
 var body = _.pick(req.body,['email','name']); // so even if pwd is sent in json obj it wont update.
 //var body = req.body;
 User.findByIdAndUpdate(userId,{$set: body},{new: true}).then((user)=>{
     if(!(user)){
         return resp.status(400).send();
     }
     resp.send({user});

 }).catch((e)=>{
     resp.status(400).send(e);
 });

});

app.delete('/user/:id',(req,resp)=>{
 var id = req.params.id;
 User.findByIdAndRemove(id).then((user)=>{
    if(!(user)){
        resp.status(400).send();
    }
    resp.status(200).send(user);

 })
 .catch((err)=>{
     resp.status(400).send(err);
 });
});

 app.delete('/users',(req,resp)=>{
    User.remove({}).then((result)=>{
       if(!(result)){
           resp.status(400).send();
       }
       resp.status(200).send(result);
   
    })
    .catch((err)=>{
        resp.status(400).send(err);
    });
   
 
});

app.post('/upload-users',(req,resp)=>{
    var importFilePath = req.body.import_file_path;
    var importFileType = req.body.import_file_type;
  if(importFileType == 'csv'){
      importer.importFile(importFilePath).then((res)=>{
         // console.log(res);
         res.forEach(userElement => {
            var usr = new User(userElement);
            usr.save();
         });
          resp.status(200).send("succesfully imported users from filepath"+importFilePath);
      }).catch((e)=>{
        resp.status(400).send(e);
      });
  }
  else{
      resp.status(400).send("formats other than csv are not supported for import");
  }
});

app.listen(3000,()=>{
console.log("starting to listen @ 3000");
});