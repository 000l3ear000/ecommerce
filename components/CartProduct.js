import React, {useState,useEffect} from 'react'
import classes from '../styles/CartProduct.module.css'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton, StylesProvider } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';


// import useStyles from './styles'




function CartProduct({ item,fun,func }) {
    const [quantity, setquantity] = useState(item.cartQuantity)
    // useEffect(() => {
        
    // }, [])
    const updateQty = (e) => {
        const data = JSON.parse(localStorage.getItem("cartItems"))
        if(e.target.value ==='-'){
            if(data){
                data.forEach(element => {
                    if(element._id==item._id){
                        if(element.cartQuantity!=1){
                            element.cartQuantity-=1
                            console.log("pressed")
                            setquantity(element.cartQuantity)
                            func(!fun)
                        }
                        else{
                            data.splice((data.indexOf(element)),1)
                            console.log(data)
                            func(!fun)
                        }
                    }
                localStorage.setItem('cartItems',JSON.stringify(data))
                
                });
            }
        }
        else{
            if(data){
                data.forEach(element => {
                    if(element._id==item._id){
                            element.cartQuantity+=1
                            setquantity(element.cartQuantity)
                            func(!fun)
                        }
                    });
                localStorage.setItem('cartItems',JSON.stringify(data))
            }
        }
    }
    
    return (
        <Card className={ classes.root }>
            <CardMedia className={ classes.media } image='1.jpg'  title="Keyboard"/>
            <CardContent>
                <div className={ classes.cardContent }>
                    <Typography variant="h5" gutterBottom>
                         { item.name }
                    </Typography>
                    <Typography variant="h5">
                        Rs. { item.price}
                        <span className={classes.per}>/{item.q}</span> 
                    </Typography>
                </div>
                <Typography className={classes.desc} variant="body2" color="textSecondary">{ item.description }</Typography>
                <div className={ classes.change}>
                    <button className={classes.cn} value="-" onClick={updateQty}>-</button>
                    <p>{ quantity }</p>
                    <button className={quantity>(item.quantity<20?item.quantity-1:19)?classes.ch:classes.cn} disabled={quantity>(item.quantity<20?item.quantity-1:19)?true:false} value="+" onClick={updateQty}>+</button>
                </div>

            </CardContent>
        </Card>
    )
}

export default CartProduct
