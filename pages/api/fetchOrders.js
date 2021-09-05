import React from 'react'
import dbConnection from "../../helpers/dbConnection";
import Orders from "../../models/Orders";

dbConnection();

async function fetchOrders(req,res) {
    if (req.method==="GET" && req.headers?.id && req.headers.email){
        const orders = await Orders.find({ userId: req.headers.id })
        if(orders){
            res.status(200).json({success:'Fetched Orders',data:orders})
        }
        else{
            res.status(200).json({err:"No Orders Yet"})
        }
    }
    else{
        console.log("invalid request or its headers")
    }
}

export default fetchOrders
