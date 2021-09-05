import dbConnection from "../../helpers/dbConnection";
import Product from "../../models/Product";


dbConnection();

async function searchFinal( req, res ) {
    if ( req.method === 'GET' ){
        // const data = await inventory.find({$or:[{name: new RegExp('^'+value)}, {category:new RegExp('^'+value)}, {subCategory:new RegExp('^'+value)}]});
        const productName = req.query.pro.toLowerCase();

        if ( req.query.filters ){
            console.log("WE GET THE FILTERS HERE >>> ", req.query.filters)
            const filters = JSON.parse(req.query.filters)
            
            
            const filterArray = []
            const nameObj = {name: {$regex: productName}}
            filterArray.push(nameObj);

            Object.keys(filters).forEach(item => {
                console.log("Item")
                if ( filters[item].length > 0 ){
                    if( item.toLowerCase() === 'price range' ){
                        if ( filters[item].length > 0 ){
                            const obj = {};
                            obj["price"] = { $gt: parseInt(filters[item][0]), $lt: parseInt(filters[item][1]) } ;
                            filterArray.push(obj);        
                        } 
                    }
                    else{
                        const object = {}
                        object[item.toLowerCase()] = filters[item];
                        filterArray.push(object);
                    }
                }
            })
            console.log("FILTERS ARRAY >>>>> ", filterArray);
    //CHANGE HERE!


            if( filterArray.length > 0 ){
                const getProducts =  await Product.find({$and: filterArray });
                if ( getProducts ) {
                    console.log("THESE ARE FILTERED PRODUCTS >>>>", getProducts);
                    res.status(200).json( getProducts );
                }
                else{
                    res.status(200).json({ error: "not found" })
                }
            }
            else{
                // new RegExp('^'+productName+'$')
                const getProducts =  await Product.find({$or:[{name: {$regex: productName}}, {category: productName}]});
                if ( getProducts ) {
                    console.log("THESE ARE NOT WITgetProducts");
                    res.status(200).json( getProducts );
                }
                else{
                    res.status(200).json({ error: "not found" })
                }    
            }

            
        }
        else{
            
            const getProducts =  await Product.find({$or:[{name: {$regex: productName}}, {category:productName}]});
            if ( getProducts ) {
                console.log(getProducts);
                res.status(200).json( getProducts );
            }
            else{
                res.status(200).json({ error: "not found" })
            }
        }
    }
    else{
        res.status(400).json({ error: "server error" })
    }
}

export default searchFinal
