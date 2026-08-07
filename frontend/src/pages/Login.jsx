import { useState } from "react";
import API from "../api/api";


function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };


  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await API.post(
  "/auth/login",
  formData
);
    


      alert(response.data.message);


      localStorage.setItem(
        "token",
        response.data.token
      );


      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );


      window.location.href = "/dashboard";


    } catch (error) {

      console.log(
        "LOGIN ERROR:",
        error.response?.data
      );


      alert(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  };


  return (

    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">

      <div className="card shadow p-5" style={{width:"400px"}}>

        <h2 className="text-center text-primary mb-4">
          Invoice Management System
        </h2>


        <p className="text-center text-muted">
          Login to your account
        </p>


        <form onSubmit={handleLogin}>


          <label>Email</label>

          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />


          <label>Password</label>

          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />


          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>


        </form>


        <p className="text-center mt-3">
          Don't have an account?
          <a href="/register">
            {" "}Register
          </a>
        </p>


      </div>

    </div>

  );

}


export default Login;