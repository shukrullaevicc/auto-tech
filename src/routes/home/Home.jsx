import { AiFillEye } from "react-icons/ai"; 
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Card, Carousel, Button } from "antd";

import { useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import { Loading } from "../../utils";
import axios from "../../api";

const { Meta } = Card;

const Home = () => {
  const [trigger, setTrigger] = useState(false);
  const user = useSelector((state) => state?.user);
  const [data, isLoading] = useFetch("/product/all");

  const handeLikeAndDislike = async (product) => {
    try {
      const response = await axios.patch(`/product/${product._id}/${product.likedby.includes(user.username) ? "unlike" : "like"}`);
      if (response.status === 202) {
        setTrigger(!trigger);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  console.log(data);

  return (
    <div>
      {isLoading ? (<Loading />) : (
        <div className="max-w-[1400px] mx-auto gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data && data?.map((product) => (
              <Card
              style={{width: 300}}
              cover={
                <Carousel arrows autoplay dots={false} fadeSpeed={1000} style={{ height: "300px" }} >
                  {product.product_images.map((image) => (<img alt="example" src={image} />))}
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
                  {
                    product.likes > 0 ? (<p className="text-[14px] text-gray-500">{product.likes} likes</p>) : null
                  }
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <button className="text-[15px] p-2 text-white bg-red-500 rounded-lg">
                    <Link to={`/product/${product._id}`}>
                      Add to cart
                    </Link>
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
  );
};

export default Home;
