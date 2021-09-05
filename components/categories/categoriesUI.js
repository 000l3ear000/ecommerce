
import styles from '../../styles/Categories.module.css'
import { useState,useEffect } from 'react';

const CategoriesUI = () => {


    const fun=(e)=>{
        // console.log(e.currentTarget.querySelector("h5").innerHTML)
        window.location.href=`http://localhost:3000/searchFinal?pro=${e.currentTarget.querySelector("h5").innerHTML}`
    }

    // fetch req to get categories from db
    const categories = [
        'Shampoo',
        'Soap',
        'category3',
        'category4',
        'category5',
        'category6',
        'category7',
        'category8',
        'category9',
        'category10',
        'category11',
        'category12'
    ]
    const link="https://picsum.photos/200";

    return (
        
        <div className={styles.wrapper}>
            <div className={styles.row}>
                <div onClick={fun} className={styles.category}>
                    <img src={link} alt="img" width="100" height="100" />
                    <h5>{ categories[0] }</h5>
                </div>
                <div onClick={fun} className={styles.category}>
                    <img src={link} alt="img" width="100" height="100" />
                    <h5>{ categories[1] }</h5>
                </div>
                <div onClick={fun} className={styles.category}>
                    <img src={link} alt="img" width="100" height="100" />
                    <h5>{ categories[2] }</h5>
                </div>
                <div onClick={fun} className={styles.category}>
                    <img src={link} alt="img" width="100" height="100" />
                    <h5>{ categories[3] }</h5>
                </div>
            </div>

            <div className={styles.row}>
                <div onClick={fun} className={styles.category}>
                    <img src={link} alt="img" width="100" height="100" />
                    <h5>{ categories[4] }</h5>
                </div>
                <div onClick={fun} className={styles.category}>
                    <img src={link} alt="img" width="100" height="100" />
                    <h5>{ categories[5] }</h5>
                </div>
                <div onClick={fun} className={styles.category}>
                    <img src={link} alt="img" width="100" height="100" />
                    <h5>{ categories[6] }</h5>
                </div>
                <div onClick={fun} className={styles.category}>
                    <img src={link} alt="img" width="100" height="100" />
                    <h5>{ categories[7] }</h5>
                </div>
            </div>

            <div className={styles.row}>
                <div onClick={fun} className={styles.category}>
                    <img src={link} alt="img" width="100" height="100" />
                    <h5>{ categories[8] }</h5>
                </div>
                <div onClick={fun} className={styles.category}>
                    <img src={link} alt="img" width="100" height="100" />
                    <h5>{ categories[9] }</h5>
                </div>
                <div onClick={fun} className={styles.category}>
                    <img src={link} alt="img" width="100" height="100" />
                    <h5>{ categories[10] }</h5>
                </div>
                <div onClick={fun} className={styles.category}>
                    <img src={link} alt="img" width="100" height="100" />
                    <h5>{ categories[11] }</h5>
                </div>
            </div>

        </div>
    )
}

export default CategoriesUI


