const mongoClient = require("../connections/mongo_connection").get();


const get_vp_users = async (req,res,next) =>{

    try{
        // console.log(req.body);
        let vp_users = await mongoClient.db.collection('vice_president').find({date:req.body.date}).sort({ time: 1 }).toArray();

        res.send({status:true,users_data:vp_users});


    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
};



module.exports = get_vp_users;