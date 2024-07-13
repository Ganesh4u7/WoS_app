let jwt = require("jsonwebtoken");
const { xtoken } = require("../config");

const mongoClient = require('../connections/mongo_connection').get();

const authenticate = async (req, res, next) => {

  try {
    let email_check = req.headers.email_check ? req.headers.email_check :  req.body.email_check;
    let username_from_req = req.headers.username ? req.headers.username :  req.body.username;
    
    let token_from_req = req.headers.token ? req.headers.token : req.body.token;
    // let token = req.headers.xtoken ? req.headers.xtoken : false;

    if(token_from_req){
      // console.log(token_from_req);
      jwt.verify(token_from_req, xtoken, function(err, decoded) {
        // console.log(decoded);
        if (err) res.send("Auth Failed");
       
        else if(decoded.username.toLowerCase() === username_from_req.toLowerCase()){
                 var exp = decoded.exp;
                if (Date.now() >= exp * 1000) {
                  //  console.log('Expired token');
                  res.send("Token Expired");
                  return;
                } else {
                  console.log("Token valid..");
                  next();
                  return;
                }
            }
        else {
          res.send("Token Invalid");
          return;
        }
      });
    }
  } catch (e) {
    console.log(e);
    // console.log('CATCH');
    res.send(e);
    return;
  }
};

module.exports = authenticate;