import React from 'react';
import cookies from 'js-cookies';
import { useEffect,useState } from 'react'
import { useRouter } from 'next/dist/client/router';
import styles from '../../styles/Profile.module.css';



export default function Profile() {
  const router=useRouter();
  const [state, setstate] = useState("")
  const [selected, setselected] = useState("default")

  
  useEffect(() => {
    const data=cookies.getItem("name") 
    setstate(data)
    const fd=window.location.pathname
    if(fd==="/myOrders"){
      console.log("ITS ORDER TIME")
      setselected("myorders")
    }
    else if(fd==="/"){
      setselected("default")
      location.reload
    }

  }, [])

  useEffect(() => {
    console.log(selected)
  }, [selected])

  const handleChange = (event) => {
    if ( event.target.value === 'logout' ) {
      if(typeof window!='undefined'){
        cookies.setItem("jwt", "");
        cookies.setItem("name", "");
        cookies.setItem("email", "");
        cookies.setItem("id", "");
        cookies.setItem("address", "");
        localStorage.clear();
        router.push('/auth/login')
      }
    }
    else if(event.target.value==="myorders"){
      setselected("myorders")
      router.push("/myOrders")
    }
    else if(event.target.value==="reset"){
      router.push("/reset_password")
    }
    else{
      console.log('hello')
      setselected("default")
      router.push('/')
    }
      // router.push(`/${event.target.value}`)
    //   setAge(event.target.value);
  };

  return (
    <div>
        <select value={selected} className={styles.select} onChange={handleChange}>
          <option  value="default">{state}</option>
          <option  value="myorders">My Orders</option>
          <option  value="reset">Reset Password</option>
          <option  value="logout">Logout</option>
        </select>
    </div>
  )}
