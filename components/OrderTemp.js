import React, { useState,useEffect } from "react";
import styles from "../styles/OrderTemp.module.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import cookies from 'js-cookies';
import { Rating } from "@material-ui/lab";
import { Typography } from "@mui/material";

function OrderTemp({ data }) {

  const [flag, setFlag] = useState(0);
  const [name, setname] = useState("");
  const [comment, setComment] = useState('')
  console.log('mein render hua', data);
  console.log('MEIN COMMENT KARRAHA HUN ', comment);
  useEffect(() => {
      setname(cookies.getItem("name"));
    }, []);

    
    
    const submit=(e)=>{
        e.preventDefault();
        console.log("Pressed")
    }
    
    const RenderRating = (data) => {
        
        const [value, setValue] = useState(0);
        useEffect(() => {
            if ( value ) console.log("mein value hun", value);
          }, [value])
      console.log('mein data hun', data)
      return (
          <>
            <Typography component="legend">Controlled</Typography>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                style={{ height: '30px' }}
            />
            <div style={{ display:'flex', flexDirection: 'column', border: '2px solid yellow', height: '500px', width: '100%' }} >
                <h5>{ data.name }</h5>
                <form onSubmit={submit}>
                    <h5>{ name }</h5>
                    <label htmlFor="">Your comment here ...</label>
                    <textarea rows="6" value={comment} required cols="50" type="text" onChange={ (e) => setComment(e.target.value) } required placeholder="Enter your comment here" />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </>
      )
  }

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
                <KeyboardArrowDownIcon className={ styles.dropIcon } onClick={() => flag ? setFlag(0) : setFlag(1)} />
            </div>
        </div>
        <div 
        style={
            flag ? { display: 'flex', backgroundColor: 'lightblue', width: '900px', height: '600px', border: '2px solid white' } 
            : 
            { display: 'none' }} 
        >
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

        {RenderRating(data.orders[0])}
        {/* <Rating /> */}
        {/* {
            data?.orders.map( obj => (
                <RenderRating data={obj} />
            ))
        } */}
        </div>


    </>
  );
}

export default OrderTemp;
