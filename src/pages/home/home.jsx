import { useContext, useEffect, useState } from "react";
import BarChartBox from "../../components/barChartBox/BarChartBox.jsx";
import BigChartBox from "../../components/bigChartBox/BigChartBox.jsx";
 // Fix the extension to .jsx
 // Fix the extension to .jsx
import TopBox from "../../components/topBox/TopBox.jsx";
import AuthContext from "../../context/AuthContext.jsx";
import { barChartBoxRevenue, barChartBoxVisit, chartBoxConversion, chartBoxExpense } from "../../data.js";
import "./home.scss";
import ChartBox from "../../components/chartBox/ChartBox copy.jsx";
import PieChartBox from "../../components/pieCartBox/pieChartBox copy.jsx";

const Home = () => {
  const { authTokens }= useContext(AuthContext)
  let [overview, setOverview]=useState([])
  // console.log(data)
  useEffect(()=>{
      console.log("me")
      fetch("https://gamezone-rest-api.onrender.com/api/auth/overview/", {
        method:"GET",
        headers:{
            "Authorization": "Bearer " + authTokens.access
        }
    })
      .then(res=>res.json())
      .then(data=>setOverview(data))
  }, [])
  console.log(overview)
  return (
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      <div className="box box2">
        <ChartBox {...chartBoxUser} totalusers={overview.totalusers}  />
      </div>
      <div className="box box3">
        <ChartBox {...chartBoxProduct}   totalproducts={overview.total_products} />
      </div>
      <div className="box box4">
        <PieChartBox />
      </div>
      <div className="box box5">
        <ChartBox {...chartBoxConversion}  total_profit={overview.profit} />
      </div>
      <div className="box box5">
        <ChartBox {...chartBoxLoss}  total_loss={overview.total_loss} />
      </div>
      <div className="box box6">
        <ChartBox {...chartBoxRevenue}  totalusers={overview.totalusers} totalproducts={overview.total_products} total_revenue={overview.total_revenue}/>
      </div>
      <div className="box box6">
        <ChartBox {...chartBoxExpense}  totalexpenses={overview.total_expense}/>
      </div>
      <div className="box box7">
        <BigChartBox />
      </div>
      <div className="box box8">
        <BarChartBox {...barChartBoxVisit} />
      </div>
      <div className="box box9">
        <BarChartBox {...barChartBoxRevenue} />
      </div>
    </div>
  );
};

export default Home;
