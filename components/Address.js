import React, { useState, useEffect } from 'react'
import { Input, InputLabel, Select, MenuItem, Button, Grid, Typography, TextField } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import cookies from 'js-cookies';
import func from './Cities'
import styles from '../styles/Address.module.css'
import { useRouter } from 'next/dist/client/router';
import { CircularProgress,Box } from '@mui/material';


function Address({ value,toggle }) {
    
    const [Address, setAddress] = useState("")
    const [First, setFirst] = useState("")
    const [Last, setLast] = useState("")
    const [Email, setEmail] = useState("")
    const [Err, setErr] = useState("")
    const [randomText, setRandomText] = useState("")
    const [flag, setFlag] = useState(0)
    const router = useRouter();

    useEffect(() => {
        const shippingAddress = async () => {
            const response = await fetch("http://localhost:3000/api/getUserShippingAddress?userid=" + cookies.getItem("id"))
            const userShippingAddress = await response.json();
            var data = ""
            if ( userShippingAddress.success && userShippingAddress.address){
                const { address, firstName, lastName, email } = userShippingAddress.address;
                console.log("Address I GOT >>>", firstName);
                setAddress(address);
                setEmail(email);
                setFirst(firstName);
                setLast(lastName);
            }
            else{
                setEmail(()=>cookies.getItem('email'))
                setFirst(()=>cookies.getItem('name').split(' ')[0])
                setLast(()=>cookies.getItem('name').split(' ')[1])
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

    // const { register, handleSubmit, formState: { errors } } = useForm();
    const [shippingData, setShippingData] = useState({});
    const [shippingCity, setShippingCity] = useState('Lahore');
    const [cities, setShippingCities] = useState(func());
    const [disabled, setDisabled] = useState(true);
    
    console.log("This is shipping data", shippingData);
    console.log("rerender")
    
    useEffect (() => {
        verification();
    }, [disabled])

    const onSubmit = (e) => {
        e.preventDefault();
        checkValidation()
    }

    const checkValidation = () => {
        const data = {}
        if(First === "" || First.length<3){
            console.log("First name too short")
            setErr("First name too short")
            return false
        }
        if(Last === "" || Last.length<3){
            console.log("Last name too short")
            setErr("Last name too short")

            return false
        }

        if( !Email.includes("@") || Email.length<8 || !Email.includes(".") ){
            console.log("invalid email format")
            setErr("Invalid email format")
            return false
        }
        if(Address.length<10){
            setErr("Address too short")
            return false
        }
        setErr("")
        data['firstName'] = First
        data['lastName'] = Last
        data['email'] = Email
        data['address'] = Address
        data["city"] = shippingCity;
        console.log("This is ")
        console.log("data here--------------------------------",data)
        console.log("This is randomText >>> ", randomText);
        setShippingData(data)
        setDisabled(false)

        return true
        
    }

    const verification = async () => {
        if(!disabled){
            setFlag(1)            
            console.log("I was here")
            const token = cookies.getItem("jwt");
            console.log("Token >>> ", token)
            if( token != null ){
                const response = await fetch("http://localhost:3000/api/verifyToken", {
                    method: "POST",
                    headers: {
                            "Content-Type": "application/json",                    
                            token,
                    }
                })
                const validToken = await response.json();
                console.log("Valid Token >>> ", validToken);
                console.log("Valid Token >>> ", token);
                if( typeof window !== "undefined" ){
                if ( validToken.decoded?.email === cookies.getItem("email")){
                        // window logic here for undefined
                        //const orders = localStorage.getItem("cartItems");
                        const address = shippingData
                        const userId = cookies.getItem("id");
                        const res = await fetch("http://localhost:3000/api/getUserShippingAddress", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",                    
                                "userId": userId
                            },
                            body: JSON.stringify(address)
                        })
                        
                        //const checkOrderInsertion = await res.json();
                        const status = await res.json();
                        if ( status.success ) {
                            console.log("Order successfully inserted")
                            //console.log("Your order was successful:- ", checkOrderInsertion._id)
                            console.log("success")
                            router.push("/payment")
                        }
                        else{
                            console.log("Something went wrong WITH saving address>",status)
                        }
                    }

                else{
                    if ( validToken.err.name === "TokenExpiredError" ){
                        cookies.setItem("jwt", "")
                        router.push('/auth/login?onCart=true')
                    }
                    else{
                        console.log("Could not process the request")
                    }
                }
                }
            }
            else{
                router.push('/auth/login?onCart=true')
            }
        }
        else{
            console.log("fill the fields")
        }
        }

    return (
        <div className={styles.main}>
            <Typography variant="h6" gutterBottom >Shipping Address</Typography>
            {/* pattern: /^[A-Za-z]+$/i, maxLength: 20 */}
            <form className={styles.form}  >
                    <TextField className={styles.input} onChange={ e => setFirst(e.target.value) } value={First} type="text" label="First Name" required />
                    <TextField className={styles.input}  value={ Last } onChange={ e => setLast(e.target.value) } type="text" label="Last Name" required />
                    <TextField className={styles.input} value={ Email } onChange={ e => setEmail(e.target.value) } type="email" label="Email" required />
                    <TextField value={Address} onChange={(e)=>{setAddress(e.target.value)}} className={styles.input} type="text" label="Address" required />
                    {/* <TextField id="sad" value={Address} onChange={e=>setAddress(e.target.value)} className={styles.input} type="text" label="Address" {...register("address")} required /> */}
                    {/* <TextField className={styles.input} type="number" label="Phone #" {...register("phone", { pattern: [0-9]{3}-[0-9]{2}-[0-9]{3}})} required /> */}
                    {/* <TextField className={styles.input} type="text" label="City" {...register("city")} required /> */}
                    {/* <TextField className={styles.input} type="number" label="Zip Code" {...register("zip", { pattern: [0-9]{5} })} required /> */}
                    <span style={{color:'red',fontSize:'16px'}} id="sad">
                        {Err}
                    </span>                
                    <InputLabel  style={{ marginTop: "10px" }} >Shipping City</InputLabel>
                        <select className={styles.select} fullWidth onChange={ (e) => setShippingCity(e.target.value) }  >
                            <option selected key="lahore" value="lahore" >
                                    Lahore
                            </option>
                            { cities.map((city) => (
                                <option key={city} value={city} >
                                    { city }
                                </option>
                            )) }
                        </select>
                        <br /><br />
                            {
                                flag ? (
                                    <Box sx={{ display: 'flex' }}>
                                        <CircularProgress />
                                    </Box>
                                ):
                                <Button disabled={!toggle || !disabled} type="submit" onClick={onSubmit} variant="contained" color="secondary" >Proceed to payment</Button>
                            }
                        
            </form>
            <h1>Subtotal:- {value}</h1>
        </div>
    )
}
export default Address
