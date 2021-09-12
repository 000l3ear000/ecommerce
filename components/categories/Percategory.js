import React from 'react'
import styles from '../../styles/PerCategory.module.css'
import { useRouter } from 'next/dist/client/router';

function Percategory({ text }) {

    const router = useRouter();
    const link="https://picsum.photos/200";
    const fun=(e)=>{
        // console.log(e.currentTarget.querySelector("h5").innerHTML)
        // window.location.href=`http://localhost:3000/categories?category=${e.currentTarget.querySelector("h5").innerHTML}`
        router.push(`/categories?category=${text}`);
    }

    return (        
        <div onClick={fun} className={styles.category}>
            <img src={link} alt="img" width="100" height="100" />
            <h5>{ text }</h5>
        </div>
    )
}

export default Percategory
