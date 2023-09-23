import React, { useContext, useEffect, useState } from 'react'
import { useCart } from 'react-use-cart'
import AddIcon from '@mui/icons-material/Add';
import "./cart.scss"
import AuthContext from '../../context/AuthContext';
const Cart = () => {
    
    const[checkOut, setCheckOut]=useState(false)
    let [error, setError] = useState([])
    let[loading, setLoading]= useState(false)
    const{authTokens}=useContext(AuthContext)
    const { 
        isEmpty,
        items,
        cartTotal,
        totalItems,
        updateItemQuantity,
        removeItem,
        emptyCart
     } = useCart()
    
    // useEffect(()=>{
    //    items.map(item=>{
    //     console.log(item)
    //     postData({
    //         id:item.id,
    //         sale_price: item.itemTotal,
    //         quantity_sold:item.quantity
    //     }).then(data=>{
    //         console.log(data)
    //         if(data.id){
    //             removeItem(data.Id)
    //         }else{
    //             setError(...error, data)
    //             // console.log(data)
    //         }

    //     })
    //    })
    // },[checkOut, items] )
    function handlePost() {
        // Create an array to hold error messages
        let errors = new Array();
    
        // Iterate through cart items
        items.forEach(async (item) => {
            // Create the sales data for the item
            const salesData = {
                id: item.id,
                sale_price: item.itemTotal,
                quantity_sold: item.quantity,
            };
            console.log(salesData)
            setLoading(true);
            // Call postData function for the item
            const data = await postData(salesData);
            console.log(data)
            // Check if the response has a 'message' key
            if (data['MESSAGE'] || data.error) {
                console.log(data)
                setLoading(false)
                setError(data.error)
                data['MESSAGE']? removeItem(item.id) : ""
                // If 'message' exists, add it to the errors array
            } 
                
               
        });
        console.log(errors)
    
        // Check if there are errors
        if (errors.length > 0) {
            // Display the errors to the frontend
            setError(errors);
        }
    }
    

    const postData=async (salesdata)=>{
        let response=await fetch(`http://127.0.0.1:8000/api/new/sales/`, {
            method:"POST",
            headers:{
                "Authorization": "Bearer " + authTokens.access,
                "Content-Type": "application/json"
            },
            body:JSON.stringify(salesdata)
        })

        let data= await response.json()

        return data

    }


    console.log(error)
    return (
        <div className='cart'>
            {error}
           <div className="shopping-cart">
                    <div className="title" style={{padding: "5px", marginLeft:"10px"}}>
                        Stock sale
                        <button onClick={()=>(emptyCart())} style={{padding:"10px", marginLeft:"5px" , background:"red"}}>Empty cart</button>
                    </div>
                    {!isEmpty && items.map(item=>(
                            <div className="item">
                            <div className="buttons">
                            <span className="delete-btn" onClick={()=>removeItem(item.id)} style={{color: "red"}}>
                                X
                            </span>
                            <span className="like-btn"></span>
                            </div>
                        
                        
                            <div className="description">
                            <span>{item.name}</span>
                            <span>{item.category}</span>
                            <span>White</span>
                            </div>
                        
                            <div className="quantity">
                            <button className="plus-btn" type="button" name="button"  onClick={()=>
                                updateItemQuantity(item.id, item.quantity + 1)}>
                               +
                            </button>
                            <input type="text" name="name" value={item.quantity}/>
                            <button className="minus-btn" type="button" name="button" onClick={()=>updateItemQuantity(item.id, item.quantity - 1)}>
                                -
                            </button>
                            </div>
                        </div>
                    ))}
                    
                    <div className='totalprice'> 
                    <span>Total : {cartTotal}</span>
                    {cartTotal === 0 ?(<button disabled>Checkout</button>): (<button onClick={()=>{
                        setCheckOut(true)
                        handlePost()
                    }}>{loading ? "making sale ....." : "checkout"}</button>) } 
                    </div>
                    </div>
                </div>
    )
}

export default Cart