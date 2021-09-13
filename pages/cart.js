import CartList from "../components/CartList";
import {useState,useEffect} from 'react';
import Address from "../components/Address";
import { StylesProvider } from "@material-ui/core";
import styles from '../styles/Cart.module.css';


function cart() {

    const [sub, setsub] = useState(0);
    const [toggle,settoggle]=useState(0);

    return (
        <div className={styles.main}>
            <CartList fun={setsub} toggle={toggle} settoggle={settoggle} />
            <Address toggle={toggle} value={sub}/>
        </div>
    )
}

export default cart
