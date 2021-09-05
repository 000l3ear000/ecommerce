import dbConnection from "../../helpers/dbConnection";
import Product from "../../models/Product";

dbConnection();

export default async function handler (req, res) {
  if(req.method === "GET"){
    var value =req.query.name.trim()
    value=value.toLowerCase();
    console.log("value:>hello",value)
    const data = await Product.find()
    if(data){
      console.log("what you get>",data)
      res.status(200).json(data);
    }
    else{
      res.status(200).json([{name:"not found"}]);
    }
  }
  else{
    res.status(200).json({hello:'sdsada'});
  }
}
