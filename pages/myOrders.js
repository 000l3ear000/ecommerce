import React, {useEffect,useState} from 'react'
import cookies from 'js-cookies'
import { useRouter } from 'next/router'
import OrderTemp from '../components/OrderTemp';


function myOrders() {
    const [Data, setData] = useState("")
    const router=useRouter();
    
    useEffect(() => {
        if(cookies.getItem('jwt')){
            fetch("http://localhost:3000/api/verifyToken", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",                    
                    "token":cookies.getItem("jwt")
                },
            })
            .then(res=>res.json()).then(res=>setData(res))
        }
        else{
            router.push('/auth/login')
        }
    }, [])

    useEffect(() => { 
        
        if(Data.decoded){
            fetch("http://localhost:3000/api/fetchOrders", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",                    
                    "email": cookies.getItem("email"),
                    "id": cookies.getItem("id")
                },
            })
            .then(res=>res.json())
            .then(res=>{setData(res);console.log("This is the data fetched from the api:-", res )})
        }
        else if(Data.err){
            cookies.setItem("jwt", "");
            cookies.setItem("name", "");
            cookies.setItem("email", "");
            cookies.setItem("id", "");
            cookies.setItem("address", "");
            localStorage.clear();
            router.push("auth/login")
        }
    }, [Data])

    console.log(Data.data)
    return (
        <div c  lassName="skeleton" style={{display:"flex",flexDirection:"column",alignItems:'center',height:'100vh',overflow:'auto'}}> 
            
            {Data.data?.length>0?Data.data.map(element =>
                (<OrderTemp key={element._id} data={element}/>)
            ):<h1>No Orders Yet!</h1>}
        </div>
    )
}

export default myOrders
