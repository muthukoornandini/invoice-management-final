import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [dashboard, setDashboard] = useState({
    customers: 0,
    invoices: 0,
    revenue: 0,
  });


  useEffect(() => {

    const getDashboard = async () => {

      try {

        const response = await API.get("/dashboard");

        setDashboard(response.data);

      } 
      catch (error) {

        console.log("Dashboard Error:", error);

      }

    };


    getDashboard();

  }, []);



  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";

  };



  return (

    <div className="container-fluid bg-light min-vh-100">


      <nav className="navbar navbar-dark bg-primary px-4">

        <span className="navbar-brand fw-bold">
          Invoice Management System
        </span>


        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>


      </nav>



      <div className="container mt-4">


        <div className="card shadow p-4 mb-4">

          <h2>
            Welcome {user?.name}
          </h2>

          <p>
            Manage your business invoices easily.
          </p>

        </div>




        <div className="row">



          <div className="col-md-4">

            <div className="card shadow p-4 text-center">

              <h3>👥 Customers</h3>

              <h1>
                {dashboard.customers}
              </h1>


              <Link
                to="/customers"
                className="btn btn-primary"
              >
                Customers
              </Link>


            </div>

          </div>





          <div className="col-md-4">

            <div className="card shadow p-4 text-center">

              <h3>🧾 Invoices</h3>

              <h1>
                {dashboard.invoices}
              </h1>


              <Link
                to="/invoices"
                className="btn btn-warning"
              >
                Invoices
              </Link>


            </div>

          </div>





          <div className="col-md-4">

            <div className="card shadow p-4 text-center">

              <h3>💰 Revenue</h3>

              <h1>
                ₹{dashboard.revenue}
              </h1>


              <p>
                Total Revenue
              </p>


            </div>

          </div>



        </div>





        <div className="card shadow p-4 mt-4 text-center">


          <h3>
            📦 Products
          </h3>


          <Link
            to="/products"
            className="btn btn-success"
          >
            Manage Products
          </Link>


        </div>



      </div>


    </div>

  );

}


export default Dashboard;