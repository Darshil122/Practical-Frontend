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
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="mx-auto max-w-7xl">
        {/* Category Filter Dropdown */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
          <div className="relative w-full sm:w-1/3">
            <input
              type="text"
              placeholder="Search Product"
              value={filterbyinput}
              onChange={handleSearch}
              className="border border-gray-300 rounded px-4 py-2"
            />
          </div>
          <select
            value={category}
            onChange={handleCategory}
            className="border border-gray-300 rounded px-4 py-2"
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
          "Loading..."
        ) : (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
            {filteredData.map((item) => (
              <div
                className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-300 cursor-pointer"
                key={item.id}
                onClick={() => navigate(`/ProductDetails/${item.id}`)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-32 h-36 mx-auto mb-4"
                />
                <h4 className="text-base text-gray-800">
                  {item.title.substring(0, 30)}
                </h4>
                <p className="font-bold text-lg text-gray-800">${item.price}</p>
                <p>
                  {item.category
                    .split(" ")
                    .map((word) => word[0].toUpperCase() + word.slice(1))
                    .join(" ")}
                </p>
                <button className="bg-blue-400 text-white hover:bg-blue-500 rounded py-1 px-4 mt-2.5">
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