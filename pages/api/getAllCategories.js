import dbConnection from "../../helpers/dbConnection";
import Category from '../../models/Category'
dbConnection();


export default async function getAllCategories(req,res) {
    if(req.method === "GET"){
        console.log(" I WeNT INTO HERE")
        const data = await Category.find();
        if(data){
            res.status(200).json({ data })
        }
        else{
            res.status(401).json({err:"No data"});
        }
    }
};

