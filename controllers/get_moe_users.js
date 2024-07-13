const mongoClient = require("../connections/mongo_connection").get();



const get_moe_users = async (req,res,next) =>{

    try{

        let moe_users = await mongoClient.db.collection('mister_of_education').find({date:req.body.date}).sort({ time: 1 }).toArray();

        res.send({status:true,users_data:moe_users});


    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
};



module.exports = get_moe_users;