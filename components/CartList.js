import React, { useEffect, useState } from 'react'
import { Grid, StylesProvider } from '@material-ui/core';
import CartProduct from './CartProduct'
import styles from '../styles/CartList.module.css'
import { set } from 'mongoose';

function CartList({fun}) {
    const [cartItemList, setstate] = useState([]);
    const [change, setchange] = useState(true);
    const [subtotal, setsub] = useState(0);


    useEffect(() => {
        var subt=0;
        setstate(JSON.parse(localStorage.getItem("cartItems")))
        const data=JSON.parse(localStorage.getItem("cartItems"))
        if(data){
            data.forEach(element => {
                subt+=element.price*element.cartQuantity
            });
            setsub(subt)
            fun(subt)
        }

    }, [change])

    
    return (
        <>
        {cartItemList?
            <div className={styles.main}>
                <div className={styles.submain}>
                    { cartItemList.map((item) => (
                        <CartProduct key={item._id} func={setchange} fun={change} item={ item } />
                    )) }
                </div>
                    <h1>SubTotal:-{subtotal}</h1>
            </div>
        :
            <h1>The Cart is Empty!</h1>}

        </>
    )
}

export default CartList
