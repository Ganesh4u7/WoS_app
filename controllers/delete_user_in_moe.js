const mongoClient = require("../connections/mongo_connection").get();

const delete_user_in_moe = async (req,res,next) =>{

    try{

        
        let body = req.body;

        await mongoClient.db.collection('mister_of_education').findOneAndDelete({id:body.id});
        let moe_users = await mongoClient.db.collection('mister_of_education').find({date:body.date}).sort({ time: 1 }).toArray();

        res.send({status:true,users_data:moe_users});


    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
};



module.exports = delete_user_in_moe;