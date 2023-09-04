import React from "react";
import SideBar from "../../components/sidebar/sidebar";
import NavBar from "../../components/navbar/Navbar";

function Home(){
    return(
        <div className="home">
        <SideBar/>
        <div className="homecontainer">
            <NavBar/>
        </div>
        </div>

    )
}


export default Home;