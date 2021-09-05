import Image from "next/image"
import Link from "next/link";
import cookie from 'js-cookies'
import {useState,useEffect} from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ReorderIcon from '@material-ui/icons/Reorder';


import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import { Search, ShoppingCart } from '@material-ui/icons'
import SearchBar from "./Search";
import Profile from './Profile/Profile';


function Nav() {
    const [basket, setbasket] = useState(0)
    const [cookie1, setcookie] = useState("")
    const [toggle, settoggle] = useState(true)

    useEffect(()=>{
        setcookie(cookie.getItem("jwt"))
    },[])
    
    setInterval(() => {
        settoggle(!toggle)
    }, 1500);


    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("cartItems"));
        if(data){
            setbasket(data.length)
        }
    }, [toggle])


    return (
        <>
    <div id="container">
        <div id="top-orange">
            <a href="https://google.com">FREE DELIVERY Over one million items eligible.</a>
        </div>   
        <div id="greater-div">
            <div id="second-div">
                <div id="second-inner">
                    <a href="#">Store Finder</a>
                    <a href="#">Truck & Tool Rental</a>
                    <a href="#">For The Pro</a>
                    <a href="#">Gift Cards</a>
                    <a href="#">Credit Services</a>
                    <a href="#">Track Orders</a>
                    <a href="#">Help</a>
                </div>
            </div>
            <div id="third-div">
                <Link href="/">
                    <a  id="third-logo">
                        <Image src="/1.jpg" alt="img" width="108" height="108"/>
                    </a>
                </Link>
                <div id='third-search'>
                    <SearchBar/>
                    {/* <input placeholder="Search" type="text"></input>
                    <button><i className="fas fa-search"></i></button> */}
                </div>
                <div id='third-account'>
                    {cookie1? <Profile />:
                    <Link href="/auth/signup">
                        <span className="item">
                            {  
                                <>
                                    <h3>Accounts</h3>
                                    <AccountCircleIcon/>
                                </>
                            }
                        </span>
                    </Link>
                    }
                    <Link href="/list">
                        <span className="item">
                                <h3>List</h3>
                                <ReorderIcon />
                        </span>
                    </Link>
                    <Link href="cart">
                        <span className="item">
                                <h3>Cart</h3>
                                <IconButton aria-label="Show cart items" color="inherit">
                                    <Badge className="icon" badgeContent={ basket } color="secondary">
                                        <ShoppingCart />
                                    </Badge>
                                </IconButton>                            
                        </span>
                    </Link>                   
                </div>
            </div>
            <div className="div-forth">
                    <a href="#">All Departments 
                        <div id="invisible-div">

                        </div>
                    </a>
                    <a href="#">Home Decor,Furniture & Kitchenware
                        <div id="invisible-div">

                        </div>
                    </a>
                    <a href="#">Diy Project & Ideas
                        <div id="invisible-div">
                        
                        </div>
                    </a>
                    <a href="#">Project Calculators
                        <div id="invisible-div">

                        </div>
                    </a>
                    <a href="#">Installation & Services
                        <div id="invisible-div"></div>
                    </a>
                    <a href="#">Speacial & Offers
                        <div id="invisible-div"></div>
                    </a>
                    <a href="#">Local Ad & Catalog
                        <div id="invisible-div"></div>
                    </a>
            </div>

        </div>
    </div>
        </>
    )
}

export default Nav;



// <button onClick={()=>cookie.setItem("jwt","")}>logout</button>