import { Link } from "react-router-dom";
import "./Menu.scss";
import { menu } from "../../data";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const Menu = () => {
  let {user, logoutUser}=useContext(AuthContext)
  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link to={ listItem.title === "Profile" ? `/profile/${user.user_id}`:listItem.url} className="listItem" key={listItem.id}>
              <img src={listItem.icon} alt="" />
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
            
          
        </div>
      ))}

<div className="item" style={{
  padding:"10px",
  display:"flex",
  
}}>
<img src="/logout.svg" alt=""  width={'20px'} height={'20px'} onClick={()=>logoutUser()}/>
<span className="listItemTtitle">Logout</span>         
</div>
    </div>
  );
};

export default Menu;
