import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const getProductDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    getProductDetails();
  }, [id]);

  return (
    <div className="bg-gray-100 min-h-screen py-6 px-4">
      <div className="max-w-7xl mx-auto mt-5">
        {loading ? (
          <p className="text-center text-lg font-medium">Loading...</p>
        ) : product ? (
          <div className="grid lg:grid-cols-2 gap-8 bg-white p-5 rounded-lg shadow-md">
            {/* Left: Image */}
            <div className="flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-full max-w-md object-contain max-h-[500px]"
              />
            </div>

            {/* Right: Details */}
            <div className="flex flex-col justify-center">
              <p className="font-serif text-lg sm:text-xl font-semibold mb-3 text-gray-500">
                {product.category
                  .split(" ")
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(" ")}
              </p>
              <h1 className="text-xl sm:text-2xl font-bold mb-3">{product.title}</h1>
              <p className="text-lg sm:text-xl font-semibold mb-4">
                ${product.price}
              </p>
              <p className="text-gray-700 text-sm sm:text-base mb-6">
                {product.description}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  className="rounded bg-amber-400 hover:bg-amber-500 text-white px-4 py-2 transition"
                  onClick={() => alert("Added to cart!")}
                >
                  Add to Cart
                </button>
                <button
                  className="rounded bg-gray-300 hover:bg-gray-400 px-4 py-2 transition"
                  onClick={() => navigate("/")}
                >
                  Back to Products
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">Product not found</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
