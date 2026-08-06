import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


function Invoices() {


  const [customers, setCustomers] = useState([]);
  const [invoices, setInvoices] = useState([]);


  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [status, setStatus] = useState("Pending");


  const [editId, setEditId] = useState(null);



  const price = 50000;
  const total = quantity * price;


  const API = "http://localhost:5000/api/invoices";



  const getInvoices = async()=>{

    try{

      const res = await fetch(API);

      const data = await res.json();

      setInvoices(data);

    }
    catch(error){

      console.log(error);

    }

  };




  useEffect(()=>{


    fetch("http://localhost:5000/api/customers")

    .then(res=>res.json())

    .then(data=>{

      setCustomers(data);

    });


    getInvoices();


  },[]);





  const clearForm=()=>{

    setCustomer("");
    setProduct("");
    setInvoiceDate("");
    setQuantity(1);
    setStatus("Pending");
    setEditId(null);

  };





  const generateInvoice = async()=>{


    if(!customer || !product || !invoiceDate){

      alert("Please fill all details");

      return;

    }



    const selectedCustomer = customers.find(
      c=>c.id == customer
    );



    const invoiceData={


      invoice_number:

      editId
      ? undefined
      : "INV-"+Date.now(),


      customer_name:selectedCustomer.name,


      product:product,


      invoice_date:invoiceDate,


      total_amount:total,


      status:status

    };




    try{


      const response = await fetch(

        editId
        ? `${API}/${editId}`
        : API,

        {

          method: editId ? "PUT":"POST",


          headers:{

            "Content-Type":"application/json"

          },


          body:JSON.stringify(invoiceData)

        }

      );




      const result = await response.json();



      if(response.ok){


        alert(
          editId
          ? "Invoice Updated Successfully ✅"
          : "Invoice Created Successfully ✅"
        );


        clearForm();

        getInvoices();


      }
      else{

        alert(result.message);

      }



    }
    catch(error){

      console.log(error);

      alert("Backend Error");

    }


  };




  const editInvoice=(invoice)=>{


    const customerData = customers.find(
      c=>c.name===invoice.customer_name
    );


    setCustomer(customerData?.id || "");

    setProduct(invoice.product);

    setInvoiceDate(invoice.invoice_date);

    setStatus(invoice.status);

    setEditId(invoice.id);


  };





  const deleteInvoice=async(id)=>{


    if(!window.confirm("Delete this invoice?"))

      return;



    await fetch(

      `${API}/${id}`,

      {

        method:"DELETE"

      }

    );


    alert("Invoice Deleted");


    getInvoices();


  };

  const viewInvoice=(invoice)=>{

    alert(
`Invoice No: ${invoice.invoice_number}
Customer: ${invoice.customer_name}
Product: ${invoice.product}
Date: ${invoice.invoice_date}
Amount: ₹${invoice.total_amount}
Status: ${invoice.status}`
    );

  };





  const downloadPDF=(invoice)=>{


    const doc = new jsPDF();


    doc.setFontSize(18);


    doc.text(
      "Invoice Management System",
      20,
      20
    );


    doc.setFontSize(12);


    doc.text(
      `Invoice No: ${invoice.invoice_number}`,
      20,
      35
    );


    doc.text(
      `Customer: ${invoice.customer_name}`,
      20,
      45
    );


    doc.text(
      `Date: ${invoice.invoice_date}`,
      20,
      55
    );



    autoTable(doc,{

      startY:70,

      head:[

        [
          "Product",
          "Amount",
          "Status"
        ]

      ],


      body:[

        [
          invoice.product,
          `₹${invoice.total_amount}`,
          invoice.status
        ]

      ]

    });



    doc.save(
      `${invoice.invoice_number}.pdf`
    );


  };






return (

<div className="container-fluid p-4">


<h2>
Invoice Management
</h2>



<div className="card shadow p-4 mt-4">



<div className="row">


<div className="col-md-4">


<label className="form-label">
Customer
</label>


<select

className="form-control"

value={customer}

onChange={(e)=>setCustomer(e.target.value)}

>


<option value="">
Select Customer
</option>



{
customers.map(c=>(

<option
key={c.id}
value={c.id}
>

{c.name}

</option>

))
}


</select>


</div>





<div className="col-md-4">


<label className="form-label">
Product
</label>


<select

className="form-control"

value={product}

onChange={(e)=>setProduct(e.target.value)}

>


<option value="">
Select Product
</option>


<option value="Laptop">
Laptop
</option>


<option value="Mobile">
Mobile
</option>


<option value="Keyboard">
Keyboard
</option>


</select>


</div>





<div className="col-md-4">


<label className="form-label">
Invoice Date
</label>


<input

type="date"

className="form-control"

value={invoiceDate}

onChange={(e)=>setInvoiceDate(e.target.value)}

/>


</div>


</div>





<br/>


<label className="form-label">
Status
</label>


<select

className="form-control"

value={status}

onChange={(e)=>setStatus(e.target.value)}

>


<option value="Pending">
Pending
</option>


<option value="Paid">
Paid
</option>


<option value="Cancelled">
Cancelled
</option>


</select>





<br/>


<label className="form-label">
Quantity
</label>


<input

type="number"

min="1"

className="form-control"

value={quantity}

onChange={(e)=>setQuantity(Number(e.target.value))}

/>




<h4 className="mt-3">
Total Amount: ₹{total}
</h4>




<button

className="btn btn-primary"

onClick={generateInvoice}

>

{
editId
?"Update Invoice"
:"Generate Invoice"
}

</button>




<button

className="btn btn-secondary ms-2"

onClick={clearForm}

>

Clear

</button>





<hr/>




<h3>
Invoice List
</h3>




<table className="table table-bordered">


<thead className="table-dark">


<tr>

<th>
Invoice No
</th>

<th>
Customer
</th>

<th>
Product
</th>

<th>
Date
</th>

<th>
Amount
</th>

<th>
Status
</th>

<th>
Action
</th>


</tr>


</thead>





<tbody>


{

invoices.map(invoice=>(


<tr key={invoice.id}>


<td>
{invoice.invoice_number}
</td>


<td>
{invoice.customer_name}
</td>


<td>
{invoice.product}
</td>


<td>
{invoice.invoice_date}
</td>


<td>
₹{invoice.total_amount}
</td>


<td>
{invoice.status}
</td>




<td>


<button

className="btn btn-info btn-sm me-1"

onClick={()=>viewInvoice(invoice)}

>

View

</button>




<button

className="btn btn-warning btn-sm me-1"

onClick={()=>editInvoice(invoice)}

>

Edit

</button>





<button

className="btn btn-success btn-sm me-1"

onClick={()=>downloadPDF(invoice)}

>

PDF

</button>





<button

className="btn btn-danger btn-sm"

onClick={()=>deleteInvoice(invoice.id)}

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


export default Invoices;