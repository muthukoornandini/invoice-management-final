import { useState } from "react";
import API from "../api/api";


function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
        "/auth/register",
        formData
      );


      alert(response.data.message);


      setTimeout(() => {
        window.location.href = "/";
      }, 1000);


    } catch (error) {

      console.log(
        "BACKEND ERROR:",
        error.response?.data
      );


      alert(
        error.response?.data?.message ||
        "Registration failed"
      );

    }

  };


  return (

    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">

      <div className="card shadow p-5" style={{width:"400px"}}>

        <h2 className="text-center text-primary mb-4">
          Create Account
        </h2>


        <form onSubmit={handleRegister}>


          <input
            type="text"
            name="name"
            className="form-control mb-3"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />


          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />


          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />


          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Register
          </button>


        </form>


        <p className="text-center mt-3">
          Already have an account?
          <a href="/">
            {" "}Login
          </a>
        </p>


      </div>

    </div>

  );

}


export default Register;