import dbConnection from "../../helpers/dbConnection";
import User from "../../models/User";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
dbConnection();

const func = async ( req, res ) => {

    if(req.method === "POST"){
    const { email, password } = req.headers
    try {
        if (!email || !password ){
            return res.status(422).json({ error: "Kindly fill out all the fields" })
        }
        const user = await User.findOne({ email });
        console.log(user)
        if ( user && user?.verified ){
            console.log('OYEEEE CHECK KAR', password,user.password)
            if(await bcrypt.compare(password,user.password)){
                const token = jwt.sign({ email:user.email,name:user.name},process.env.MY_SECRET,{expiresIn:60*60});
                res.status(201).json({ message: "success",token, name: user.name, email, id: user._id, address: user.address })
            }
            else{
                res.status(400).json({ error:"Invalid Credentials" })
            }         
        }
        else if(!user){
            res.status(400).json({ error: "Invalid Credentials" })
        }
        else{
            res.status(400).json({ error: "Email not verified" })
        }

    } catch (error) {
        console.log(error);
    }}
    else{
        res.status(400).json({error:"Invalid method!"})
    }
}

export default func