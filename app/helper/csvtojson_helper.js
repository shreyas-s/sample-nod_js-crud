//const csvFile = '../../sample_app.csv';
const csv = require('csvtojson');

var importer = {};

importer.importFile =  function (csvFilePath){
  return new Promise((resolve,reject) =>{  
csv()
.fromFile(csvFilePath)
.then((jsonRes)=>{
   resolve(jsonRes);
}).catch((e)=>{
    reject("rejection of import with following info"+e);
});

;
  });
};

//importer.importFile('../../sample_app.csv');

module.exports = {importer};