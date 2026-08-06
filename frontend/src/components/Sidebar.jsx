import { Link } from "react-router-dom";


function Sidebar(){

return(

<div 
className="bg-dark text-white p-3"
style={{width:"220px",height:"100vh"}}
>


<h5 className="mb-4">
Menu
</h5>


<ul className="list-unstyled">


<li className="mb-3">

<Link 
to="/dashboard"
className="text-white text-decoration-none"
>
Dashboard
</Link>

</li>



<li className="mb-3">

<Link 
to="/customers"
className="text-white text-decoration-none"
>
Customers
</Link>

</li>



<li className="mb-3">

<Link 
to="/products"
className="text-white text-decoration-none"
>
Products
</Link>

</li>



<li className="mb-3">

<Link 
to="/invoices"
className="text-white text-decoration-none"
>
Invoices
</Link>

</li>


</ul>


</div>

)

}


export default Sidebar;