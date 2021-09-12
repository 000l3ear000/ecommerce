import dbConnection from "../../helpers/dbConnection";
import Product from "../../models/Product";


dbConnection();

async function fetchCategories( req, res ) {
    if ( req.method === 'GET' ){

        const { name } = req.query? req.query : null;

        const products = await Product.find({ category: req.query.name })
        // const categories = await Category.find();
    
        if ( products ) {
            console.log(products);
            res.status(200).json({ data: products });
        }
        else{
            res.status(200).json({ error: "not found" })
        }
    }
    else{
        res.status(400).json({ error: "server error" })
    }
}

export default fetchCategories
