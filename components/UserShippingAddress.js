import React from 'react'
import styles from '../styles/UserShippingAddress.module.css';
import { useRouter } from 'next/dist/client/router';

function UserShippingAddress({subtotal, user, execOrder }) {

    const router = useRouter();

    return (
        <div className={styles.root}>
            <h2 style={{border:'1px solid white',textAlign:'center',padding:'5px'}}>Shipping Details</h2>
            <h4 className={styles.hello}>First Name: { user.firstName }</h4>
            <h4 className={styles.hello}>Last Name: { user.lastName }</h4>
            <h4 className={styles.hello}>Email: { user.email }</h4>
            <h4 className={styles.hello}>Address: { user.address }</h4>
            <h4 className={styles.hello}> City: { user.city }</h4>
            <h1 style={{textAlign:'center'}}>Total:- {subtotal}</h1>
            <button style={{height:'40px'}} onClick={() => router.push('/cart')} >Edit Info</button>
            
        </div>
    )
}

export default UserShippingAddress
