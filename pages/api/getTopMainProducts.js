import dbConnection from "../../helpers/dbConnection";
import Product from "../../models/Product";


dbConnection();

async function getTopMainProducts( req, res ) {
    if ( req.method === 'GET' ){

        const getProducts = await Product.find().sort({$natural:1}).limit(5);
    
        if ( getProducts ) {
            console.log(getProducts);
            res.status(200).json( getProducts );
        }
        else{
            res.status(200).json({ error: "not found" })
        }
    }
    else{
        res.status(400).json({ error: "server error" })
    }
}

export default getTopMainProducts
