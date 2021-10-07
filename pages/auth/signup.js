import {useState,useEffect} from 'react'
import  styles from '../../styles/Signup.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { baseUrl } from '../../helpers/baseUrl'
import { useRouter } from 'next/router'
import cookies from 'js-cookies'
import jwt from 'jsonwebtoken'
import { CircularProgress, Box } from '@mui/material';


export default function Login() {
    const router = useRouter()
    useEffect(()=>{
        const spd=cookies.getItem("jwt")
        if(spd){
            router.push('/');
        }
    },[])
    
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [repassword, setrepassword] = useState("")
    const [Ename, setEname] = useState("")
    const [Eemail, setEemail] = useState("")
    const [Epassword, setEpassword] = useState("")
    const [Erepassword, setErepassword] = useState("")
    const [flag, setFlag] = useState(0);

    
    const check = () => {
        if(name.length<3){
            setEname("name too short!")
            return false
        }
        else if(!email.includes("@")){
            setEname("");
            setEemail("Invalid email format!");
            return false
        }
        else if(password.length<8){
            setEname("");
            setEemail("")
            setEpassword("Password too short");
            return false
        }
        else if(password!=repassword){
            console.log("here:",password,"and here",repassword)
            setEname("");
            setEemail("")
            setEpassword("")
            setErepassword("Passwords donot match!")
            return false
        }
        else{
            setEname("");
            setEemail("")
            setEpassword("")
            setErepassword("")
            return true
        }
    
    }



    const createUser = async (e) => {
        e.preventDefault();
        if(check()){
            setFlag(1);
            e.target.disabled=true;
            e.target.style.backgroundColor="#ccc";
            const userData = await fetch( "http://localhost:3000/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            } )
            const checkUserCreated = await userData.json()
            if ( checkUserCreated.error ){
                setFlag(0);
                setErepassword(checkUserCreated.error);
                e.target.disabled=false;
                e.target.style.backgroundColor="orange";
            }
            else{
                // setErepassword("Kindly check your email for verification");
                setFlag(1);
                setTimeout(() => {
                    router.push(`/verificationPending?email=${email}&token=${checkUserCreated.token}`)    
                }, 2000);
            }
        }

    }
    return (
        <div className={styles.container}>
           <Link href="/"><Image className={styles.img} src="/1.jpg" alt="logo" width='108' height='108'></Image></Link>
            <form className={styles.form}>
            <h1>Signup</h1>
                <div className={styles.inputs}>
                    <input type="text" placeholder="Enter your name here" onChange={(e)=>setname(e.target.value)}></input><span>{Ename}</span>
                    <input type="email" placeholder="Enter your email here" onChange={(e)=>setemail(e.target.value)}></input><span>{Eemail}</span>
                    <input type="password" placeholder="Enter a password" onChange={(e)=>setpassword(e.target.value)}></input><span>{Epassword}</span>
                    <input type="password" placeholder="Re-enter your password" onChange={(e)=>setrepassword(e.target.value)}></input><span>{Erepassword}</span>
                </div>
                
                {
                    flag ? (
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    ) : <button onClick={(e)=>{createUser(e)}} type='button'>Signup</button>
                }
            </form>
            <Link href="/auth/login"><a><h5>Already have an account?</h5></a></Link>

        </div>
    )
}
