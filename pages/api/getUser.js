import dbConnection from "../../helpers/dbConnection";
import User from "../../models/User";
dbConnection();

export default async function getUser ( req, res ) {

    if (req.method === "POST"){
    const { email } = req.headers;
    try {
        if(email){
            const user = await User.findOne({ email });
            if ( user ){
                res.status(200).json({ user })
            }
            else{
                res.status(400).json({ error: "Could not find user" })
            }
        }
        else{
            res.status(400).json({ error: "Invalid credentialsInvalid creds" })
        }
    } catch (error) {
        console.log(error);
    }}
    else{
        res.status(400).json({error:"Invalid method!"})
    }
}
