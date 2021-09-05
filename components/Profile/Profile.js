import React from 'react';
import cookies from 'js-cookies';
import { useEffect,useState } from 'react'
import { useRouter } from 'next/dist/client/router';
import styles from '../../styles/Profile.module.css';



export default function Profile() {
  const router=useRouter();
  const [state, setstate] = useState("")
  
  useEffect(() => {
    const data=cookies.getItem("name") 
    setstate(data)
  }, [])

  const handleChange = (event) => {
    if ( event.target.value === 'logout' ) {
      cookies.setItem("jwt", "");
      cookies.setItem("name", "");
      cookies.setItem("email", "");
      cookies.setItem("id", "");
      cookies.setItem("address", "");
      localStorage.clear();
      router.push('/auth/login')
    }
    else if(event.target.value==="myorders"){
      router.push("/myOrders")
    }
    else if(event.target.value==="reset"){
      router.push("/reset_password")
    }
    else{
      console.log('hello')
      router.push('#')
    }
      // router.push(`/${event.target.value}`)
    //   setAge(event.target.value);
  };

  return (
    <div>
        <select className={styles.select} onChange={handleChange}>
          <option>{state}</option>
          <option  value="myorders">My Orders</option>
          <option  value="reset">Reset Password</option>
          <option  value="logout">Logout</option>
        </select>
    </div>
  )}
