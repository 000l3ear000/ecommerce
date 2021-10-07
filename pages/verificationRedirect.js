import React from 'react';
import { baseUrl } from '../constants/baseUrl';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
function verificationRedirect() {

    const [userVerified, setUserVerified] = useState(false);
    const [verifyJwt, setVerifyJwt] = useState(false);
    const [jwt, setJwt] = useState('');
    const [response, setResponse] = useState("");
    const router = useRouter()

    // getting the token
    var data = "";
    useEffect(() => {

        const dataFetch = async () => {
            data = new URLSearchParams(window.location.search);
            if(data){
                setJwt(data.get('token'))
            }
        }
        dataFetch();

    }, [])


    // verifying the token
    useEffect(() => {

        const verifyUserEmail = async () => {

            if ( jwt ){
                const response = await fetch(`${baseUrl}/api/verifyUser`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",                    
                        "token": jwt
                    },
                });
                const changeUserVerificationState = await response.json();
                if ( changeUserVerificationState.success ){
                    setUserVerified(true);
                    setVerifyJwt(true);
                    setResponse("Email Verified Please Login")
                    setTimeout(()=>{
                        router.push('/auth/login')
                    }, 2000)
                }
                else{
                    setResponse("Sorry Verification Not-Valid")
                }
            }
            else{
                console.log("INVALID TOKEN");
            }
        }

        verifyUserEmail();

    }, [jwt])

    return (
        <div>
            {
                verifyJwt ? <h1>{ response }</h1> : 'Loading...'
            }
        </div>
    )
}

export default verificationRedirect;
