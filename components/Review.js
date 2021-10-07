import React from 'react'
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';
function Review(props) {

    const populate=()=>{
        const arr=[]
        const value=props.data.rating;
        for(var i=0;i<5;i++){
            if(i<value){
                arr.push(<StarIcon style={{color:'#FFFF00',fontSize:'24px'}}/>)
            }
            else{
                arr.push(<StarBorderIcon style={{fontSize:'24px'}}/>)
            }
        }
        return arr
    }


    return (
        <div style={{width:'100%',fontFamily:'sans-serif',display:'flex',flexDirection:'column',padding:'10px',marginTop:'10px',border:'1px solid orange'}}>
            <div style={{paddingLeft:'30px',fontFamily:'sans-serif',width:'100%',backgroundColor:'#F96302',color:'white',display:'flex',alignItems:'center'}}>
                <p style={{fontWeight:'600',minWidth:'100px'}}>{props.data.name}</p>
                <p style={{marginLeft:'20px',display:'flex',alignItems:'center'}}>{populate()}({props.data.rating})</p>
            </div>
            <p style={{width:'100%'}}>{props.data.comment}</p>
            <p style={{color:'#F96302',display:'flex',marginRight:'20px',justifyContent:'flex-end'}}>Posted on:- {props.data.date}</p>
        </div>
    )
}

export default Review
