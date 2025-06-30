import React, { useState, useEffect } from 'react';

const Posts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://fakestoreapi.com/products');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products. Please check your internet connection or try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
      const newFilteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFilteredProducts(newFilteredProducts);
    }
  }, [searchTerm, products]);

  if (loading) {
    return (
      <div className="text-center p-4">
        <p className="text-lg text-gray-700">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 bg-red-100 text-red-700 rounded-md">
        <p className="text-lg font-medium">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen bg-gray-100 font-inter antialiased">
      <script src="https://cdn.tailwindcss.com"></script>

      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Products Page</h2>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search products by title..."
          className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-red-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {filteredProducts.length === 0 && !loading && !error ? (
          <div className="col-span-full text-center text-gray-600 text-xl mt-8">
            No products found.
          </div>
        ) : (
          filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer transform hover:scale-105 overflow-hidden flex flex-col"
            >
              <div className="w-full h-48 flex items-center justify-center p-4 bg-gray-50">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain rounded-md"
                 
                />
              </div>

              <div className="p-4 flex-grow flex flex-col">
                <strong className="text-lg text-blue-700 mb-1 truncate">{product.title}</strong>
                <p className="text-xl font-bold text-gray-900">${product.price ? product.price.toFixed(2) : 'N/A'}</p>
                <p className="text-sm text-gray-600 mt-auto">Category: {product.category}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Posts;