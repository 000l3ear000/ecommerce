import dbConnection from "../../helpers/dbConnection";
import Rating from "../../models/Rating";
dbConnection();

export default async function fetchRating ( req, res ) {

    if( req.method === 'GET' && req.headers.id ){
        const data = await Rating.find({ productId: req.headers.id });
        if ( data ){
        
            res.status(200).json({ success:data })
            console.log("BHAI THIS IS THE RATING PRODUCT >>> ", data);
        }
        else{
            res.status(400).json({ error: "No data" })
        }

    }
}

