import { display } from "@mui/system";
import React, { useState } from "react";
import styles from "../styles/OrderTemp.module.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function OrderTemp({ data }) {

  const [flag, setFlag] = useState(0);

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
            flag ? { display: 'flex', backgroundColor: 'lightblue', width: '900px', height: '300px', border: '2px solid white' } 
            : 
            { display: 'none' }} 
        >
        hehehe
        </div>


    </>
  );
}

export default OrderTemp;
