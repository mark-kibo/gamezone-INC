import { useContext, useState } from "react";
import "./loss.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";

import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../context/AuthContext";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "loss_name",
    type: "text",
    headerName: "Name",
    width: 250,
  },
  {
    field: "loss_amount",
    type: "text",
    headerName: "Amount",
    width: 150,
  },
  {
    field: "loss_description",
    type: "text",
    headerName: "Description",
    width: 250,
  },
  {
    field: "loss_to_product",
    type: "text",
    headerName: "Product Associated",
    width: 250,
  },
];

const Products = () => {
  const [open, setOpen] = useState(false);

  const{authTokens}=useContext(AuthContext)

  // TEST THE API

  const { isLoading, data } = useQuery({
    queryKey: ["allproducts"],
    queryFn: () =>
      fetch('https://gamezone-rest-api.onrender.com/api/new/loss/',{
        method:"GET",
        headers:{
          "Authorization": "Bearer " + authTokens.access
        }
      }).then(
        (res) => res.json()
      ),
  });

  
  return (
    <div className="loss">
      <div className="info">
        <h1>Loss</h1>
        <button onClick={() => setOpen(true)}>Add loss</button>
      </div>
      {/* TEST THE API */}

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="loss" columns={columns} rows={data} />
      )}
      {open && <Add slug="loss" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Products;
