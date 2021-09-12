import { StylesContext } from '@material-ui/styles'
import React from 'react'
import styles from '../styles/Footer.module.css'

export default function Footer() {
    return (
        <div className={styles.content}>
            <div className={styles.div1}>
                <div className={styles.inner1}>
                    <h3>Hola</h3>
                    <ul>
                        <li><a href="https://google.com">hello</a></li>
                        <li><a href="https://google.com">hello</a></li>                        
                        <li><a href="https://google.com">hello</a></li>                        
                        <li><a href="https://google.com">hello</a></li>
                        <li><a href="https://google.com">hello</a></li>                        
                        <li><a href="https://google.com">hello</a></li>
                    </ul>
                </div>
                <div className={styles.inner1}>
                    <h3>Hola</h3>
                    <ul>
                        <li><a href="https://google.com">hello</a></li>
                        <li><a href="https://google.com">hello</a></li>                        
                        <li><a href="https://google.com">hello</a></li>                        
                        <li><a href="https://google.com">hello</a></li>
                        <li><a href="https://google.com">hello</a></li>                        
                        <li><a href="https://google.com">hello</a></li>
                    </ul>
                </div>                
                <div className={styles.inner1}>
                    <h3>Hola</h3>
                    <ul>
                        <li><a href="https://google.com">hello</a></li>
                        <li><a href="https://google.com">hello</a></li>                        
                        <li><a href="https://google.com">hello</a></li>                        
                        <li><a href="https://google.com">hello</a></li>
                        <li><a href="https://google.com">hello</a></li>                        
                        <li><a href="https://google.com">hello</a></li>
                    </ul>
                </div>
                <div className={styles.inner}>
                    <div className={styles.deco}>

                    </div>
                    <div className={styles.contactus}>
                        <div>
                            <input type="email" placeholder="Email Here"></input>
                            <button>GO</button>
                        </div>

                    </div>
                </div>

            </div>
            <div className={styles.div2}>
                <div className={styles.inner2}>
                    <h3>Shop Our Brands</h3>
                </div>
                <div className={styles.inner3}>
                    <img src='1.jpg'></img>
                    <img src='1.jpg'></img>
                    <img src='1.jpg'></img>
                    <img src='1.jpg'></img>                   
                    <img src='1.jpg'></img>
                    <img src='1.jpg'></img>
                    <img src='1.jpg'></img>                    
                    <img src='1.jpg'></img>            
                </div>
                <div className={styles.inner3}>
                    <img src='1.jpg'></img>
                    <img src='1.jpg'></img>
                    <img src='1.jpg'></img>
                    <img src='1.jpg'></img>                   
                    <img src='1.jpg'></img>
                    <img src='1.jpg'></img>
                    <img src='1.jpg'></img>                    
                    <img src='1.jpg'></img>            
                </div>
            </div>
        </div>
    )
}
