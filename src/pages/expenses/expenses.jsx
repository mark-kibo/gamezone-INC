
import DataTable from "../../components/dataTable/DataTable";
import "./expenses.scss";
import { useContext, useState } from "react";
import Add from "../../components/add/Add";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../context/AuthContext";



const columns= [
  { field: "id", headerName: "ID", width: 90 },
 
  {
    field: "name",
    type: "text",
    headerName: "name",
    width: 150,
  },
  {
    field: "amount",
    type: "number",
    headerName: "amount",
    width: 200,
  },
];

const Expenses = () => {
  const [open, setOpen] = useState(false);
  const{authTokens}= useContext(AuthContext)
  
  // TEST THE API

  const { isLoading, data } = useQuery({
    queryKey: ["allexpenses"],
    queryFn: () =>
      fetch("https://gamezone-rest-api.onrender.com/api/expenses/", {
        method:"GET",
        headers:{
          "Authorization": "Bearer " + authTokens.access
        }
      }).then(
        (res) => res.json()
      ),
  });
  

  return (
    <div className="expenses">
      <div className="info">
        <h1>Expenses</h1>
        <button onClick={() => setOpen(true)}>Add expenses</button>
      </div>
     
      {/* TEST THE API */}

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="expenses" columns={columns} rows={data} />
      )}
      {open && <Add slug="expenses" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Expenses;
