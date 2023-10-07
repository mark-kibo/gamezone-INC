import { useContext, useState } from "react";
import "./Products.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { products } from "../../data";
import { useQuery } from "@tanstack/react-query";
import AuthContext from "../../context/AuthContext";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    type: "text",
    headerName: "name",
    width: 250,
  },
  {
    field: "category",
    type: "text",
    headerName: "Category",
    width: 150,
  },
  {
    field: "description",
    type: "text",
    headerName: "Description",
    width: 250,
  },
  {
    field: "price",
    type: "number",
    headerName: "Price",
    width: 200,
  },
  {
    field: "quantity",
    headerName: "quantity",
    type: "number",
    width: 200,
  },
  
];

const Products = () => {
  const [open, setOpen] = useState(false);

  const{authTokens}=useContext(AuthContext)

  // TEST THE API

  const { isLoading, data } = useQuery({
    queryKey: ["allproducts"],
    queryFn: () =>
      fetch('https://gamezone-rest-api.onrender.com/api/new/products/',{
        method:"GET",
        headers:{
          "Authorization": "Bearer " + authTokens.access
        }
      }).then(
        (res) => res.json()
      ),
  });

  console.log(data)
  return (
    <div className="products">
      <div className="info">
        <h1>Stock</h1>
        <button onClick={() => setOpen(true)}>Add New Products</button>
      </div>
      {/* TEST THE API */}

      {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="products" columns={columns} rows={data} />
      )}
      {open && <Add slug="products" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Products;
