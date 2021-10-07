import dbConnection from "../../helpers/dbConnection";
import User from "../../models/User";
import jwt from 'jsonwebtoken'
dbConnection();


export default async function verifyUser ( req, res ) {

    if (req.method === "POST"){
        const { token } = req.headers;
        try {
            jwt.verify(token, process.env.MY_SECRET, async( err, decoded ) => {
                if(err){
                    res.status(401).json({ err })
                }      
                else{
                    const user = await User.findOne({ email: decoded });
                    if ( user ){
                        console.log("THIS IS THE USER OBJECT >>> ", user)
                        const changeVerification = await User.updateOne({ email: decoded } , { $set: { verified: true ,token: null}});
                        if ( changeVerification ){
                            console.log("I WAS VERIFIED OBJECT >>> ", changeVerification);
                            res.status(200).json({ success: 'User Verified' })
                        }
                        else{
                            res.status(400).json({ error: 'Verification failed' })
                        }
                    }
                    else{
                        res.status(400).json({ error: 'Could not find this user' })
                    }
                } 
            }) 
        }
        catch (error) {
            console.log(error)
        }
}}
