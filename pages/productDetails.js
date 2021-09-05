import React, { useState, useEffect } from 'react'
import styles from '../styles/ProductDetails.module.css';
import { Zoom } from "react-slideshow-image";

function productDetails() {
    const [ quantity, setquantity ] = useState(1);
    const [ fetchedProduct, setFetchedProduct ] = useState({});
    const [ data, setdata ] = useState([]);
    const [ flag, setflag ] = useState(0);

    

    useEffect(() => {

        const getProduct = async () => {
            const response = await fetch('http://localhost:3000/api/details?product_id='+ product_id);
            const product = await response.json();
            setFetchedProduct(product);
            console.log("This is fetched product >>> ", product.quantity);
        }
        getProduct();
        
    }, [])

    useEffect(() => {

        const oldData = JSON.parse(localStorage.getItem("cartItems"));
        console.log("This is data from local storage >>> ", oldData);
        oldData.filter((e)=> {
            if(e._id == fetchedProduct._id){
                console.log("going inside", e)
                setdata(e)
            } 
        });
    }, [fetchedProduct,flag])

    useEffect(() => {
        console.log("This is data we got from local storage 123 >>>", data)
    }, [data])

    const images = ["https://picsum.photos/210", "https://picsum.photos/201", "https://picsum.photos/220", "https://picsum.photos/202", "https://picsum.photos/230"];
    var product_id = "";
    if(typeof window !=='undefined'){
        product_id = new URLSearchParams(window.location.search);
        product_id=product_id.get("_id");
    }
    const zoomOutProperties = {
        duration: 5000,
        transitionDuration: 500,
        infinite: true,
        indicators: true,
        scale: 1.4,
        arrows: true
      };
      
    const Slideshow = () => {
    return (
        <div className="slide-container">
        <Zoom {...zoomOutProperties}>
            {images.map((each, index) => (
                <img key={index} style={{ width: "100%" }} src={each} />
            ))}
        </Zoom>
        </div>
    );
    };
    

    const cartUpdate = () => {
        setflag(!flag)
        setquantity(1)
        const oldData = JSON.parse(localStorage.getItem("cartItems"));
        oldData.forEach( item => {
            if ( item._id == fetchedProduct._id ){
                item.cartQuantity += quantity;
            }
        })
        localStorage.setItem("cartItems", JSON.stringify(oldData));
    }


    const fun=(e)=>{
        if(e.target.innerHTML==="+"){
            setquantity(quantity+1)
        }
        else{
            setquantity(quantity-1)
        }
        // console.log(e.target.innerHTML)
    }

    const stockQty = fetchedProduct.quantity<20?fetchedProduct.quantity:19
    const check = quantity <= stockQty-data.cartQuantity?false:true

    console.log(data.cartQuantity)

    return (
        <div className={styles.root} >
            <div className={styles.secondary}>
                <div className={styles.slider}>
                    <Slideshow/>
                </div>
            </div>
            <div className={styles.primary}>
                <div className={styles.info}>
                    <h3>{fetchedProduct.name}</h3>
                    <div className={styles.rating}>
                        <span>5 stars</span>
                        <p>2 rating and review</p>
                    </div>
                    <div className={styles.price}>
                        <h1>Rs.{fetchedProduct.price}</h1>
                        <p>40000</p>
                    </div>
                    <div className={styles.ava}>
                        <div className={styles.first}>
                            <span>Availablity</span> <p className="p">In stock</p>
                        </div>
                        <div className={styles.first}>
                        <span>Brand</span> <p className="p">First player</p>
                        </div>
                        <div className={styles.change}>
                            <button className={styles.cn} disabled={quantity<2?true:false} onClick={fun}>-</button>
                                <p className="p">{quantity}</p>    
                            <button className={check?styles.ch:styles.cn} disabled={check} onClick={fun}>+</button>
                        </div>
                        <div>
                            <button disabled={ check } onClick={ ()=>cartUpdate() } className={check?styles.btn2:styles.btn}>{check?"OUT OF STOCK":"ADD TO CART"}</button>
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
    )
}

export default productDetails
