import { StylesContext } from '@material-ui/styles'
import React from 'react'
import styles from '../styles/Footer.module.css'

export default function Footer() {
    return (
        <div className={styles.content}>
            <div className={styles.div1}>
                <div className={styles.inner1}>
                    <h3>Customer Service</h3>
                    <ul>
                        <li><a href="https://google.com">Check Order Status</a></li>
                        <li><a href="https://google.com">Pay Your Credit Card</a></li>                        
                        <li><a href="https://google.com">Order Cancellation</a></li>                        
                        <li><a href="https://google.com">Returns</a></li>
                        <li><a href="https://google.com">Shipping and Delivery</a></li>                        
                        <li><a href="https://google.com">Product Recalls</a></li>
                        <li><a href="https://google.com">Help & FAQ</a></li>
                        <li><a href="https://google.com">Privacy & Security Center</a></li>
                    </ul>
                </div>
                <div className={styles.inner1}>
                    <h3>Resources</h3>
                    <ul>
                        <li><a href="https://google.com">Specials & Offers</a></li>
                        <li><a href="https://google.com">DIY Projects & Ideas</a></li>                        
                        <li><a href="https://google.com">Truck & Tool Rental</a></li>                        
                        <li><a href="https://google.com">Installations & Services</a></li>
                        <li><a href="https://google.com">Moving Supplies & Rentals</a></li>                        
                        <li><a href="https://google.com">Protection Plans</a></li>
                        <li><a href="https://google.com">Rebate Center</a></li>
                        <li><a href="https://google.com">Gift Cards</a></li>
                        <li><a href="https://google.com">Catalog</a></li>
                        <li><a href="https://google.com">Subscriptions</a></li>
                    </ul>
                </div>                
                <div className={styles.inner1}>
                    <h3>About Us</h3>
                    <ul>
                        <li><a href="https://google.com">Careers</a></li>
                        <li><a href="https://google.com">Corporate Information</a></li>                        
                        <li><a href="https://google.com">Digital Newsroom</a></li>                        
                        <li><a href="https://google.com">Home Depot Foundation</a></li>
                        <li><a href="https://google.com">Investor Relations</a></li>                        
                        <li><a href="https://google.com">Government Customers</a></li>
                        <li><a href="https://google.com">Suppliers & Providers</a></li>
                        <li><a href="https://google.com">Affiliate Program</a></li>
                        <li><a href="https://google.com">Eco Options</a></li>
                        <li><a href="https://google.com">Corporate Responsibility</a></li>
                        <li><a href="https://google.com">Home Depot Licensing Information</a></li>
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
            <div style={{width:'50%',justifyContent:'center',alignItems:'center',textAlign:'center'}}>
                <p style={{color:'gray',fontFamily:'sans-serif',fontSize:'12px'}}> © 2021 Home Depot Pakistan Authority, LLC. All Rights Reserved. Use of this site is subject LLC. All Rights Reserved. Use of this site is subject LLC. All Rights Reserved. Use of this site is subject LLC. All Rights Reserved. Use of this site is subject LLC. All Rights Reserved. Use of this site is subject LLC. All Rights Reserved. Use of this site is subject LLC. All Rights Reserved. Use of this site is subject  </p>
            </div>
        </div>
    )
}
