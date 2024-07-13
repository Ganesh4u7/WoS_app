const mongoClient = require("../connections/mongo_connection").get();

const delete_user_in_vp = async (req,res,next) =>{

    try{

        
        let body = req.body;

        await mongoClient.db.collection('vice_president').findOneAndDelete({id:body.id});
        let vp_users = await mongoClient.db.collection('vice_president').find({date:body.date}).sort({ time: 1 }).toArray();

        res.send({status:true,users_data:vp_users});


    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
};



module.exports = delete_user_in_vp;