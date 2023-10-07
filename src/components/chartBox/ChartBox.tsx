import { Link } from "react-router-dom";
import "./chartBox.scss";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
  color: string;
  icon: string;
  title: string;
  dataKey: string;
  number: number | string;
  percentage: number;
  chartData: object[];
  totalusers:number;
  totalproducts:number;
  total_revenue:number;
  total_profit:number;
  total_loss:number;
  total_expenses:number;
};

const ChartBox = (props: Props) => {
  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title">
          <img src={props.icon} alt="" />
          <span>{props.title}</span>
        </div>
        <h1>{props.title === "Total Users" ? props.totalusers :""}
            {props.title === "Total Products" ? props.totalproducts :""}
            {props.title === "Total Revenue" ? props.total_revenue :""}
            {props.title === "Profit Earned" ? props.total_profit :""}
            {props.title === "Total Loss incurred" ? props.total_loss :""}
            {props.title === "Total Expenses" ? props.totalexpenses :""}
            
        </h1>
        { props.title === "Profit Earned" || props.title === "Total Revenue" ? ("") : ( <Link to={props.title === "Total Users" ? "users" : props.title === "Total Expenses" ? "expenses" : "products"} style={{ color: props.color }}>
        View all
        </Link>) }
       
      </div>
      <div className="chartInfo">
        <div className="chart">
          <ResponsiveContainer width="99%" height="100%">
            <LineChart data={props.chartData}>
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 10, y: 70 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke={props.color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="texts">
          <span
            className="percentage"
            style={{ color: props.percentage < 0 ? "tomato" : "limegreen" }}
          >
            {props.percentage}%
          </span>
          <span className="duration">this month</span>
        </div>
      </div>
    </div>
  );
};

export default ChartBox;
