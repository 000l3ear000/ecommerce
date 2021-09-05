import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import cookies from 'js-cookies'

function payment() {
    const router=useRouter()
    const [state, setstate] = useState("")
    useEffect(() => {
        const arr=[]
        const data=JSON.parse(localStorage.getItem("cartItems"))
        if(data){
            data.forEach(element => {
                arr.push({id:element._id,qty:element.cartQuantity})
            });
        }
        else{
            router.push('/cart')
        }
        console.log("This is the final order list",arr)
        setstate(arr);
    }, [])
    
    const placeOrder = async() => {
        const res = await fetch("http://localhost:3000/api/fetchPaymentProducts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",                    
                        "userId": userId,
                        "jwt": cookies.getItem("jwt")
                    },
                    body: JSON.stringify(state)
                })
                //const checkOrderInsertion = await res.json();
    }
                

    return (
        <div style={{height:"100vh"}}>
            hello payen paisay deyo athay :)
        </div>
    )
}

export default payment
