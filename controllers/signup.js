// const mongoClient = require("../connections/mongo_connection").get();
// const crypto = require('crypto');
// const nodemailer = require('nodemailer');
// const {auth,key} = require('../config');

// let algorithm = 'aes-256-cbc'; // or any other algorithm supported by OpenSSL


// const ivstring = crypto.randomBytes(16); 
// let iv = ivstring.toString('hex').slice(0, 16); 

// const user_signup = async (req,res,next) =>{

//     try{
//         // console.log('came here');
        
//         let body = req.body;
//         let cipher,encrypted;

//         if(body.provider == "CUSTOM"){
//             let pwd = req.body.password;
//             cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
//             encrypted = cipher.update(pwd);
//             encrypted = Buffer.concat([encrypted, cipher.final()]);
//         }


//         let user_details = {
//             username:body.username,
//             email:body.email,
//             password:encrypted?encrypted.toString('hex'):'',
//             init_vector:iv?iv.toString('hex'):'',
//             isVerified:false,
//             verification_code:'',
//             name:'',
//             designition:'',
//             about_me:'',
//             city:'',
//             country:'',
//             phone:'',
//             website:'',
//             instagram:'',
//             whatsapp:'',
//             facebook:'',
//             twitter:'',
//             youtube:'',
//             image_url:'https://firebasestorage.googleapis.com/v0/b/beyondtap-530cf.appspot.com/o/photos%2Fuser.jpg?alt=media&token=fec8bd22-6827-4a63-9666-2b449a376caa',
//             taps:0,
//             contact_saves:0,
//             social_media_handles:[
//             {name:"instagram",icon:'fab fa-instagram',color:'#8a3ab9',link:'',username:'',display:false},
//             {name:"whatsapp",icon:"fab fa-whatsapp",color:"#25D366",link:'',username:'',display:false},
//             {name:'twitter',icon:'fa-solid fa-globe',color:"#1DA1F2",link:'',username:'',display:false},
//             {name:'facebook',icon:"fab fa-facebook",color:"#4267B2",link:'',username:'',display:false},
//             {name:'linkedin',icon:"fab fa-linkedin",color:"#0072b1",link:'',username:'',display:false},
//             {name:'youtube',icon:"fab fa-youtube",color:"#c4302b",link:'',username:'',display:false}
//         ]
//         };

       

//         let otp = Math.floor(100000 + Math.random() * 900000);
//         await mongoClient.db.collection('user_details').insertOne({...user_details,otp:otp});
//        // await mongoClient.db.collection('user_details').updateOne({email},{$set:{otp:otp}});

//         let transporter = nodemailer.createTransport({
//             host: "smtpout.secureserver.net",  
//             secure: true,
//             secureConnection: false, // TLS requires secureConnection to be false
//             tls: {
//                 ciphers:'SSLv3'
//             },
//             requireTLS:true,
//             port: 465,
//             debug: true,
//             auth: auth
//           });
//           let mailOptions = {
//             from: 'info@beyondtap.in',
//             to: body.email,
//             subject: 'Account Verification Token',
//             text: 'Hello,\n\n' + 'Your otp is ' + `${otp}`
//           };

//         transporter.sendMail(mailOptions, function (err1, data1) {
//         if (err1) {
//             console.log(err1)
//         }
//         else {
//             // console.log('Email sent !!');
//             res.send({status: true,user_data:user_details,payload:" Signup Completed and Confirmation mail sent."});
//         }
//         });

//         res.send({status:true,user_data:user_details,payload:"User Signup completed"});


//     }
//     catch(error){
//         console.log(error);
//         res.send({status:false,payload:"Error occurred"});
//     }
// };



// module.exports = user_signup;