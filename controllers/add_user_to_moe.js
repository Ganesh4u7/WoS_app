const mongoClient = require("../connections/mongo_connection").get();
const { v4: uuidv4 } = require("uuid");


const add_user_to_moe = async (req,res,next) =>{

    try{
        
        let body = req.body;

        let user_details = {
            id:uuidv4(),
            name:body.name,
            time:body.time,
            date:body.date,
            hours:body.hours,
            added_by:body.added_by,
            added_at:Date.now()
        };

       
        await mongoClient.db.collection('mister_of_education').insertOne({...user_details});
        let moe_users = await mongoClient.db.collection('mister_of_education').find({date:body.date}).sort({ time: 1 }).toArray();

        res.send({status:true,users_data:moe_users});


    }
    catch(error){
        console.log(error);
        res.send({status:false,payload:"Error occurred"});
    }
};



module.exports = add_user_to_moe;