import React, { useState } from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Dropdown from './Dropdown';
import styles from '../styles/Filter.module.css'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
function Filter({ passFilters, passCategories, passBrands, passPriceRange }) {

    const [min, setmin] = useState("")
    const [max, setmax] = useState("")
    const [err, seterr] = useState("")


    const hello=(e)=>{
        if(e.target.value=='min'){
            passPriceRange('lowtohigh');
            console.log('minnnn')
        }
        else if(e.target.value=='max'){
            passPriceRange('hightolow')
            console.log('maxxx')

        }
        else{
            passPriceRange('TopRated')
            console.log('normal')

        }
    }

    const setPrice=()=>{
        console.log("pressed")
        if(parseInt(max) <= parseInt(min)){
            seterr('Max value cannnot be smaller than min value')
            console.log("err")
            setmax("")
            setmin("")
        }
        else{
            seterr("")
            console.log("query is right")
            passFilters("Price Range", [min,max])
        }
    }

    return (
        <div>
            <Dropdown name="Category" passFilters={passFilters} array={passCategories} />
            <Dropdown name="Manufacturer" passFilters={passFilters} array={passBrands} />
            <div className={styles.root}>
                <input value={min} onChange={(e)=>setmin(e.target.value)} placeholder="min" type="number"></input>
                :
                <input value={max} onChange={e=>setmax(e.target.value)} placeholder="max" type="number"></input>
                <button onClick={setPrice} disabled={!min || !max}><PlayArrowIcon /></button>
            </div>
            <div>
                {err}
            </div>

            <select defaultValue="TopRated" onChange={hello}>
                <option  value="TopRated">Top Rated</option>
                <option value="min">Low to High</option>
                <option value="max">High to Low</option>
            </select>

        </div>
    )
}

export default Filter
