import React, { useState, useEffect } from 'react';

// Initial product data - 8 products as specified
const initialProducts = [
  {
    id: 1,
    name: 'iPhone 14 Pro',
    description: 'Latest iPhone with A16 Bionic chip, 48MP camera system, and Dynamic Island.',
    price: 999,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Samsung Galaxy S23',
    description: 'Premium Android phone with Snapdragon 8 Gen 2, triple camera setup.',
    price: 799,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Google Pixel 7',
    description: 'Pure Android experience with exceptional computational photography.',
    price: 599,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'OnePlus 11',
    description: 'Fast charging, smooth performance with OxygenOS interface.',
    price: 699,
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'Xiaomi 13 Pro',
    description: 'High-end specs at competitive price with Leica camera partnership.',
    price: 649,
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'iPhone 13',
    description: 'Previous generation iPhone with excellent performance and camera quality.',
    price: 729,
    image: 'https://images.unsplash.com/photo-1605236453806-b25e5d5cce04?w=400&h=300&fit=crop'
  },
  {
    id: 7,
    name: 'Samsung Galaxy A54',
    description: 'Mid-range Samsung phone with great value and solid performance.',
    price: 399,
    image: 'https://images.unsplash.com/photo-1583394838309-c87f1eebc5e0?w=400&h=300&fit=crop'
  },
  {
    id: 8,
    name: 'Nothing Phone 2',
    description: 'Unique transparent design with innovative Glyph interface.',
    price: 549,
    image: 'https://images.unsplash.com/photo-1512054502232-10a0a035d8db?w=400&h=300&fit=crop'
  }
];

// Product List Component
const ProductList = ({ products, onProductSelect, onNavigateToAdmin }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Mobile Store</h1>
        <nav>
          <a 
            href="#admin"
            onClick={(e) => {
              e.preventDefault();
              onNavigateToAdmin();
            }}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Admin Panel
          </a>
        </nav>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">${product.price}</span>
                <a 
                  href={`#products/${product.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onProductSelect(product.id);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Product Details Component
const ProductDetails = ({ product, onBack }) => {
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h2>
        <button 
          onClick={onBack}
          className="btn bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={onBack}
        className="btn bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 mb-6"
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
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">{product.description}</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-green-600">${product.price}</span>
            </div>
            <div className="space-y-4">
              <button className="w-full bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition-colors duration-200 font-semibold">
                Add to Cart
              </button>
              <button className="w-full bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors duration-200 font-semibold">
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
const AdminPanel = ({ products, setProducts, onBack }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddProduct = () => {
    if (formData.name && formData.description && formData.price && formData.image) {
      const newProduct = {
        id: Math.max(...products.map(p => p.id)) + 1,
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        image: formData.image
      };
      setProducts([...products, newProduct]);
      setFormData({ name: '', description: '', price: '', image: '' });
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product.id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image
    });
  };

  const handleSaveEdit = () => {
    setProducts(products.map(product => 
      product.id === editingProduct 
        ? {
            ...product,
            name: formData.name,
            description: formData.description,
            price: parseFloat(formData.price),
            image: formData.image
          }
        : product
    ));
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '', image: '' });
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setFormData({ name: '', description: '', price: '', image: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
        <a 
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
          className="text-blue-600 hover:text-blue-800 font-semibold"
        >
          Back to Store
        </a>
      </div>

      {/* Add Product Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleInputChange}
            className="form-control border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            className="form-control border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            step="0.01"
            min="0"
          />
          <input
            type="url"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleInputChange}
            className="form-control border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleInputChange}
            className="form-control border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
          <button 
            onClick={handleAddProduct}
            disabled={!formData.name || !formData.description || !formData.price || !formData.image}
            className="button bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed md:col-span-2"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Products ({products.length})</h2>
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
                          className="form-control border border-gray-300 rounded px-2 py-1 w-full"
                        />
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          className="form-control border border-gray-300 rounded px-2 py-1 w-full text-sm"
                          rows="2"
                        />
                        <input
                          type="url"
                          name="image"
                          value={formData.image}
                          onChange={handleInputChange}
                          className="form-control border border-gray-300 rounded px-2 py-1 w-full text-sm"
                          placeholder="Image URL"
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
                        className="form-control border border-gray-300 rounded px-2 py-1 w-20"
                        step="0.01"
                        min="0"
                      />
                    ) : (
                      <span className="font-semibold text-green-600">${product.price}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-col space-y-1">
                      {editingProduct === product.id ? (
                        <>
                          <button
                            onClick={handleSaveEdit}
                            className="float-right bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="float-right bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="float-right bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="float-right bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
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

// Main App Component with simulated routing
const App = () => {
  const [products, setProducts] = useState(initialProducts);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'product', 'admin'
  const [selectedProductId, setSelectedProductId] = useState(null);

  // Simulate URL changes
  useEffect(() => {
    const updateURL = () => {
      let url = '/';
      if (currentView === 'product' && selectedProductId) {
        url = `/products/${selectedProductId}`;
      } else if (currentView === 'admin') {
        url = '/admin';
      }
      window.history.replaceState({}, '', url);
    };
    updateURL();
  }, [currentView, selectedProductId]);

  const handleProductSelect = (productId) => {
    setSelectedProductId(productId);
    setCurrentView('product');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedProductId(null);
  };

  const handleNavigateToAdmin = () => {
    setCurrentView('admin');
  };

  const selectedProduct = selectedProductId 
    ? products.find(p => p.id === selectedProductId)
    : null;

  return (
    <div className="min-h-screen bg-gray-100">
      {currentView === 'home' && (
        <ProductList 
          products={products} 
          onProductSelect={handleProductSelect}
          onNavigateToAdmin={handleNavigateToAdmin}
        />
      )}
      
      {currentView === 'product' && (
        <ProductDetails 
          product={selectedProduct} 
          onBack={handleBackToHome}
        />
      )}
      
      {currentView === 'admin' && (
        <AdminPanel 
          products={products} 
          setProducts={setProducts}
          onBack={handleBackToHome}
        />
      )}
    </div>
  );
};

export default App;
