import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./single.scss";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";


type Props = {
  id: number;
  country: string;
  location: string;
  image?:string;
};

const Profile = (props: Props) => {
  let{user} = useContext(AuthContext)
  return (
    <div className="single">
      <div className="view">
        <div className="info">
          <div className="topInfo">
            <img src={props.image} alt="" />
            <h1>{user.username}</h1>
            <button>Update</button>
          </div>
          <div className="details">
              <div className="item">
                <span className="itemTitle"> Country: {props.country}</span>
                <span className="itemValue"> Location {props.location}</span>
              </div>
          </div>
        </div>
        <hr />
          {/* <div className="chart">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={props.chart.data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                {props.chart.dataKeys.map((dataKey) => (
                  <Line
                    type="monotone"
                    dataKey={dataKey.name}
                    stroke={dataKey.color}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div> */}
      </div>
      {/* <div className="activities">
        <h2>Latest Activities</h2>
        {props.activities && (
          <ul>
            {props.activities.map((activity) => (
              <li key={activity.text}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
};

export default Profile;
