import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import cookies from 'js-cookies'
import styles from '../styles/Payment.module.css'
import  OrderedProducts  from '../components/OrderedProducts';
import  UserShippingAddress  from '../components/UserShippingAddress';
import {useStoreActions} from 'easy-peasy'

function payment() {
    const router = useRouter()
    const [state, setstate] = useState("")
    const [orderedProducts, setOrderedProducts] = useState([]);
    const [user, setUser] = useState({});
    const [subtotal, setSubtotal] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("");
    const settoggle=useStoreActions((actions)=>actions.settoggle)

    useEffect(() => {
        const arr=[]
        const data=JSON.parse(localStorage.getItem("cartItems"))
        console.log("THESE ARE CART ITEMS >>>> ", data);
        setOrderedProducts( data );

        if(data){
            data.forEach(element => {
                arr.push({id:element._id,qty:element.cartQuantity})
            });
        }
        else{
            router.push('/cart')
        }
        console.log("This is the final order list",arr)
        setstate(arr);
    }, [])

    useEffect(() => {
        if ( paymentMethod === "cash_on_delivery" ){
            // push forward
            console.log("CASH ON DELIVERY", paymentMethod);
        }
        else if ( paymentMethod === "card_payment" ){
            // card module
            console.log("CARD PAYMENT")
        }
        else{
            console.log('SOME OTHER ERROR OCCURED')
        }
    }, [paymentMethod])

    const getSubtotal = () => {
        let tempSubtotal = 0;
        orderedProducts.forEach( item => {
            tempSubtotal += item.cartQuantity * item.price;
        } )
        setSubtotal( tempSubtotal );
    }

    useEffect(() => {
        getSubtotal();
    },[orderedProducts])

    useEffect(() => {
        const shippingAddress = async () => {
            const response = await fetch("http://localhost:3000/api/getUserShippingAddress?userid=" + cookies.getItem("id"))
            const userShippingAddress = await response.json();
            var data = ""
            if ( userShippingAddress.success && userShippingAddress.address){
                setUser( userShippingAddress.address )
            }
            else{
                console.log("New User")
            }
            // document.getElementById('sad').value=data;

        }
        if(cookies.getItem('id')){
            shippingAddress();
        }
        else{
            router.push('/auth/login?onCart=true')
        }
    }, [])
    
    const placeOrder = async(e) => {
        e.target.disabled=true
        const res = await fetch("http://localhost:3000/api/fetchPaymentProducts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",                    
                        "userId": cookies.getItem('id'),
                        "_jwt": cookies.getItem("jwt")
                    },
                    body: JSON.stringify(state)
                })
                // rest logic here
                const checkOrderInsertion = await res.json();
                if ( checkOrderInsertion.success ){
                    console.log("YAAAAYYYY WE GOT YOUR PAYMENT");
                    localStorage.clear()
                    settoggle()
                    router.push('/thankyou')
                    // setOrderedProducts( checkOrderInsertion.order.orders );
                    // setUser( checkOrderInsertion.user );

                }
                else if(checkOrderInsertion){
                    console.log("ERRRRRRRRROOOOOOOOOOORRRRRRRRRRR <<<<<<<<< ", checkOrderInsertion);
                    cookies.setItem("jwt", "");
                    cookies.setItem("name", "");
                    cookies.setItem("email", "");
                    cookies.setItem("id", "");
                    cookies.setItem("address", "");
                    router.push('/auth/login?onPayment=true')
                }
    }
    
    const handleChange =  (e) => {

        setPaymentMethod( e.target.value );


    };
    // <div className={ styles.orders__subtotal } ></div>
    // { user? <UserShippingAddress user={ user } /> : null }

    return (
        <div className={styles.root}>
            <div className={styles.first}>
                { orderedProducts?.map(product => (
                    <OrderedProducts key={ product._id } product={ product } />
                )) }
                <h1>{subtotal}</h1>
            </div>
            
            { user? <UserShippingAddress subtotal={subtotal} user={ user } execOrder={placeOrder} /> : null }
            {
                subtotal? (
                    <div className="payment__method" >
                    {
                        (
                            <form onChange={ (e) => handleChange(e) } >

                                <input disabled={subtotal>5000?true:false} type="radio" name="payment" value="cash_on_delivery"/><span style={subtotal>5000?{textDecoration:"line-through"}:null}>Cash on delivery</span>
                                
                                <input type="radio" name="payment" value="card_payment" /><span>Card payment</span>
                                <h5 style={subtotal>5000?null:{display:"none"}}>Sorry you cannot use Cash On Delivery on amount greater than 5000 rupees</h5>
                                <button onClick={(e)=>placeOrder(e)}>PlaceOrder</button>
                            </form>
                        ) 
                    }
                    </div>
                ) : (
                    <h5>Subtotal isnt calculated yet</h5>
                )
            }

        </div>
    )
}

export default payment
