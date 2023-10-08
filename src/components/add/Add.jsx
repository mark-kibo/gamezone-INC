
import "./add.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";



const Add = (props) => {
  const [Loading ,setLoading]=useState(false)

  // TEST THE API

  const queryClient = useQueryClient();
  const {authTokens} = useContext(AuthContext)
  const [error, setError] = useState(null);
  let formData={}

  let urlPoint;
  
  if(props.slug === "users"){
      urlPoint="accounts"
  }else if(props.slug === "products"){
      urlPoint = "new"
  }else{
    urlPoint = "expenses"
  }

  const mutation = useMutation({
    mutationFn: () => {
      setLoading(true)
      return props.slug !== "expenses" ? (fetch(`https://gamezone-rest-api.onrender.com/api/${urlPoint}/${props.slug !== "expenses" ? props.slug : ""  }/`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + authTokens.access
        },
        body: JSON.stringify(formData),
      })):(
        fetch(`https://gamezone-rest-api.onrender.com/api/${urlPoint}/`, {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + authTokens.access
        },
        body: JSON.stringify(formData),
      })
      )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      });
    },
    onError: (e) => {
      setLoading(false)
      setError(e)
      console.error("API request error:", e);
      // Handle the error here, you can show a message to the user or perform any other necessary actions.
    },
    onSuccess: () => {
      // Handle the success response here
      console.log(props.slug)
      setLoading(false)
      queryClient.invalidateQueries([`all${props.slug}`]);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null)
    e.target.querySelectorAll('input').forEach(tag=>{
      formData[tag.name]= tag.value
    })
    console.log(formData)
    try {
      const response = await mutation.mutateAsync();
      props.setOpen(false)
      // Handle success if needed
    } catch (error) {
      setError(error.message); // Set the error message from the API response
    }
   
  };
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
        {Loading && "submitting.."}
        <h1>Add new {props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {props.columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column) => (
              <div className="item" key={column.field}>
                <label>{column.headerName}</label>
                <input type={column.type} placeholder={column.field} name={column.field} required/>
                {error && props.slug === "users"? "user exists or bad request" : ""}
                {error && props.slug === "products"? "product exists or bad request" : ""}
              </div>
            ))}
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Add;
