import React from 'react'
import styles from '../styles/UserShippingAddress.module.css';
import { useRouter } from 'next/dist/client/router';

function UserShippingAddress({subtotal, user, execOrder }) {

    const router = useRouter();

    return (
        <div className={styles.root}>
            <h4>First Name: { user.firstName }</h4>
            <h4>Last Name: { user.lastName }</h4>
            <h4>Email: { user.email }</h4>
            <h4>Address: { user.address }</h4>
            <h4>City: { user.city }</h4>
            <h1>{subtotal}</h1>
            <button onClick={() => router.push('/cart')} >EDIT KARNA ABHI</button>
            <button onClick={(e) => execOrder(e) } >AAGE CHALO</button>
        </div>
    )
}

export default UserShippingAddress
