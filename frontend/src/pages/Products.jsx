import { useEffect, useState } from "react";
import API from "../api/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
  });
  const [editId, setEditId] = useState(null);

  const getProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const saveProduct = async () => {
    try {
      if (editId) {
        await API.put(`/products/${editId}`, formData);
        alert("Product updated successfully");
      } else {
        await API.post("/products", formData);
        alert("Product added successfully");
      }

      setFormData({
        name: "",
        price: "",
        stock: "",
      });

      setEditId(null);
      getProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  const editProduct = (product) => {
    setEditId(product.id);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
    });
  };

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`);
    alert("Product deleted");
    getProducts();
  };

  return (
    <div className="container-fluid p-4">
      <h2>Product Management</h2>

      <div className="card shadow p-4 mt-3">
        <h5>{editId ? "Edit Product" : "Add Product"}</h5>

        <input
          className="form-control mb-2"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
        />

        <button className="btn btn-primary" onClick={saveProduct}>
          Save Product
        </button>
      </div>

      <div className="card shadow mt-4 p-3">
        <table className="table table-bordered">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>₹{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editProduct(product)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Products;