var MongoClient = require('mongodb').MongoClient;
var util= require('util');
var encoder = new util.TextEncoder('utf-8');
var url = ""

function insertOne(){
    MongoClient.connect(url, function(err:any, db:any) {
        if (err) throw err;
        var dbo = db.db("patterns");
        var myobj = { name: "Company Inc", address: "Highway 37" };
        dbo.collection("software").insertOne(myobj, function(err:any, res:any) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
}
function find(){
  let result;
    MongoClient.connect(url, function(err:any, db:any) {
        if (err) throw err;
        var dbo = db.db("patterns");
        dbo.collection("software").find({}).toArray(function(err:any, result:any) {
          if (err) throw err;
          result=result
          console.log(result);
          db.close();
        });
      });
      return result
}

export {insertOne,find}
