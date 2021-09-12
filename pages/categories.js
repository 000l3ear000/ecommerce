import React from 'react'
import { baseUrl } from '../constants/baseUrl';
import { useState, useEffect } from 'react';
import SingleItem from '../components/SingleItem';
import styles from '../styles/CategoryPage.module.css'

function categories() {

    const [state, setstate] = useState("")
    const [toggle, setToggle] = useState(0);
    const [fetchedCategoryProducts, setFetchedCategoryProducts] = useState([]);
    var data = "";
    useEffect(() => {
        const dataFetch = async () => {
            data = new URLSearchParams(window.location.search);
            if( data.get("category") ){
                setstate(data.get('category'))
                const response = await fetch(`${baseUrl}/api/fetchCategories?name=${data.get('category')}`);
                const products = await response.json();
                if ( products.data ){
                    setFetchedCategoryProducts( products.data );
                    setToggle(1);
                }
                else{
                    console.log("NO FETCHED CATEGORY PRODUCTS FOUND");
                }
            }
        }
        dataFetch();
    }, [])

    useEffect(() => {
        console.log(fetchedCategoryProducts)
        console.log("this is base url >>> ", baseUrl)
    }, [fetchedCategoryProducts])
    // <div className={[styles.secondary, fetchedCategory.length>0?null:toggle3?null:"skeleton"].join(' ')}>

    return (
        <div className={[styles.root].join(' ')}>
            <h1>
                {state.toUpperCase()}
            </h1>
            <div className={fetchedCategoryProducts.length>0?null:toggle?null:"skeleton"}>
                {
                    fetchedCategoryProducts?.map(product => (
                        <SingleItem key={ product._id } item={ product }/>
                    ))
                }
            </div>
        </div>
    )
}

export default categories
