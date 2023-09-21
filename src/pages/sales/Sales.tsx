import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";

import { useContext, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../context/AuthContext";



const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
//   {
//     field: "img",
//     headerName: "Avatar",
//     width: 100,
//     renderCell: (params) => {
//       return <img src={params.row.img || "/noavatar.png"} alt="" />;
//     },
//   },
  {
    field: "product_name",
    type: "text",
    headerName: "Product Name",
    width: 150,
  },
  {
    field: "quantity_sold",
    type: "text",
    headerName: "Quantity Sold",
    width: 200,
  },
  {
    field: "sale_price",
    type: "number",
    headerName: "Price",
    width: 200,
  }
];

const Sales = () => {
  const{authTokens}= useContext(AuthContext)
  console.log(authTokens)
  // TEST THE API

  const { isLoading, data } = useQuery({
    queryKey: ["allusers"],
    queryFn: () =>
      fetch("http://localhost:8000/api/new/sales/list/", {
        method:"GET",
        headers:{
          "Authorization": "Bearer " + authTokens.access
        }
      }).then(
        (res) => res.json()
      )
  });

  console.log(data)

  return (
    <div className="sales">
      
     
      {/* TEST THE API */}

      {isLoading ? (
        "Loading..."
      ) : (data?
        <DataTable slug="sales" columns={columns} rows={data} />: "No sales made"
      )}
    </div>
  );
};

export default Sales;
