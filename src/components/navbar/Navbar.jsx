import { useContext } from "react";
import "./navbar.scss";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";

const Navbar = () => {

  const{user, logoutUser}=useContext(AuthContext)
  const { totalItems } = useCart()
  console.log(user)
  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="" />
        <span>GAMEZONE INC</span>
        
      </div>
      <div className="icons">
        <img src="/app.svg" alt="" className="icon" />
        <img src="/expand.svg" alt="" className="icon" />
        <Link to="/cart" style={{
          padding:"10px"
        }}>
         <div className="notification">
          <img src="/product.svg" alt="" />
          <span style={{backgroundColor: "green"}}>{totalItems}</span>
        </div>
        </Link>


        <div className="notification">
          <img src="/notifications.svg" alt="" />
          <span>1</span>
        </div>
        <div className="user">
          <img
            src="https://images.pexels.com/photos/11038549/pexels-photo-11038549.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
            alt=""
          />
          <span>{user.username}</span>
        </div>
        <img src="/logout.svg" alt="" className="icon" onClick={()=>logoutUser()} />
      </div>
    </div>
  );
};

export default Navbar;
