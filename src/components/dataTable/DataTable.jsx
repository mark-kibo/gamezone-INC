import {
  DataGrid,
  GridToolbar,
} from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from "react-use-cart"


const DataTable = (props) => {

  const { addItem } = useCart()
  const [Loading, setLoading] = useState(false)


  // TEST THE API
  let urlEndpoint="";
  const{authTokens}= useContext(AuthContext)
  
  
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id, urlEndpoint) => {
      setLoading(true)
      if(props.slug === "users"){
        urlEndpoint=`https://gamezone-rest-api.onrender.com/api/accounts/${props.slug}/${id}/remove/`
      }else if( props.slug === "products"){
        urlEndpoint=`https://gamezone-rest-api.onrender.com/api/new/${props.slug}/${id}/`
      }
      return fetch(urlEndpoint, {
        method: "delete",
        headers:{
          "Authorization": "Bearer " + authTokens.access
        }
      });
    },
    onSuccess: ()=>{
      setLoading(false)
      queryClient.invalidateQueries([`all${props.slug}`]);
    }
  });

  const handleDelete = (id) => {
    //delete the item
    mutation.mutate(id, urlEndpoint)
  };


  const actionColumn = {
    field: "actions",
    headerName: "Actions",
    width: 200,
    renderCell: (params) => {
      console.log(params.row.id)
      return (
        props.slug !== "expenses" ? (
          <div className="action">
            <Link to={`/${props.slug}/${params.row.id}`}>
              <img src="/view.svg" alt="" />
            </Link>
            {props.slug === "sales" ? "" : (
              <div className="delete" onClick={() => handleDelete(params.row.id)}>
                <img src="/delete.svg" alt="" />
              </div>
            )}
            {props.slug === "products" && (
              <div className="addcart" onClick={() => addItem(params.row)}>
                <ShoppingCartIcon className="icon" />
              </div>
            )}
          </div>
        ) : null
      );
    },
  };

  return (
    <div className="dataTable">
      {Loading && "deleting..."}
      
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={[...props.columns, actionColumn]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        
      />
    </div>
  );
};

export default DataTable;
