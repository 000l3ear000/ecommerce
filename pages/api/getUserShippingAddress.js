import dbConnection from "../../helpers/dbConnection";
import User from "../../models/User";
dbConnection();

export default async function getUserShippingAddress ( req, res ) {

    if ( req.method === "GET" ){
    console.log(req.headers)
    const { userid } = req.query;
    try {
        console.log("UserId >>> ", userid)
        // add undefined check here
        if(userid){
            const user = await User.findOne({ _id: userid });
            // console.log(user)
            if ( user ){
                console.log("User found >>> ", user)
                    res.status(200).json({ success: "Order inserted", address: user.address })
            }
            else{
                res.status(400).json({ error: "Could not get data" })
            }
        }
        else{
            res.status(400).json({ error: "Could not get userid" })
        }
    } catch (error) {
        console.log(error);
    }}


    else if(req.method === "POST"){
        const { userid } = req.headers
        console.log("Address sent from frontend >>> ", req.body )
        try {
            console.log("UserId >>> ", userid)
            // add undefined check here
            if(userid){
                const user = await User.findOne({ _id: userid });
                // console.log(user)
                if ( user ){
                    console.log("User found >>> ", user)
                    // const final=JSON.stringify(req.body)
                    const resp = await User.findByIdAndUpdate(user._id, {$set: {address: req.body }})
                    console.log("Response got from user address update >>> ", resp);
                    console.log(typeof resp._id,typeof user._id)
                    if(resp.email === user.email){
                        res.status(200).json({ success: "saved"})
                    }
                    else{
                        res.status(400).json({ error: "Something went wrong" })
                    }
                }
                else{
                    res.status(400).json({ error: "Could not get data" })
                }
            }
            else{
                res.status(400).json({ error: "Could not get userid" })
            }
        } catch (error) {
            console.log(error);
        }}

    }
