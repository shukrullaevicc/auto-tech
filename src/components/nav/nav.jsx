import React, { useState, useEffect } from "react";
import { HeartOutlined, ShoppingOutlined, SearchOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const NavComponent = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);
  }, []);

  const handleDelete = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleNavigate = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <nav className="flex items-center justify-between gap-5 mt-4 relative">
      <form action="" className="flex items-center gap-2 p-2 bg-gray-100 rounded-xl w-full max-w-[300px]">
        <input
          className="w-full bg-transparent outline-none ml-3"
          type="text"
          placeholder="Search..."
        />
        <button type="submit" className="text-xl text-gray-500 cursor-pointer mr-1">
          <SearchOutlined />
        </button>
      </form>
      <div className="flex gap-10 relative">
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Link to="/cart">
            <button className="flex gap-2 items-center cursor-pointer">
              <ShoppingOutlined />
              <p>Cart</p>
            </button>
          </Link>
          {isHovered && (
            <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg w-64 z-10">
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="p-2 flex items-center justify-between border-b hover:bg-gray-100 cursor-pointer"
                  >
                    <div onClick={() => handleNavigate(item._id)}>
                      <p className="text-sm">{item.product_name}</p>
                      <p className="text-xs text-gray-500">${item.totalPrice}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-500 text-sm ml-2"
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p className="p-2 text-center text-gray-500">No items in cart</p>
              )}
            </div>
          )}
        </div>
        <Link to="/favorite">
          <button className="flex gap-2 items-center cursor-pointer">
            <HeartOutlined />
            <p>Favorite</p>
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default NavComponent;
