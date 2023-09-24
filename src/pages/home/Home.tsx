import { useContext, useEffect, useState } from "react";
import BarChartBox from "../../components/barChartBox/BarChartBox.tsx";
import BigChartBox from "../../components/bigChartBox/BigChartBox.tsx";
import ChartBox from "../../components/chartBox/ChartBox.tsx";
import PieChartBox from "../../components/pieCartBox/PieChartBox.tsx";
import TopBox from "../../components/topBox/TopBox.tsx";
import AuthContext from "../../context/AuthContext";
import OverviewContext from "../../context/OverViewContext";
import {
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxLoss,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser,
} from "../../data";
import "./home.scss";
;

const Home = () => {
  const { authTokens }= useContext(AuthContext)
  let [overview, setOverview]=useState([])
  // console.log(data)
  useEffect(()=>{
      console.log("me")
      fetch("http://127.0.0.1:8000/api/auth/overview/", {
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
