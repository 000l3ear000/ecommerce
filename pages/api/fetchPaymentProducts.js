import dbConnection from "../../helpers/dbConnection";
import User from "../../models/User";
import jwt from 'jsonwebtoken';
import Orders from "../../models/Product";
dbConnection();

export default async function fetchPaymentProduct ( req, res ) {

    if (req.method === "POST"){
    console.log(req.headers)
    const { userid } = req.headers;
    const { jwt } = req.headers;
    const paymentProducts = req.body;
    const dbProducts = []

    try {
        console.log("UserId >>> ", userid)
        // add undefined check here
        if( userid && ( jwt != null )){
            const user = await User.findOne({ _id: userid });
            jwt.verify(jwt, process.env.MY_SECRET, ( err, decoded ) => {

                if(err){
                    res.status(401).json({err})
                }      
                else{
                    res.status(200).json({decoded})
                } 
            })

            if ( user.email == validToken.decoded?.email ){
                console.log("User found in fetchPaymentProducts >>> ", user)
                paymentPoducts.forEach( async product => {

                    const resp = await Product.find({ _id: product.id });
                    console.log("Fetched the product from db >>> ", resp)
                    resp["cartQuantity"] = product.cartQuantity;

                    // pushed the db fetched products to this array
                    dbProducts.push( resp );

                })
                // modify the product object to be inserted into Orders table
                const resp = await Orders.create({ userId: userid, orders: dbProducts });
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
