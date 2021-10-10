import React, { useState, useEffect } from "react";
import styles from "../styles/OrderTemp.module.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import cookies from 'js-cookies';
import { Rating } from "@material-ui/lab";
import { Typography } from "@mui/material";

function CommentnRating(props) {
    const [value, setValue] = useState(0);
    const [name, setname] = useState("");
    const [comment, setComment] = useState('')

    useEffect(() => {
        setname(cookies.getItem("name"));
        console.log(props.data)
    }, []);

    const submit = (e) => {
        e.preventDefault();
        console.log("Pressed","rating:", value, comment)
        setValue("")
        setComment("")
        
    }
    return (
        <div style={{marginTop:'10px',backgroundColor: '#F96302',borderRadius:'20px'}}>
            <div style={{ display: 'flex',color:'white', alignItems:"center",flexDirection: 'column', padding:"10px", width: '100%' }}>
                <h3 style={{margin:0,padding:0}}>Rate Our Product</h3>
                <span style={{display:'flex',width:'100%',justifyContent:'space-evenly'}}>
                    <h4>Product Name:- {props.data.name}</h4>
                    <h4>Comment By :-{name}</h4>
                </span>
                <form style={{display:'flex',flexDirection:'column',alignItems:"center"}} onSubmit={submit}>
                    {/* <label htmlFor="">Your comment here ...</label> */}
                    <Rating
                        required="true"
                        key={props.data.name}
                        
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        style={{ height: '30px' }}
                    />
                    <textarea rows="6" value={comment} style={{padding:'10px',borderRadius:'10px',resize:'none',width:"100%"}} required cols="50" type="text" onChange={(e) => setComment(e.target.value)} placeholder="Enter your comment here" />
                    <input disabled={!value} style={{borderRadius:'10px',border:'none',marginTop:'10px',height:"50px",backgroundColor:'white', color:"#F96302",width:'200px'}} type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}

export default CommentnRating
