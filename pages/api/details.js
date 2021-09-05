import dbConnection from "../../helpers/dbConnection";
import Product from "../../models/Product";


dbConnection();

async function details( req, res ) {
    if ( req.method === 'GET' ){

        const productId = req.query.product_id;
        const getProduct = await Product.findOne({ "_id": productId });
    
        if ( getProduct ) {
            console.log(getProduct);
            res.status(200).json( getProduct );
        }
        else{
            res.status(200).json({ error: "not found" })
        }
    }
    else{
        res.status(400).json({ error: "server error" })
    }
}

export default details
