import React,{useState,useEffect} from 'react'
import styles from '../styles/Dropdown.module.css'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

function Dropdown({ name, array, passFilters }) {

    const [toggle, settoggle] = useState(true)
    const [query, setquery] = useState([])
    const [toggle1, settoggle1] = useState(true)

    const togg = () => {
        settoggle(!toggle)
    }
    const search = (e) => {
        const data=e.target.value
        if(e.target.checked){
            setquery([...query,data])   
        }
        else{
            const index = query.indexOf(data);
            const qu=query;
            qu.splice(index, 1);
            console.log("UNCHECKED")
            setquery(qu);
            settoggle1(!toggle1)
        } 
    }

    useEffect(() => {
        console.log("Queryy>>",query,name)
        passFilters(name, query)
    }, [query,toggle1])

    return (
        <>
        <div onClick={togg} className={styles.root}>
            <p>{name}</p>
            {toggle?<ArrowDropDownIcon/>:<ArrowDropUpIcon/>}
        </div>
            <div className={toggle?styles.radio:styles.radio_none}>
                {array.map((e)=>
                (<div className={styles.perRadio} key={e}><input onClick={search} value={e} type="checkbox"/><span>{e}</span></div>)
                )}
                {/* checkbox functionality */}
            </div>
        </>
    )
}

export default Dropdown
