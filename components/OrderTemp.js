import React, { useState,useEffect } from "react";
import styles from "../styles/OrderTemp.module.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import cookies from 'js-cookies';
import { Rating } from "@material-ui/lab";
import { Typography } from "@mui/material";
import CommentnRating from "./Comment&Rating";

function OrderTemp({ data }) {

  const [flag, setFlag] = useState(0);
  const [name, setname] = useState("");
  const [comment, setComment] = useState('')
  console.log('mein render hua', data);
  console.log('MEIN COMMENT KARRAHA HUN ', comment);

  return (
    <>
        <div  className={styles.root}>
            <div className={ styles.product__ImgName } >
                <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdfestore.com%2Fwp-content%2Fuploads%2F2020%2F10%2F10348-1.jpg&f=1&nofb=1"
                alt="rgb keyboard"
                style={{ height: '100px', width: '100px', objectFit: 'contain' }}
                />
                <p>{ `${data.orders[0].name} ...` }</p>
            </div>
            <div className={ styles.orderDetails } >
                <p>{data._id}</p>
                <p>{data.userId}</p>
                <p>{data.status}</p>
                {flag?<KeyboardArrowDownIcon className={ styles.dropIcon } onClick={() => flag ? setFlag(0) : setFlag(1)} />:<KeyboardArrowUpIcon className={ styles.dropIcon } onClick={() => flag ? setFlag(0) : setFlag(1)} />}
            </div>
        </div>
        <div 
        style={
            flag ? { display: 'flex',flexDirection:'column', width: '900px', border: '2px solid white' } 
            : 
            { display: 'none' }} 
        >
            {
                data.orders.map((e)=>{
                    return(
                        <CommentnRating key={e._id} data={e}/>      
                    )
                })
            }
        </div>


    </>
  );
}

export default OrderTemp;

{/* RATING HERE... */}
        {/* <Typography component="legend">Controlled</Typography>
        <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            style={{ height: '30px' }}
        /> */}
        {/* {RenderRating(data.orders[0])} */}
        {/* <Rating /> */}
        {/* {
            data?.orders.map( obj => (
                <RenderRating data={obj} />
            ))
        } */}