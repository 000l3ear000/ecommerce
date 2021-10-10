import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import cookies from 'js-cookies'
import styles from '../styles/Payment.module.css'
import OrderedProducts from '../components/OrderedProducts';
import UserShippingAddress from '../components/UserShippingAddress';
import { useStoreActions } from 'easy-peasy'
import { baseUrl } from '../constants/baseUrl';
import { CircularProgress, Box } from '@mui/material';


function payment() {
    const router = useRouter()
    const [state, setstate] = useState("")
    const [flag, setFlag] = useState(0)
    const [orderedProducts, setOrderedProducts] = useState([]);
    const [user, setUser] = useState({});
    const [subtotal, setSubtotal] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState("");
    const settoggle = useStoreActions((actions) => actions.settoggle)
    const [emailSent, setEmailSent] = useState('');

    useEffect(() => {
        const arr = []
        const data = JSON.parse(localStorage.getItem("cartItems"))
        console.log("THESE ARE CART ITEMS >>>> ", data);
        setOrderedProducts(data);

        if (data) {
            data.forEach(element => {
                arr.push({ id: element._id, qty: element.cartQuantity })
            });
        }
        else {
            router.push('/cart')
        }
        console.log("This is the final order list", arr)
        setstate(arr);
    }, [])

    useEffect(() => {
        if (paymentMethod === "cash_on_delivery") {
            // push forward
            console.log("CASH ON DELIVERY", paymentMethod);
        }
        else if (paymentMethod === "card_payment") {
            // card module
            console.log("CARD PAYMENT")
        }
        else {
            console.log('SOME OTHER ERROR OCCURED')
        }
    }, [paymentMethod])

    const getSubtotal = () => {
        let tempSubtotal = 0;
        orderedProducts.forEach(item => {
            tempSubtotal += item.cartQuantity * item.price;
        })
        setSubtotal(tempSubtotal);
    }

    useEffect(() => {
        getSubtotal();
    }, [orderedProducts])

    useEffect(() => {
        const shippingAddress = async () => {
            const response = await fetch("http://localhost:3000/api/getUserShippingAddress?userid=" + cookies.getItem("id"))
            const userShippingAddress = await response.json();
            var data = ""
            if (userShippingAddress.success && userShippingAddress.address) {
                setUser(userShippingAddress.address)
            }
            else {
                console.log("New User")
            }
            // document.getElementById('sad').value=data;

        }
        if (cookies.getItem('id')) {
            shippingAddress();
        }
        else {
            router.push('/auth/login?onCart=true')
        }
    }, [])

    const placeOrder = async (e) => {
        e.target.disabled = true
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
        if (checkOrderInsertion.success) {
            console.log("YAAAAYYYY WE GOT YOUR PAYMENT");
            localStorage.clear()
            settoggle()
            setFlag(1);
            if (cookies.getItem('jwt')) {
                const response = await fetch(`${baseUrl}/api/emailVerification`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "email": cookies.getItem('email'),
                        "token": cookies.getItem('jwt'),
                        "action": 'order confirm',
                    },
                });
                const checkEmail = await response.json();
                if (checkEmail.err === "hello") {
                    setEmailSent("Email sent for your order confirmation")
                    setTimeout(() => {
                        router.push('/thankyou')
                    }, 2000)
                }
                else {
                    setEmailSent("Could Not Send Email", checkEmail.err)
                }
            }

            // setOrderedProducts( checkOrderInsertion.order.orders );
            // setUser( checkOrderInsertion.user );

        }
        else if (checkOrderInsertion) {
            console.log("ERRRRRRRRROOOOOOOOOOORRRRRRRRRRR <<<<<<<<< ", checkOrderInsertion);
            cookies.setItem("jwt", "");
            cookies.setItem("name", "");
            cookies.setItem("email", "");
            cookies.setItem("id", "");
            cookies.setItem("address", "");
            router.push('/auth/login?onPayment=true')
        }
    }

    const handleChange = (e) => {

        setPaymentMethod(e.target.value);

    };
    // <div className={ styles.orders__subtotal } ></div>
    // { user? <UserShippingAddress user={ user } /> : null }

    return (
        <div className={styles.root}>
            <div className={styles.first}>
                {orderedProducts?.map(product => (
                    <OrderedProducts key={product._id} product={product} />
                ))}
                <h1>{subtotal}</h1>
            </div>

            {user ? <UserShippingAddress subtotal={subtotal} user={user} execOrder={placeOrder} /> : null}
            {
                subtotal ? (
                    <div className="payment__method" >
                        {
                            (
                                <div style={{ display: 'flex', color: 'white', fontFamily: 'fantasy', border: '1px solid black', fontFamily: 'sans-serif', backgroundColor: '#F96302', padding: '10px', flexDirection: 'column', alignItems: 'center' }}>
                                    <h2 style={{ border: '1px solid white', marginBottom: '80px', padding: '8px' }}>Select A Payment Method</h2>
                                    <div style={{ display: 'flex', color: 'white',flexDirection:"column",marginBottom:'20px', justifyContent: 'center' }}>
                                        <div className={styles.select}>
                                            <input onChange={(e) => handleChange(e)} disabled={subtotal > 5000 ? true : false} type="radio" name="payment" value="cash_on_delivery" /><span style={subtotal > 5000 ? { textDecoration: "line-through" } : null}>Cash on delivery</span>
                                        </div>
                                        <div className={styles.select}>
                                            <input onChange={(e) => handleChange(e)} type="radio" name="payment" value="card_payment" /><span>Card payment</span>
                                        </div>
                                    </div>
                                    <h5 style={subtotal > 5000 ? { color: 'white' } : { display: "none" }}>Sorry you cannot use Cash On Delivery on amount greater than 5000 rupees</h5>
                                    {
                                        flag ? (
                                            <Box sx={{ display: 'flex' }}>
                                                <CircularProgress />
                                            </Box>
                                        ) : (
                                            <button disabled={!paymentMethod} style={{ height: '35px', borderRadius: '5px', border: '1px solid white', backgroundColor: "#F96302" }} onClick={(e) => placeOrder(e)}>PlaceOrder</button>
                                        )
                                    }
                                </div>
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
