import dbConnection from "../../helpers/dbConnection";
import User from "../../models/User";
import Rating from "../../models/Rating";
dbConnection();

export default async function addComment ( req, res ) {

    if (req.method === "POST") {
    
        console.log(req.headers)
        // const { userid } = req.headers;
        const ratingCount = {
            0: 0,
            1: 1,
            2: 2,
            3: 3,
            4: 4,
            5: 5
        };
        const { order_id, product_id, product_rating, user_id, comment } = req.headers;

        try {
            console.log("UserId >>> ", user_id)
            // add undefined check here
            if(user_id){
                const user = await User.findOne({ _id: user_id });
                if ( user ){
                    console.log("User found >>> ", user)
                    if ( product_id ) {
                        const resp = await Rating.findOne({ productId: product_id });
                        console.log("Response >>> ", resp)
                        if ( resp._id ) {
                            resp.comments.forEach( commentObj => {
                                ratingCount[commentObj.rating]++;
                            } )

                            // rating algo here
                            var newRating = 0;
                            var ratingValue = 0;
                            var total = 0;
                            Object.keys(ratingCount).forEach( key => {
                                ratingValue += parseInt(key) * parseInt(ratingCount[key]);
                                total += parseInt(ratingCount[key]);
                            } )

                            newRating = Math.floor( ratingValue / total );

                            const newCommentsArray = resp.comments;
                            var _temp = {};
                            _temp[order_id] = {

                                user_id,
                                rating: product_rating,
                                comment,
                            }
                            newCommentsArray.push(_temp);

                            const setRating = await Rating.findByIdAndUpdate(product_id, {$set: {comments: newCommentsArray, rating: newRating }});
                            if ( setRating._id ) {
                                res.status(200).json({ success: "Rating added and updated", _id: setRating._id })
                            }
                        } else res.status(400).json({ error: "Could not find this product in rating" })
                    } else res.status(400).json({ error: "Could not find this product" }) 
                } else res.status(400).json({ error: "Could not find this user" })
            } else res.status(400).json({ error: "Could not get user id from headers" })
        } catch (error) {
            console.log(error);
        }}
    else res.status(400).json({error:"Invalid method!"})
}
