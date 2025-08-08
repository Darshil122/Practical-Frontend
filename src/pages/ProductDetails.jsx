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
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
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
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-7xl mx-auto mt-5">
        {loading ? (
          "Loading..."
        ) : product ? (
          <div className="grid lg:grid-cols-2 bg-white p-5 gap-6">
            {/* Left: Image */}
            <div className="flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="w-full object-contain max-h-[500px]"
              />
            </div>

            {/* Right: Details - vertically centered */}
            <div className="flex flex-col justify-center">
              <p className="font-serif text-2xl font-bold mb-4 text-gray-500">
                {product.category
                  .split(" ")
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(" ")}
              </p>
              <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
              <p className="text-xl font-semibold mb-4">${product.price}</p>
              <p className="mb-4">{product.description}</p>
              <button
                className="rounded bg-amber-300 hover:bg-amber-400 w-40 p-2"
                onClick={() => navigate("/")}
              >
                Back to products
              </button>
            </div>
          </div>
        ) : (
          "Product not found"
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
