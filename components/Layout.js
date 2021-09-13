import { useState, useEffect } from 'react';
import Nav from "./Nav";
import Footer from "./Footer";
import { StoreProvider,createStore, action } from 'easy-peasy';

export default function Layout({children}) {

    const store = createStore({
        toggle: 0,
        settoggle:action((state)=>{
            state.toggle=!state.toggle
        })
      });
    
    
    const arr=["Login","signup","Error"]
    return (
        <>
        <StoreProvider store={store}>
            {arr.includes(children.type.name)?null : <Nav />}
                {children}
                {console.log(children.type.name)}
            {arr.includes(children.type.name)?null:<Footer/>}
        </StoreProvider>
        </>
    )
}
