import dbConnection from "../../helpers/dbConnection";
import User from "../../models/User";
import jwt from 'jsonwebtoken';
import Product from "../../models/Product";
import Orders from "../../models/Orders";

dbConnection();

export default async function fetchPaymentProduct ( req, res ) {

    if (req.method === "POST"){
    console.log(req.headers)
    const { userid } = req.headers;
    const { _jwt } = req.headers;
    const paymentProducts = req.body;
    console.log("Payment Products >>> ", paymentProducts)
    var dbProducts = []
    var flag = 0
    var validToken = ""
    
    try {
        flag = 0;
        console.log("UserId >>> ", req.headers)
        // add undefined check here
        if( userid && ( _jwt != null )){
            const user = await User.findOne({ _id: userid });
            jwt.verify(_jwt, process.env.MY_SECRET, ( err, decoded ) => {
                if(err){
                    res.status(401).json({err})
                }      
                else if(decoded){
                    validToken = decoded
                    flag = 1
                    console.log("User found in fetchPaymentProducts >>> ", user.email)
                    console.log("User found in fetchPaymentProducts >>> ", flag)
                    console.log("User found in fetchPaymentProducts >>> ", validToken.email)
                } 
            })

            if ( flag && user.email === validToken.email ){
                console.log("User found in fetchPaymentProducts >>> ", user)
                
                // paymentProducts.forEach( async product => {
                for ( const product of paymentProducts ){
                    const dbProduct = await Product.find({ _id: product.id });
                    const pushObj = dbProduct[0]._doc;
                    pushObj["cartQuantity"] = product.qty;

                    console.log("Fetched the product from db >>> ", pushObj)
                    
                    // pushed the db fetched products to this array
                    dbProducts.push( pushObj );
                    console.log("Fetched the product from db >>> ", dbProducts);
                   
                }
                console.log("THESE ARE THE PRODUCTS FETCHED FROM DB ", dbProducts);             // modify the product object to be inserted into Orders table
                const resp = await Orders.create({ userId: userid, orders: dbProducts });
                console.log("THESE ARE THE PRODUCTS FETCHED FROM DB ", dbProducts);             // modify the product object to be inserted into Orders table
                if ( resp?._id ){
                    res.status(200).json({ success: "Order inserted", order: resp, user })
                }
                else{
                    res.status(400).json({ error: "Could not insert" })
                }
            }
            else{
                res.status(400).json({ error: "Validation failed" })
            }
        }
    } catch (error) {
        console.log(error);
    }}
    else{
        res.status(400).json({error:"Invalid method!"})
    }
}
