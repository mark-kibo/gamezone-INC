import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import { useContext, useState } from "react";
import Add from "../../components/add/Add";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../context/AuthContext";



const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "img",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "username",
    type: "text",
    headerName: "username",
    width: 150,
  },
  {
    field: "email",
    type: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "password",
    type: "password",
    headerName: "password",
    width: 200,
  }
];

const Users = () => {
  const [open, setOpen] = useState(false);
  const{authTokens}= useContext(AuthContext)
  console.log(authTokens)
  // TEST THE API

  const { isLoading, data } = useQuery({
    queryKey: ["allusers"],
    queryFn: () =>
      fetch("http://localhost:8000/api/accounts/users/", {
        headers:{
          "Authorization": "Bearer " + authTokens.access
        }
      }).then(
        (res) => res.json()
      ),
  });

  return (
    <div className="users">
      <div className="info">
        <h1>Users</h1>
        <button onClick={() => setOpen(true)}>Add New User</button>
      </div>
     
      {/* TEST THE API */}

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="users" columns={columns} rows={data} />
      )}
      {open && <Add slug="users" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
