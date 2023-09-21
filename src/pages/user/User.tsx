import Single from "../../components/singleuser/Single"
import { singleUser } from "../../data"
import "./user.scss"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";


const User = () => {

  let params=useParams()
  let {authTokens}= useContext(AuthContext)
  console.log(params.id)
  // fetch data of this single product
  const { isLoading, data } = useQuery({
    queryKey: ["allusers"],
    queryFn: () =>
      fetch(`http://localhost:8000/api/accounts/users/${params.id}/`,{
        headers:{
          "Authorization": "Bearer " + authTokens.access
        }
      }).then(
        (res) => res.json()
      ),
  });
  
  return (
    <div className="user">
      {isLoading ? ("...loading") : (<Single {...data}/>) }
    </div>
  )
}

export default User