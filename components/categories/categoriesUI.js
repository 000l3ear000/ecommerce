import styles from '../../styles/Categories.module.css'
import { useState,useEffect } from 'react';
import { baseUrl } from '../../constants/baseUrl';
import Percategory from './Percategory';

const CategoriesUI = () => {

    const [categories, setCategories] = useState([])


    useEffect(() => {
        const fetchDbCategories = async () => {

            const response = await fetch(`${baseUrl}/api/getAllCategories`);
           
            const fetchedCategories = await response.json()
            if ( fetchedCategories.data ){
                setCategories( fetchedCategories.data );
            }
            else{
                console.log("NO CATEGORIES FETCHED")
            }

        };
        fetchDbCategories();
    }, []);

    useEffect(() => {
        console.log("ALL CATEGORIES FETCHED!!",categories)
    }, [categories])

    // fetch req to get categories from db
    
    

    return (
        <>
        <h1 style={{margin:"0px",padding:"0px"}}>Categories</h1>
        <div className={[styles.wrapper,!categories.length>0?"skeleton":null].join(" ")}>
            { 
            categories.length>0?categories.map((item) =>(
                <Percategory key={item._id} text={ item.name } />
            )):<h1 style={{lineHeight: "490px"}}>Loading...</h1>
            }
        </div>
        </>
    )
}

export default CategoriesUI


