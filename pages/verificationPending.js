import React from 'react'
import { baseUrl } from '../constants/baseUrl';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
    

function verificationPending(){
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState('');
    const [token, setToken] = useState('');


    useEffect(() => {
        const dataFetch = async () => {
            const data = new URLSearchParams(window.location.search);
            if(data){
                setEmail(data.get('email'))
                setToken(data.get('token'))
            }
        }
        dataFetch();
    }, [])

    useEffect(() => {
        console.log(email)

        if(email){
            const userExist=async()=>
            {
                const res = await fetch(`${baseUrl}/api/getUser`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json',
                        email
                    }
                });
                const { user } = await res.json()
                console.log(user)

                if(user && user.token){
                    const response = await fetch(`${baseUrl}/api/emailVerification`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",                    
                            "email": email,
                            "token":token,
                            "action": 'signup confirm',
                        },
                    });
                    
                    const checkEmail = await response.json();
                    if ( checkEmail.err === "hello" ){
                        setEmailSent("Please Check Your Email and verify with the link")
                        setTimeout(()=>{
                            router.push('/auth/login')
                        },5000)
        
                    }
                    else{
                        setEmailSent("Could Not Send Email",checkEmail.err)
                    }
                    
                }
                else if(user && !user.token){
                    setEmailSent("Already Verified")
                    setTimeout(()=>{
                        router.push('/auth/login')
                    },2000)
                }
                else{
                    setEmailSent("Please Signup First")
                    setTimeout(()=>{
                        router.push('/auth/signup')
                    },2000)
                }
            }
            userExist()
            }
}, [token])

    return(
        <div>
            <h1>
                {!emailSent?"Please Wait...":emailSent}
            </h1>
        </div>
    )

}

export default verificationPending;