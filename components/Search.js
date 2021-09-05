import React, { useEffect, useState } from 'react'
import Input from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { IconButton, Badge } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";



const SearchBar = () => {
  
  const [myOptions, setMyOptions] = useState(["hala","madrid"])
  const [text, settext] = useState("")


  
    useEffect(() => {
      const arr=[]
      console.log("Options Fetched from API")
      fetch(`http://localhost:3000/api/searchResult?name=`)
      .then((response) => {
          return response.json()
        }).then((res) => {
        res.forEach(element => {
            arr.push(element.name)})
      });
        console.log(arr)
        setMyOptions(arr)
    }, [])

    
    const search = (e) => {
      if(typeof window!=='undefined'){ 
        e.preventDefault()
        console.log(text)
        console.log("I was clicked")
        window.location.href=`http://localhost:3000/searchFinal?pro=${text}`;
      }
      else{
        console.log("not yet")
      }
    }



  const getDataFromAPI = (e) => {
      settext(e.target.value.trim());
    }
  
  const selected=(e,value)=>{
    console.log(e,value)
    settext(value)
  }


  // const ext=(e)=>{
  //   console.log(e.target.value)
  //   console.log(e.target.value.trim())
  //   setText(e.target.value.trim())
  // }


  let ref=""
  return (
    <div id="hi" style={{maxWidth:'800px' ,width:'100%'}}>
        <Autocomplete
            onChange={selected}
            style={{ width: '100%' }}
            freeSolo
            autoComplete
            autoHighlight
            options={myOptions}
            renderInput={(params) => (
              <form id="hello" style={{display:'flex',border:"1px solid gray",padding:'5px',borderRadius:"5px",width:'100%',justifyContent:'space-evenly'}}>                 
                    <Input 
                        {...params}
                        value={text}
                        style={{width:'90%'}}
                        id='hell'
                        placeholder="Search here"
                        onChange={getDataFromAPI}
                    />
                    <Input disabled={!text} value="Search" data-value="#hello" type="submit" onKeyDown={search} onClick={search} title="Search"/>
                </form>
            )}
      />
    </div>
  );
}
  
export default SearchBar