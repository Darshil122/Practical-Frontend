import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("All");
  const [filterbyinput, setfilterbyinput] = useState("");

  const navigate = useNavigate();

  const getProductlist = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProduct(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductlist();
  }, []);

  const categories = ["All", ...new Set(product.map((item) => item.category))];

  const handleCategory = (e) => {
    const selected = e.target.value;
    setCategory(selected);
    if (selected === "All") {
      setFilteredData(product);
    } else {
      setFilteredData(product.filter((item) => item.category === selected));
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setfilterbyinput(term);
    let filtered = product;
    if (term !== "") {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(term.toLowerCase())
      );
    }
    setFilteredData(filtered);
  };

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4">
      <div className="mx-auto max-w-7xl">
        
        {/* Search & Category Filter */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          {/* Search Box */}
          <div className="relative w-full sm:w-1/2 md:w-1/3">
            <input
              type="text"
              placeholder="Search Product"
              value={filterbyinput}
              onChange={handleSearch}
              className="w-full border border-gray-300 rounded px-4 py-2 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={category}
            onChange={handleCategory}
            className="w-full sm:w-auto border border-gray-300 rounded px-4 py-2 focus:ring focus:ring-blue-200"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat
                  .split(" ")
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(" ")}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <p className="text-center text-lg font-medium">Loading...</p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {filteredData.map((item) => (
              <div
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-300 cursor-pointer flex flex-col"
                key={item.id}
                onClick={() => navigate(`/ProductDetails/${item.id}`)}
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-32 h-36 mx-auto mb-4 object-contain"
                />

                {/* Product Info */}
                <h4 className="text-base text-gray-800 font-medium mb-1">
                  {item.title.substring(0, 27)}
                </h4>
                <p className="font-bold text-lg text-gray-800 mb-1">
                  ${item.price}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  {item.category
                    .split(" ")
                    .map((word) => word[0].toUpperCase() + word.slice(1))
                    .join(" ")}
                </p>

                {/* Add to Cart Button */}
                <button
                  className="mt-auto bg-blue-500 text-white hover:bg-blue-600 rounded py-2 px-4 w-full text-sm font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert("Added to cart!");
                  }}
                >
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;