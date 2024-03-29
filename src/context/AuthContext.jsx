import { createContext, useState, useEffect} from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";


const AuthContext=createContext()



export default AuthContext;


export const AuthProvider=({children})=>{

    // ask for token from local storage
    let navigate=useNavigate()
    let[overview, setOverview]= useState()
    // store my jwt token and user
    let [authTokens, setAuthTokens] = useState(() => {
        const storedTokens = localStorage.getItem("authtokens");
        return storedTokens ? JSON.parse(storedTokens) : null;
      });
      
      let [user, setUser] = useState(() => {
        const storedTokens = localStorage.getItem("authtokens");
        return storedTokens ? jwt_decode(storedTokens) : null;
      })
    let [loading, setLoading]=useState(true)

    // useeffct function tto get
    useEffect(()=>{
        navigate("/")
    }, [user, authTokens])

    // handle login 
    let loginUser=async(e)=>{
        // prevent default for submit
        e.preventDefault()
        // create my response
        // live=https://gamezone-rest-api.onrender.com/
        let response=await fetch("https://gamezone-rest-api.onrender.com/api/auth/token/", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({"username": e.target.name.value, "password":e.target.password.value})
        })

        // get our data
        let data=await response.json()
        // check respose
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem("authtokens", JSON.stringify(data))
            setLoading(false)
        }
        return data

    }

    // LOGOUT OUR USER
    let logoutUser=()=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authtokens")
    }

    // UPDATE OUR ACCESS TOKEN FROM REFRESH
    let updateToken=async()=>{
        let response=await fetch("https://gamezone-rest-api.onrender.com/api/auth/token/refresh/", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({"refresh": authTokens?.refresh})
        })

        // get our new token
        let data= await response.json()
          // check respose
        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem("authtokens", JSON.stringify(data))
        }else{
            logoutUser()
        }

        if(loading){
            setLoading(false)
        }


    }

    // useeffect to update token to keep user logged in 
    useEffect(()=>{
        if(loading){
            updateToken()
        }
        let fourminutes = 1000 * 60 *4
        let intervalId=setInterval(()=>{
            if(authTokens){
                updateToken()
            }
        }, fourminutes)
        return ()=>{clearInterval(intervalId)}
    }, [authTokens, loading])

    function getOverview(){
        fetch("https://gamezone-rest-api.onrender.com/api/auth/overview/", {
            method:"GET",
            headers:{
                "Authorization": "Bearer " + authTokens.access
            }
        })
          .then(res=>res.json())
          .then(data=>{
                return data
        })
          .catch()
    }
 

    let contextData={
        authTokens:authTokens,
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser,
        loading:loading
    }

    return(
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
