import React from 'react'
import styles from '../styles/OrderT.module.css'

function OrderTemp({ data }) {
    return (
        <div onClick={() => console.log('THIS IS THE ORDER DATA: ', data)} className={styles.root}>
            <p>{data._id}</p>
            <p>{data.userId}</p>
            <p>{data.status}</p>
            <div>hehehe</div>
        </div>
    )
}

export default OrderTemp
