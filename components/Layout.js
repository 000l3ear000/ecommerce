import { useState, useEffect } from 'react';
import Nav from "./Nav";
import Footer from "./Footer";
export default function Layout({children}) {
    
    
    const arr=["Login","signup","Error"]
    return (
        <>
            {arr.includes(children.type.name)?null : <Nav />}
                {children}
                {console.log(children.type.name)}
            {arr.includes(children.type.name)?null:<Footer/>}
        </>
    )
}
