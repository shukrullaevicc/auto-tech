import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import useFetch from "../../hooks/useFetch";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Loading } from "../../utils";
import { Card, Carousel, Button } from "antd";
import axios from "../../api";
import { Link } from "react-router-dom";

const { Meta } = Card;

const Home = () => {
  const [trigger, setTrigger] = useState(false);
  const user = useSelector((state) => state?.user);
  const [data, isLoading] = useFetch("/product/all");

  const handeLikeAndDislike = async (product) => {
    try {
      const response = await axios.patch(
        `/product/${product._id}/${
          product.likedby.includes(user.username) ? "unlike" : "like"
        }`
      );
      if (response.status === 202) {
        setTrigger(!trigger);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="max-w-[1400px] mx-auto gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data &&
            data?.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id}>
                <Card
                  style={{
                    width: 300,
                  }}
                  cover={
                    <Carousel
                      arrows
                      autoplay
                      dots={false}
                      fadeSpeed={1000}
                      style={{ height: "300px" }}
                    >
                      {product.product_images.map((image) => (
                        <img alt="example" src={image} />
                      ))}
                    </Carousel>
                  }
                >
                  <Button
                    onClick={() => handeLikeAndDislike(product)}
                    className="absolute top-[10px] right-[10px] rounded-full px-2 py-3 text-red-500"
                  >
                    {product.likedby.includes(user.username) ? (
                      <AiFillHeart />
                    ) : (
                      <AiOutlineHeart />
                    )}
                  </Button>

                  <Meta
                    title={product.product_name}
                    description={"$" + product.original_price}
                  />
                </Card>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;
