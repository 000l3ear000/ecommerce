import {useEffect, useState} from 'react'
import  styles from '../../styles/Login.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import cookies from "js-cookies"

export default function Login() {
    const router=useRouter();
    useEffect(()=>{
        const spd=cookies.getItem("jwt")
        if(spd){
            router.push('/');
        }
    },[])

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [errEmail, setEemail] = useState("")
    const [errpassword, setEpassword] = useState("")

    const check = () => {
        if(!email.includes("@")){
            setEemail("Invalid email format!");
            return false
        }
        else if(password.length<8){
            setEemail("")
            setEpassword("Password too short");
            return false
        }
        else{
            return true
        }
    
    }
    const loginUser = async (e) => {
        e.target.disabled=true
        e.target.style.backgroundColor="#ccc";
        e.preventDefault();
        if(check()){
            const userData = await fetch( "http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",                    
                    email,
                    password
                },
                body: JSON.stringify({

                })
            } )
            const checkUserLogin = await userData.json()
            if ( checkUserLogin.error ){
                setEpassword(checkUserLogin.error);
                e.target.disabled=false;
                e.target.style.backgroundColor="orange";
            }
            else{
                console.log(checkUserLogin.message)
                const token = checkUserLogin.token
                cookies.setItem("jwt",token,{ expires: 1});
                cookies.setItem("name",checkUserLogin.name, { expires: 1});
                cookies.setItem("email",checkUserLogin.email, { expires: 1});
                cookies.setItem("id",checkUserLogin.id, { expires: 1});
                cookies.setItem("address",JSON.stringify(checkUserLogin.address), { expires: 1});
                const data = new URLSearchParams(window.location.search)
                if ( data.get("onCart") ){
                    console.log(data)
                    const _re = data.get("onCart")
                    router.push('/cart')
                }
                else if ( data.get("onPayment") ){
                    router.push('/payment')
                }
                else{
                    router.push('/')
                }
            }
        }
        else{
            e.target.disabled=false;
            e.target.style.backgroundColor="orange";
        }
    }
    return (
        
        <div className={styles.container}>
            <Link  href="/"><Image className={styles.img} src="/1.jpg" alt="logo" width='108' height='108'></Image></Link>
            <form className={styles.form}>
                <h1>Login</h1>
                <div className={styles.inputs}>
                    <input type="email" placeholder="Enter your email here" required onChange={(e)=>{setemail(e.target.value)}}></input><span className="email">{errEmail}</span>
                    <input type="password" placeholder="Enter your password" maxLength="12" required onChange={(e)=>{setpassword(e.target.value)}}></input><span className="password">{errpassword}</span>
                </div>
                <button onClick={(e)=>loginUser(e)} value="submit" type='button'>Login</button>
                <div>
                    <Link href="/reset"><a>Forgot password?</a></Link>
                </div>
            </form>
        </div>
    )
}
