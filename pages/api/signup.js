import dbConnection from "../../helpers/dbConnection";
import User from "../../models/User";
import bcrypt from 'bcrypt'

dbConnection();


const func = async ( req, res ) => {

    const { name, email, password } = req.body
    try {
        if ( !name || !email || !password ){
            return res.status(422).json({ error: "Kindly fill out all the fields" })
        }
        const user = await User.findOne({ email });
        if ( user ){
            return res.status(422).json({ error: "User with this email already exists" })
        }
        const hashedPassword = await bcrypt.hash( password, 12 )
        const newUser = await new User({
            name,
            email,
            password: hashedPassword
        }).save()
        console.log(newUser);
        res.status(201).json({ message: "user created successfully" })

    } catch (error) {
        console.log(error);
    }

}

export default func