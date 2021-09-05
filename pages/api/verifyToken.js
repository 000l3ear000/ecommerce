import jwt from 'jsonwebtoken';

export default async function verifyToken(req, res) {

    if( req.method==="POST" ){

        const { token } = req.headers
        // console.log(req.headers.cookie1)
        jwt.verify(token, process.env.MY_SECRET, ( err, decoded ) => {

            if(err){
                res.status(401).json({err})
            }      
            else{
                res.status(200).json({decoded})
            } 
        })
        }
    }


