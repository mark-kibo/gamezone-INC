import { useParams } from "react-router-dom"
import Single from "../../components/singleproduct/Single"
import { singleProduct } from "../../data"
import "./product.scss"
import { useContext, useState } from "react"
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../context/AuthContext"

const Product = () => {

  //Fetch data and send to Single Component
  let params=useParams()
  const{authTokens}=useContext(AuthContext)
  console.log(params.id)
  // fetch data of this single product
  const { isLoading, data } = useQuery({
    queryKey: ["allproducts"],
    queryFn: () =>
      fetch(`http://localhost:8000/api/new/products/${params.id}/`,{
        headers:{
          "Authorization": "Bearer " + authTokens.access
        }
      }).then(
        (res) => res.json()
      ),
  });
  return (
    <div className="product">
      {isLoading ? ("...loading") : (<Single {...data}/>) }
       
    </div>
  )
}

export default Product