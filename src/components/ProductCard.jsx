import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

// thunk function:
import { addItemToCart } from "../pages/cart/cartSlice.js";

// selector function:
import { isAnCartItem } from "../pages/products/productsSlice";
import { useNavigate } from "react-router-dom";

function ProductCard({ product, onShowProductDetails }) {
  const navigate = useNavigate();
  const isInCart = useSelector((state) => isAnCartItem(state, product._id));

  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        onShowProductDetails();
      }}
      className="w-full md:w-72 h-fit bg-white shadow-2xl rounded-xl overflow-hidden cursor-pointer relative"
    >
      {/* Wishlist Button (Top-Right) */}
      <button className="absolute top-2 right-2 text-red-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-10 w-10 rounded-full bg-white hover:bg-red-100  text-gray-600 p-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          ></path>
        </svg>
      </button>
      {/* Product image */}
      <img
        className="w-full h-64 object-fill object-center"
        src={product.thumbnail}
        alt="Product"
      />
      {/* Product Information :*/}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {product.title}
        </h2>
        <p className="text-gray-600 mb-4">
          {product.description.substring(0, 35)}
        </p>
        {/* price, offer and rating : */}
        <div className="w-full flex items-center place-content-around">
          <span className="text-lg font-bold text-gray-800">
            ₹{Math.round(product.price * (1 - product.discountPercent * 0.01))}
          </span>
          <span className="text-sm text-gray-500 font-semibold line-through">
            ₹{product.price}
          </span>
          <span className="text-sm text-green-500 font-bold  ml-1">
            ({product.discountPercent}% off)
          </span>
          <span className="text-xs px-2 py-1 bg-green-800 text-white rounded-md">
            {"4.5"} ★
          </span>
        </div>
      </div>
      {/* Add to Cart Button: */}
      {isInCart ? (
        <button
          className="w-11/12 my-5 font-semibold border-2 rounded-full outline-none bg-yellow-500 text-white px-4 py-2 hover:bg-transparent hover:border-2 hover:border-yellow-500 hover:text-yellow-500 transition duration-300"
          onClick={(e) => {
            e.stopPropagation();
            navigate("/cart");
          }}
        >
          Go to Cart
        </button>
      ) : (
        <button
          className="w-11/12 my-5 font-semibold border-2 rounded-full outline-none bg-blue-800 text-white px-4 py-2 hover:bg-transparent hover:border-2 hover:border-blue-800 hover:text-blue-800 transition duration-300"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addItemToCart({ productId: product._id }));
          }}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}

export default ProductCard;
