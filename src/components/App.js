// App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

// Initial product data
const initialProducts = [
  {
    id: 1,
    name: "iPhone 14 Pro",
    description:
      "Latest iPhone with A16 Bionic chip, 48MP camera system, and Dynamic Island.",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    description: "Premium Android phone with Snapdragon 8 Gen 2, triple camera setup.",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Google Pixel 7",
    description:
      "Pure Android experience with exceptional computational photography.",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "OnePlus 11",
    description: "Fast charging, smooth performance with OxygenOS interface.",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&h=300&fit=crop",
  },
];

// Product List Component
const ProductList = ({ products }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Mobile Store</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-blue-600 hover:text-blue-800">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className="text-blue-600 hover:text-blue-800 font-semibold"
                data-testid="nav-admin"
              >
                Admin Panel
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="col-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">
                    ${product.price}
                  </span>
                  <Link
                    to={`/products/${product.id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 no-underline"
                    data-testid={`view-details-${product.id}`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Product Details Component
const ProductDetails = ({ products }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Product Not Found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="btn bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
          data-testid="back-to-home"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate("/")}
        className="btn bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mb-6"
        data-testid="back-to-home"
      >
        ← Back to Home
      </button>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {product.description}
            </p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-green-600">
                ${product.price}
              </span>
            </div>
            <div className="space-y-4">
              <button
                className="w-full bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition-colors duration-200 font-semibold"
                data-testid="add-to-cart"
              >
                Add to Cart
              </button>
              <button
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors duration-200 font-semibold"
                data-testid="buy-now"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Admin Panel Component
const AdminPanel = ({ products, setProducts }) => {
  const navigate = useNavigate();
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image,
    });
  };

  const handleSaveEdit = () => {
    const updatedProducts = products.map((p) =>
      p.id === editingProduct
        ? {
            ...p,
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            image: formData.image,
          }
        : p
    );
    setProducts(updatedProducts);
    setEditingProduct(null);
    setFormData({ name: "", description: "", price: "", image: "" });
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setFormData({ name: "", description: "", price: "", image: "" });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:text-blue-800 font-semibold"
          data-testid="back-to-store"
        >
          Back to Store
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Products ({products.length})
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2">
                    {editingProduct === product.id ? (
                      <div className="space-y-2">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded px-2 py-1 w-full"
                        />
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                          rows="2"
                        />
                        <input
                          type="url"
                          name="image"
                          value={formData.image}
                          onChange={handleInputChange}
                          className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                        />
                      </div>
                    ) : (
                      <div>
                        <div className="font-semibold">{product.name}</div>
                        <div className="text-sm text-gray-600 truncate max-w-xs">
                          {product.description}
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingProduct === product.id ? (
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-2 py-1 w-20"
                      />
                    ) : (
                      <span className="font-semibold text-green-600">
                        ${product.price}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingProduct === product.id ? (
                      <div>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 ml-2"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveEdit}
                          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 ml-2"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 ml-2"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 ml-2"
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [products, setProducts] = useState(initialProducts);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<ProductList products={products} />} />
          <Route
            path="/products/:id"
            element={<ProductDetails products={products} />}
          />
          <Route
            path="/admin"
            element={<AdminPanel products={products} setProducts={setProducts} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
