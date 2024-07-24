import axios from '../../../api';

import { useState, useEffect } from 'react';

import { Table } from 'antd';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios('/product/all');
        setProducts(response.data.payload);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Image',
      dataIndex: 'product_images',
      key: 'product_images',
      render: (images) => <img src={images[0]} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} />,
    },
    {
      title: 'Name',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Price',
      dataIndex: 'original_price',
      key: 'original_price',
      render: (text) => `${text}$`,
    },
    {
      title: 'Category',
      dataIndex: 'product_type',
      key: 'product_type',
    },
  ];

  return (
    <div className="p-6 bg-gray-100 h-full">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="_id"
        pagination={false}
        scroll={{ y: 400 }}
      />
    </div>
  );
};

export default Products;
