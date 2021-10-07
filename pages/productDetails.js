import React, { useState, useEffect } from 'react'
import styles from '../styles/ProductDetails.module.css';
import { Zoom } from "react-slideshow-image";
import { useStore, useStoreActions } from 'easy-peasy'
import BasicTabs from '../components/ProductDetailTab';

function productDetails() {

    const review=[
            {rating:4,name:'Saad',comment:'The product is legit',date:'28/6/20'},
            {rating:3,name:'Osama',comment:'The product is legit',date:'21/6/20'},
            {rating:5,name:'Khalid',comment:'The product is legit',date:'26/6/20'},
            {rating:1,name:'Khan',comment:'The product is legit',date:'27/6/20'}
        ]

    const [ quantity, setquantity ] = useState(1);
    const [ fetchedProduct, setFetchedProduct ] = useState({});
    const [ data, setdata ] = useState([]);
    const [ flag, setflag ] = useState(0);
    const toggle = useStoreActions((actions)=>actions.settoggle)
    

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
        oldData?.filter((e)=> {
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
    
    var flag1=0;

    const cartUpdate = () => {
        
        flag1=0;
        const arr=[]
        setflag(!flag)
        setquantity(1)
        const oldData = JSON.parse(localStorage.getItem("cartItems"));
        if(oldData){
            oldData.forEach( item => {
                if ( item._id == fetchedProduct._id ){
                    item.cartQuantity += quantity;
                    flag1=1;
                }
            })
            if(!flag1){
                const newObj=fetchedProduct;
                newObj['cartQuantity']=quantity;
                oldData.push(newObj)
                localStorage.setItem("cartItems", JSON.stringify(oldData));
                toggle();
                return
            }
            localStorage.setItem("cartItems", JSON.stringify(oldData));
            toggle();
        }
        else{
            const newObj=fetchedProduct;
            newObj['cartQuantity']=quantity;
            arr.push(newObj)
            localStorage.setItem("cartItems", JSON.stringify(arr));
            toggle();
            return
        }
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

    var check=""
    var stockQty=""
    if(data.length!==0){
        console.log("im not null")
        stockQty = fetchedProduct.quantity<20?fetchedProduct.quantity:19
        check = quantity <= stockQty-data.cartQuantity?false:true
    }
    else{
        stockQty = fetchedProduct.quantity<20?fetchedProduct.quantity:19
        check= quantity <= stockQty?false:true
    }

    console.log(fetchedProduct)

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
                            <button className={quantity<2?styles.ch:styles.cn} disabled={quantity<2?true:false} onClick={fun}>-</button>
                                <p className="p">{quantity}</p>    
                            <button className={check?styles.ch:styles.cn} disabled={check} onClick={fun}>+</button>
                        </div>
                        <div>
                            <button disabled={ check } onClick={ ()=>cartUpdate() } className={check?styles.btn2:styles.btn}>{check?"OUT OF STOCK":"ADD TO CART"}</button>
                        </div>
                    </div>
                </div>
                    <BasicTabs review={review} desc="This description is comming from tabs"/>
            </div>

        </div>
    )
}

export default productDetails
