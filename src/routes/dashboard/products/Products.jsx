import axios from '../../../api';
import { useState, useEffect } from 'react';
import { Table, Input } from 'antd';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios('/product/all');
        setProducts(response.data.payload);
        setFilteredProducts(response.data.payload); // Initially set filteredProducts to all products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const results = products.filter(product =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.product_type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

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
      sorter: (a, b) => a.product_name.localeCompare(b.product_name),
    },
    {
      title: 'Price',
      dataIndex: 'original_price',
      key: 'original_price',
      sorter: (a, b) => a.original_price - b.original_price,
      render: (text) => `${text}$`,
    },
    {
      title: 'Category',
      dataIndex: 'product_type',
      key: 'product_type',
      sorter: (a, b) => a.product_type.localeCompare(b.product_type),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 h-full">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>
      <Input
        placeholder="Search by name or category"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-6"
      />
      <Table
        columns={columns}
        dataSource={filteredProducts}
        rowKey="_id"
        pagination={false}
        scroll={{ y: 400 }}
      />
    </div>
  );
};

export default Products;
