import {
  DataGrid,
  GridColDef,
  GridToolbar,
} from "@mui/x-data-grid";
import "./dataTable.scss";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient, refetchQueries } from "@tanstack/react-query";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from "react-use-cart"
type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
};

const DataTable = (props: Props) => {

  const { addItem } = useCart()
  const [Loading, setLoading] = useState(false)


  // TEST THE API
  let urlEndpoint="";
  const{authTokens}= useContext(AuthContext)
  
  
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (id: number, urlEndpoint: string) => {
      setLoading(true)
      if(props.slug === "users"){
        urlEndpoint=`http://localhost:8000/api/accounts/${props.slug}/${id}/remove/`
      }else if( props.slug === "products"){
        urlEndpoint=`http://localhost:8000/api/new/${props.slug}/${id}/`
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

  const handleDelete = (id: number) => {
    //delete the item
    mutation.mutate(id, urlEndpoint)
  };


  const actionColumn: GridColDef = {
    field: "actions",
    headerName: "Actions",
    width: 200,
    renderCell: (params) => {
      console.log(params.row.id)
      return (
        <div className="action">
          <Link to={`/${props.slug}/${params.row.id}`}>
            <img src="/view.svg" alt="" />
          </Link>
          {props.slug === "sales" ? "" :  (<div className="delete" onClick={() => handleDelete(params.row.id)}>
            <img src="/delete.svg" alt="" />
          </div>) }
         
         {props.slug === "products" && (<div className="addcart" onClick={() => addItem(params.row)}>
            <ShoppingCartIcon className="icon"/>
          </div>)}
        </div>
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
