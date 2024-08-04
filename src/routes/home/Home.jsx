import { IoIosArrowForward } from "react-icons/io"; 
import React, { useState } from 'react';
import { AiFillEye } from "react-icons/ai"; 
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Card, Carousel, Button, Modal, InputNumber, notification } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { Loading } from "../../utils";
import axios from "../../api";
import NavComponent from "../../components/nav/nav";
import Container from "../../components/container/container";

const { Meta } = Card;

const Home = () => {
  const [trigger, setTrigger] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((state) => state?.user);
  const [data, isLoading] = useFetch("/product/all");

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productToAdd = {
      ...selectedProduct,
      quantity,
      totalPrice: selectedProduct.sale_price * quantity
    };
    cart.push(productToAdd);
    localStorage.setItem('cart', JSON.stringify(cart));
    notification.success({
      message: 'Product Added',
      description: `${selectedProduct.product_name} has been added to your cart.`,
    });
    handleCancel();
  };

  const handeLikeAndDislike = async (product) => {
    try {
      const response = await axios.patch(`/product/${product._id}/${product.likedby.includes(user.username) ? "unlike" : "like"}`);
      
      if (response.status === 202) {
        let likedProducts = JSON.parse(localStorage.getItem('likedProducts')) || [];
        if (product.likedby.includes(user.username)) {
          likedProducts = likedProducts.filter(p => p._id !== product._id);
        } else {
          likedProducts.push(product);
        }
        localStorage.setItem('likedProducts', JSON.stringify(likedProducts));
        setTrigger(!trigger);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <NavComponent />
      <div className="mt-10">
        {isLoading ? (<Loading />) : (
          <div className="max-w-[1400px] mx-auto gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data && data?.map((product) => (
              <Card
                key={product._id}
                style={{width: 300}}
                cover={
                  <Carousel arrows autoplay dots={false} fadeSpeed={1000} style={{ height: "300px" }}>
                    {product.product_images.map((image) => (<img key={image} alt="example" src={image} />))}
                  </Carousel>
                }
              >
                <div>
                  <h1 className="text-[17px] text-gray-900 font-bold">{product.product_name}</h1>
                  <p className="text-[14px] text-gray-500">{product.product_type}</p>
                  <strong className="text-blue-500 text-[20px]">${product.sale_price}</strong>
                  <p className="text-red-500 text-[16px] line-through">${product.original_price}</p>
                </div>
                <div className="mt-4">
                  {product.likes > 0 ? (<p className="text-[14px] text-gray-500">{product.likes} likes</p>) : null}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <button className="text-[15px] p-2 text-white bg-red-500 rounded-lg" onClick={() => openModal(product)}>
                    Add to cart
                  </button>
                  <Button 
                    type="primary"
                    style={{border: "none", boxShadow: "none", backgroundColor: "gray-200", fontSize: "20px", color: "red", padding: "20px 10px", cursor: "pointer"}}
                    onClick={() => handeLikeAndDislike(product)}
                    className=" bg-slate-200 rounded-lg"
                  >
                    {product.likedby.includes(user.username) ? (<AiFillHeart />) : ( <AiOutlineHeart /> )}
                  </Button>
                  <button className="text-[25px] p-2 text-gray-600 bg-slate-200 rounded-lg">
                    <Link to={`/product/${product._id}`}><AiFillEye /></Link>
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal for adding to cart */}
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
        className="custom-modal bg-slate-200 rounded-lg p-0 shadow-lg border-none" 
      >
        {selectedProduct && (
          <div className="p-6 mx-auto w-full">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
              <div className="w-full">
                <img
                  src={selectedProduct.product_images[0]}
                  alt={selectedProduct.product_name}
                  className="w-100 h-100 object-cover bg-no-repeat"
                />
                <Link to={`/product/${selectedProduct._id}`}>
                  <button className='w-full border-[1px] border-gray-500 flex items-center justify-center rounded-xl p-2 mt-3'>
                    <p className="text-gray-900">View Details</p>
                    <IoIosArrowForward  className="text-[15px] text-gray-500"/>
                  </button>
                </Link>
              </div>
              <div className="w-full">
                <h2 className="text-2xl font-bold mb-2 border-b border-gray-300 pb-7 ">{selectedProduct.product_name}</h2>
                <div className="flex flex-col mb-4 mt-5">
                  <p className="text-lg">Quantity:</p>
                  <div className="flex items-center mt-1">
                    <Button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>-</Button>
                    <InputNumber min={1} value={quantity} onChange={setQuantity} className="mx-2 " />
                    <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
                  </div>
                  <span></span>
                </div>
                <div className="flex items-center justify-items-start gap-3 mb-4 mt-7">
                  <span className="text-xl font-bold text-blue-500">${(selectedProduct.sale_price * quantity).toFixed(2)}</span>
                  <span className="text-sm text-gray-500 line-through">${selectedProduct.original_price}</span>
                  <span className="text-[9px] p-1 bg-red-500 rounded-full text-white">Discount</span>
                </div>
                <Button type="primary" onClick={handleAddToCart} className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </Container>
  );
};

export default Home;
