import React, { useState, useEffect } from 'react';
import SingleItem from '../SingleItem';
import styles from '../../styles/Home.module.css'

export default function Items() {

    const [ topProducts, setTopProducts ] = useState([]);
    
    useEffect(() => {

        const getTopProducts = async () => {
            const response = await fetch('http://localhost:3000/api/getTopMainProducts');
            setTopProducts(await response.json())
            
        }
        getTopProducts();

    }, [])

    return (
        <>
        <div className={styles.heading}>
            <h1>For You</h1>
            <div className={styles.single}>
                { topProducts && topProducts.map( item => (
                    <SingleItem item={item} key={item._id}/>
                ))}
            </div>
        </div>
        </>
    )
}
