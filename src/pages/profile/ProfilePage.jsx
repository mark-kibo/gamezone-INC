import "./user.scss"
import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import Profile from "../../components/profile/Profile";


const ProfilePage = () => {

  let params=useParams()
  
  // fetch data of this single product
  const { isLoading, data } = useQuery({
    queryKey: ["allusers"],
    queryFn: () =>
      fetch(`https://gamezone-rest-api.onrender.com/api/accounts/profile/${params.id}/`).then(
        (res) => res.json()
      ),
  });
  
  return (
    <div className="user">
      {isLoading ? ("...loading") : (<Profile {...data}/>) }
    </div>
  )
}

export default ProfilePage