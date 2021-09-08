import styles from '../styles/SearchResult.module.css'
import React, {useState,useEffect} from 'react'
import SingleItem from '../components/SingleItem';
import Filter from '../components/Filter';
import { set } from 'mongoose';

function searchResult() {

    const [params, setparams] = useState([]);
    const [fetchedProducts, setFetchedProducts] = useState([]);
    const [fetchedCategory, setFetchedCategory] = useState([]);
    const [filters, setFilters] = useState("{}");
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [priceRange, setPriceRange] = useState('TopRated');
    const [sorted, setSorted] = useState([]);  
    const [toggle, settoggle] = useState(0);  
    const [toggle2, settoggle2] = useState(0);  
      

    var data1 = {};
    var data = "";

    const getFilters = ( name, productFilters ) => {
        data1 = JSON.parse(filters)
        data1[name] = productFilters
        console.log(data1)
        setFilters(JSON.stringify(data1));
    }

    // //////////////////////////////////
    
    useEffect(() => {
        const dataFetch = async () => {
            data = new URLSearchParams(window.location.search);
            if(data){
                console.log(data.get('pro'))
                const response = await fetch(`http://localhost:3000/api/searchFinal?pro=${data.get('pro')}`);
                const products = await response.json();
                console.log("Fetched Products PRICE ON FIRST TIME : ");
                setFetchedProducts(products);
                setFetchedCategory(products); 
            }
        }
        dataFetch();
    }, [])
    
    useEffect(() => {
        getCategories();
        getBrands();
    }, [fetchedCategory])

    useEffect(() => {
        data = new URLSearchParams(window.location.search);
        const fetchFilteredProducts = async () => {
            console.log("THESE ARE THE FILTERS BEING SENT >>> ", filters)
            const response = await fetch(`http://localhost:3000/api/searchFinal?pro=${data.get('pro')}&filters=${filters}`);
            const products = await response.json();
            settoggle2(1)
            setFetchedProducts(products);
        }
        fetchFilteredProducts();
    }, [filters])

    //
    useEffect(() => {
        setFetchedProducts(sorted)
        // sortByPriceRange()
    }, [toggle])

    useEffect(() => {
        //copying fetched products coming from api
        setSorted(fetchedProducts)
    }, [fetchedProducts])

    useEffect(() => {
        if(toggle2){
            sortByPriceRange();
            settoggle2(0)
        }
    }, [sorted])

    //works when the selector is selected
    useEffect(() => {
        sortByPriceRange();
        //setting sorted array in desired way and the append data to fetchedProducts toggle->setfetchedproducts(sorted)
    }, [priceRange])

    
    const sortByPriceRange = async () => {
        if ( priceRange === 'lowtohigh' ){
            sorted.sort(( min, max ) => {
                return min.price - max.price
            })
            console.log("IM PRICE RANGE MAD",priceRange)
        }
        else if ( priceRange === 'hightolow' ){
            sorted.sort(( min, max ) => {
                return max.price - min.price
            })
            console.log("IM PRICE RANGE MAD",priceRange)
        }
        else if( priceRange === 'TopRated' ){
            // console.log("IM PRICE RANGE MAD",priceRange)
            sorted.sort(( min, max ) => {
                return max.rating - min.rating
            })
            
        }
        settoggle(!toggle)
        console.log("SORTED BY PRICE PRODUCTS >>> ", fetchedProducts);
    }

    const getCategories = () => {
        const productsCategories = {};
        fetchedCategory.forEach( product => {
            productsCategories[product.category]? productsCategories[product.category] += 1 : productsCategories[product.category] = 1
        } );
        setCategories(Object.keys(productsCategories));
    }

    const getBrands = () => {
        const productsBrands = {};
        fetchedCategory.forEach( product => {
            productsBrands[product.manufacturer]? productsBrands[product.manufacturer] += 1 : productsBrands[product.manufacturer] = 1
        } );
        
        setBrands(Object.keys(productsBrands));
    }
    return (
        <div className={styles.root}>
            <div className={[styles.secondary, fetchedCategory.length>0?null:"skeleton"].join(' ')}>
                { fetchedProducts.length>0? <Filter passPriceRange={setPriceRange} passFilters={getFilters} passBrands={brands} passCategories={categories}/> : null  }
                {/* <Filter passFilters={getFilters} passCategories={categories}/> */}
            </div>
            <div className={[styles.primary, fetchedProducts.length>0?null:"skeleton"].join(' ')}>
                {fetchedProducts.length>0? fetchedProducts.map((product) => (
                        <SingleItem key={ product._id } item={ product } />
                    )):null }
            </div>
        </div>
    )
}

export default searchResult
