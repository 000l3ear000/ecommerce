import dbConnection from "../../helpers/dbConnection";
import User from "../../models/User";
import Orders from "../../models/Orders";
dbConnection();

export default async function addOrder ( req, res ) {

    if (req.method === "POST"){
    console.log(req.headers)
    const { userid } = req.headers;
    try {
        console.log("UserId >>> ", userid)
        // add undefined check here
        if(userid){
            const user = await User.findOne({ _id: userid });
            // console.log(user)
            if ( user ){
                console.log("User found >>> ", user)
                const resp = await Orders.create({ userId: userid, orders: req.body });
                console.log("Response >>> ", resp)
                if ( resp?._id ){
                    res.status(200).json({ success: "Order inserted",_id: resp._id })
                }
                else{
                    res.status(400).json({ error: "Could not insert" })
                }
            }
            else{
                res.status(400).json({ error: "Invalid Credentials" })
            }
        }
    } catch (error) {
        console.log(error);
    }}
    else{
        res.status(400).json({error:"Invalid method!"})
    }
}
