import React from 'react'
import styles from '../styles/OrderedProducts.module.css'

function OrderedProducts({ product }) {
    return (
        <div className={styles.root}>
            <div className={styles.img}>
                <img src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdfestore.com%2Fwp-content%2Fuploads%2F2020%2F10%2F10348-1.jpg&f=1&nofb=1'></img>
            </div>
            <div className={styles.details}>
                <h3>Name:- { product.name }</h3>
                <p>Price:- { product.price }</p>
                <div className={styles.end}>
                    <span>Qty. { product.cartQuantity }</span>
                    <p>Total:- { product.cartQuantity * product.price }</p>
                </div>
            </div>
        </div>
    )
}

export default OrderedProducts
