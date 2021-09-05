import React from 'react'
import footerStyle from '../styles/Footer.module.css'

export default function Footer() {
    return (
        <div className={footerStyle.content}>
            <hr className={footerStyle.hr}/>
            <h1>im footer</h1>
        </div>
    )
}
