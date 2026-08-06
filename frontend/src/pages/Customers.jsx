import { useEffect, useState } from "react";
import API from "../api/api";


function Customers() {

  const [customers, setCustomers] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editId, setEditId] = useState(null);


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });



  const getCustomers = async () => {

    const response = await API.get("/customers");

    setCustomers(response.data);

  };



  useEffect(() => {

    getCustomers();

  }, []);




  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };




  const saveCustomer = async () => {

    try {


      if(editId){

        await API.put(
          `/customers/${editId}`,
          formData
        );

        alert("Customer updated successfully");


      }else{


        await API.post(
          "/customers",
          formData
        );

        alert("Customer added successfully");


      }



      setFormData({
        name:"",
        email:"",
        phone:"",
        address:""
      });


      setEditId(null);

      setShowForm(false);

      getCustomers();



    }catch(error){

      alert(
        error.response?.data?.message ||
        "Error"
      );

    }

  };





  const editCustomer = (customer) => {


    setEditId(customer.id);


    setFormData({

      name: customer.name,

      email: customer.email,

      phone: customer.phone,

      address: customer.address

    });


    setShowForm(true);


  };





  const deleteCustomer = async(id)=>{


    await API.delete(
      `/customers/${id}`
    );


    alert("Customer deleted");


    getCustomers();


  };





  return (

    <div className="container-fluid p-4">


      <div className="d-flex justify-content-between">


        <h2>
          Customer Management
        </h2>



        <button
          className="btn btn-primary"
          onClick={()=>setShowForm(true)}
        >
          + Add Customer
        </button>


      </div>





      {
        showForm &&

        <div className="card shadow mt-3 p-4">


          <h5>
            {
              editId
              ? "Edit Customer"
              : "Add Customer"
            }
          </h5>



          <input
          className="form-control mb-2"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          />



          <input
          className="form-control mb-2"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          />



          <input
          className="form-control mb-2"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          />



          <input
          className="form-control mb-2"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          />



          <button
          className="btn btn-success"
          onClick={saveCustomer}
          >
            Save
          </button>


        </div>

      }





      <div className="card shadow mt-4 p-3">


      <table className="table table-bordered">


      <thead className="table-primary">

      <tr>

      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Address</th>
      <th>Action</th>

      </tr>

      </thead>



      <tbody>


      {
        customers.map(customer=>(

          <tr key={customer.id}>

          <td>{customer.id}</td>

          <td>{customer.name}</td>

          <td>{customer.email}</td>

          <td>{customer.phone}</td>

          <td>{customer.address}</td>


          <td>


          <button
          className="btn btn-warning btn-sm me-2"
          onClick={()=>editCustomer(customer)}
          >
          Edit
          </button>



          <button
          className="btn btn-danger btn-sm"
          onClick={()=>deleteCustomer(customer.id)}
          >
          Delete
          </button>


          </td>


          </tr>

        ))
      }


      </tbody>


      </table>


      </div>


    </div>

  );

}


export default Customers;