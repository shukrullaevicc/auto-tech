import { AiFillHeart, AiOutlineHeart, AiFillEye } from "react-icons/ai";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Card, Carousel, Button } from "antd";

import axios from "../../api";
import { Loading } from "../../utils";
import useFetch from "../../hooks/useFetch";
import NavComponent from "../../components/nav/nav";
import Container from "../../components/container/container";

const Favorite = () => {
  const [likedProducts, setLikedProducts] = useState([]);
  const user = useSelector((state) => state.user);

  // Fetch all products
  const [data, isLoading] = useFetch("/product/all");

  // Get liked products from localStorage
  useEffect(() => {
    const favoritesProducts =
      JSON.parse(localStorage.getItem("likedProducts")) || [];
    setLikedProducts(favoritesProducts);
  }, []);

  const handleLikeAndDislike = async (product) => {
    try {
      const isLiked = product.likedby.includes(user.username);
      const endpoint = `/product/${product._id}/${isLiked ? "unlike" : "like"}`;
      const response = await axios.patch(endpoint);

      if (response.status === 202) {
        // Update localStorage
        let updatedLikedProducts =
          JSON.parse(localStorage.getItem("likedProducts")) || [];

        if (isLiked) {
          updatedLikedProducts = updatedLikedProducts.filter(
            (p) => p._id !== product._id
          );
        } else {
          updatedLikedProducts.push(product);
        }

        // Save the updated liked products to localStorage
        localStorage.setItem(
          "likedProducts",
          JSON.stringify(updatedLikedProducts)
        );

        // Update state
        setLikedProducts(updatedLikedProducts);
      }
    } catch (error) {
      console.log("Error liking/disliking product:", error);
    }
  };

  return (
    <Container>
      <NavComponent />
      <div className="mt-10">{isLoading ? (<Loading />) : (
          <div className="max-w-[1400px] mx-auto gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data &&
              data.filter((product) => likedProducts.some((likedProduct) => likedProduct._id === product._id)).map((product) => (
                  <Card
                    key={product._id}
                    style={{ width: 300 }}
                    cover={
                      <Carousel arrows autoplay dots={false} fadeSpeed={1000} style={{ height: "300px" }}>
                        {product.product_images.map((image, index) => (
                          <img
                            key={index}
                            alt={product.product_name}
                            src={image}
                          />
                        ))}
                      </Carousel>
                    }
                  >
                    <div>
                      <h1 className="text-[17px] text-gray-900 font-bold">
                        {product.product_name}
                      </h1>
                      <p className="text-[14px] text-gray-500">
                        {product.product_type}
                      </p>
                      <strong className="text-blue-500 text-[20px]">
                        ${product.sale_price}
                      </strong>
                      <p className="text-red-500 text-[16px] line-through">
                        ${product.original_price}
                      </p>
                    </div>
                    <div className="mt-4">{product.likes > 0 && (<p className="text-[14px] text-gray-500">{product.likes} likes</p>)}</div>
                    <div className="mt-4 flex items-center gap-2">
                      <button className="text-[15px] p-2 text-white bg-red-500 rounded-lg">
                        <Link to={`/product/${product._id}`}>Add to cart</Link>
                      </button>

                      <Button
                        type="primary"
                        style={{
                          border: "none",
                          boxShadow: "none",
                          backgroundColor: "gray-200",
                          fontSize: "20px",
                          color: "red",
                          padding: "20px 10px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleLikeAndDislike(product)}
                        className=" bg-slate-200 rounded-lg"
                      >
                        {product.likedby.includes(user.username) ? (<AiFillHeart />) : (<AiOutlineHeart />)}
                      </Button>

                      <button className="text-[25px] p-2 text-gray-600 bg-slate-200 rounded-lg">
                        <Link to={`/product/${product._id}`}><AiFillEye /> </Link>
                      </button>
                    </div>
                  </Card>
                ))}
          </div>
        )}
      </div>
    </Container>
  );
};

export default Favorite;
