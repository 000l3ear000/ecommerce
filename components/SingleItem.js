
import React,{useState,useEffect} from 'react'
import styles from '../styles/SingleItem.module.css'

import 'react-toastify/dist/reactToastify.css'
import { toast } from 'react-toastify'

toast.configure()
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';

export default function SingleItem({ item }) {
    
    const [productRating, setProductRating] = useState("");
    


    useEffect(() => {
        const getRating = async () => {
            const response = await fetch("http://localhost:3000/api/fetchRating", {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "id": item._id,
                }
            })
            const ratingFetched = await response.json();
            console.log("RATING PRODUCT FETCHED FROM API >>><<< ", ratingFetched.success[0]);
            setProductRating(ratingFetched.success[0]);
        }
    
        const oldData = JSON.parse(localStorage.getItem("cartItems"));
        if(oldData)
        oldData.filter((e)=>{
            if(e._id==item._id){
                setQ(e.cartQuantity)
            }
        })
        getRating();
    }, [])

    const [Q, setQ] = useState(0)
    // const fun=()=>{
        
    //     console.log(item)
    // }
    const addCart = () => {
        // localStorage.clear()
        const oldData = JSON.parse(localStorage.getItem("cartItems"));
        //
        if(!oldData){
            const arr=[]
            item["cartQuantity"]=1;
            setQ(1)
            arr.push(item)
            localStorage.setItem("cartItems", JSON.stringify( arr ))
            toast("new item Added!")
        }
        else{
            var done=0;
            oldData.forEach(element => {
                if(element._id==item._id){
                    if(element.cartQuantity<(item.quantity<20?item.quantity:20)){
                        element.cartQuantity+=1
                        done=1;
                        console.log("value+")
                        setQ(element.cartQuantity)
                        //toast("Quantity increased!")
                    }   
                    else{
                        console.log("maxx")
                        done=1;
                    }     
                }
            });
                if(!done){ 
                    item["cartQuantity"]=1;
                    setQ(1)
                    oldData.push(item)
                    console.log("new item to cart")
                }
                localStorage.setItem("cartItems", JSON.stringify( oldData ))  
            }


        // const data[]
        // localStorage.setItem("cartItems", JSON.stringify({  }))
        console.log("Donee");
        console.log("This is in localStorage",JSON.parse(localStorage.getItem("cartItems")));
    }
    const navigate = (e) => {
        
        if(e.target.value!=='btn'){
            window.location.href=`http://localhost:3000/productDetails?_id=${item._id}`
        }
        
    }


    const showRating = () => {
        const str = [];
        if(productRating){
            const arr = productRating.rating.toString().split(".");
            console.log("THIS IS THE RATING ARRAY >>> ", arr);
            for( let i = 0; i != parseInt(arr[0])+1; i++ ){
                if(arr.length>1 && parseInt(arr[0])===i){
                    str.push(<StarHalfIcon style={{ color: "#FFF13E" }} />)
                }
                else if(i != parseInt(arr[0])){
                    str.push(<StarIcon style={{ color: "#FFF13E" }}/>)
                }
            }
            console.log("THIS IS THE RATING STRINGGG >>> ", str);
        }
        return str;
    }
        

    return (
        <div onClick={navigate} className={styles.container}>
            <div className={styles.img}>
                <img src="https://picsum.photos/200" alt="an image"></img>
            </div>
            <div className={styles.desc}>
                <div className={styles.info}>
                    <p><strong>{item.name}</strong> {item.description}</p>
                </div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <span style={{display:'flex',alignItems:'center'}}>{ productRating?.rating==0?<StarBorderIcon/>: showRating().map(e=>(e)) }({productRating?.rating})</span><span>{`${productRating? productRating.purchased : "No"} Ratings`}</span>
                </div>
                <div className={styles.descc}>
                    <h1>{item.price}</h1>
                    <p>/ {item.q}</p>
                </div>
                <button onClick={addCart} value='btn' disabled={item.quantity!=Q?false:true} className={item.quantity!=Q?styles.btn:styles.btn2}>{item.quantity==Q?"OUT OF STOCK":"ADD TO CART"}</button>
                {console.log(item.quantity,Q)}
            </div>
        </div>
    )
}
