import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Single = (props) => {
  const [formData, setFormData]= useState({})
  const [loading, setLoading]= useState(false)
  const{authTokens}=useContext(AuthContext)
  const navigate = useNavigate()

  async function handleSubmit(e){
    
    e.preventDefault()
    setLoading(true)
    const res = await axios.patch(`http://127.0.0.1:8000/api/new/products/${props.id}/` , {formData}, {
      headers:{
        "Authorization":"Bearer " + authTokens.access
      }
    })

    if (res.status == 200){
        navigate("/products")
    }
    setLoading(false)
  }

  function handleChange(e){
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  return (

    <div className="flex justify-center items-center w-1/2">
      <div className="form-control w-[200px] bg-red-200">
        <form method="POST" onSubmit={handleSubmit}>
        <div>
          <label className="label">
            <span className="label-text text-right text-blue-400">Product name</span>
          </label>
          <input type="text" placeholder="Type here" className="input input-bordered w-1/2" defaultValue={props.name} onChange={handleChange} />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Product category</span>

          </label>
          <select className="select select-accent w-full max-w-xs" name="category" defaultValue={props.category} onChange={handleChange}>
           
            <option value="Laptops">Laptops</option>
            <option value="Desktops">Desktops</option>
            <option value="Hardware">Hardware Components</option>
            <option value="Accessories">Accessories</option>
            <option value="Software">Software</option>
            <option value="Peripherals">Peripherals</option>
            <option value="Networking">Networking Devices</option>
            <option value="Storage">Storage Devices</option>
            <option value="Audio">Audio Devices (e.g., Earphones)</option>
            <option value="Chargers">Chargers</option>
          </select>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Product description</span>

          </label>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" defaultValue={props.description} onChange={handleChange} />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Product price</span>

          </label>
          <input type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" defaultValue={props.price} onChange={handleChange}/>
        </div>
        <div>
          <label className="label">
            <span className="label-text">Product Quantity</span>

          </label>
          <input type="number" placeholder="Type here" className="input input-bordered w-full max-w-xs" defaultValue={props.quantity} onChange={handleChange} />
        </div>

        <div className="flex justify-center items-center">
        <button className="btn btn-success" type="submit">{loading ? "updating ...": "Update product"}</button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Single;
