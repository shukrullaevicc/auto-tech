import { useState, useRef, useMemo, useEffect } from "react"
import { useParams } from "react-router-dom"

import { Tag, Carousel } from 'antd';

import Nav from "../../components/nav/nav"
import Container from "../../components/container/container"
import useFetch from "../../hooks/useFetch"

const SinglePage = () => {
  const carousel = useRef();
  const { id } = useParams()
  const [data] = useFetch(`/product/single-product/${id}`)
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const discount = useMemo(() => {
    if(data){
        return (data.original_price - data.sale_price) / data.original_price * 100
    }
  }, [data])

  const handleImageClick = (index) => {
    setMainImageIndex(index);
  }

  useEffect(() => {
      if(carousel?.current){
          carousel.current.goTo(mainImageIndex)
      }
  }, [mainImageIndex])

  return (
    <Container>
      <div>
            <Nav />
           {
            data &&  <div className="mt-10">
            <div className="product__wrapper w-full h-[600px] rounded-xl flex p-4  gap-4">
                <div className="product-imgs w-full h-full flex gap-5">

                    <div className="side-imgs w-[150px] h-full flex flex-col justify-center items-center gap-2">
                        {data.product_images && data.product_images.map((img, index) => (
                            <div style={mainImageIndex === index ? {border: "2px solid grey"} : null} key={index} onClick={() => handleImageClick(index)} className='side-img w-[140px] h-[140px] bg-gray-200 rounded-2xl cursor-pointer'>
                                <img src={img} alt={`Product Image ${index + 1}`} className='w-full h-full object-contain rounded-2xl' />
                            </div> 
                        ))}
                    </div>
                    
                    <div className='main-img w-[540px] h-full bg-gray-200 rounded-2xl'>
                        {data.product_images && (
                            <Carousel ref={carousel}  arrows autoplay afterChange={(current) => setMainImageIndex(current)}>
                                {data.product_images.map((img, index) => (
                                    <div key={index}>
                                        <img src={img} alt={`Main Product Image ${index + 1}`} className='w-full h-full object-cover rounded-2xl' />
                                    </div>
                                ))}
                            </Carousel>
                        )}
                    </div>
                </div>
                <div className="product-info w-full h-full">
                    <div className="flex items-center gap-6">
                      <h2 className='text-3xl'>{data?.product_name || "Product Name" }</h2>
                      <Tag color="geekblue">{data?.category || "Category"}</Tag>
                    </div>
                    <div className="flex items-center justify-items-start gap-3 mb-4 mt-7">
                      <span className="text-xl font-bold text-blue-500">${(data.sale_price * quantity).toFixed(2)}</span>
                      <span className="text-sm text-gray-500 line-through">${data.original_price}</span>
                      <span className="text-[9px] p-1 bg-red-500 rounded-full text-white">Discount</span>
                    </div>
                </div>
            </div>
        </div>
           }
        </div>

    </Container>
  )
}

export default SinglePage