import React from 'react'
import jwt from 'jsonwebtoken'
async function emailVerification(req,res) {
    let nodemailer=require('nodemailer')
    if(req.method==='POST'){
        const { email, token, action }= req.headers
        var mailData = {};
        if(email && token){
            
            const transporter = nodemailer.createTransport({
                port: 465,
                host: "smtp.gmail.com",
                auth: {
                  user: "asimaffan463@gmail.com ",
                  pass: "bmw600bmw600",
                },
                secure: true,
              })
            if ( action === 'signup confirm' ) {

                mailData = {
                    from: 'asimaffan463@gmail.com',
                    to: email,
                    subject: `Message From Saad`,
                    text: "Hola brother",
                    html: `<div><a href='http://localhost:3000/verificationRedirect?token=${token}'>click this link to verify your email</a></div>`
                }
            } 
            else if ( action === 'order confirm' ) {
                mailData = {
                    from: 'asimaffan463@gmail.com',
                    to: email,
                    subject: `Message From Saad`,
                    text: "Hola brother",
                    html: `<div>Your order is confirmed baby<br /><a href='http://localhost:3000/myOrders'>TRACK YOUR ORDER HERE</a></div>`
                }
            }
            else if ( action === 'test' ) {
                mailData = {
                    from: 'asimaffan463@gmail.com',
                    to: "ksaad608@gmail.com",
                    subject: `Message for Saad`,
                    text: "Hola brother",
                    html: `<div>Your order is confirmed baby<br />
                            <a href='http://localhost:3000/myOrders'>TRACK YOUR ORDER HERE</a>
                        <input type="text" placeholder="Input one"></input>
                        <input type="text" placeholder="Input one"></input>
                        <button>Submit</button>
                    </div>`
                }
            }
        transporter.sendMail(mailData, function (err, info) {
            if(err)
             {   console.log(err)
                res.send({err})}
            else
{                console.log(info)
                res.send({err:'hello'})}
            })
        }
    }
}

export default emailVerification
