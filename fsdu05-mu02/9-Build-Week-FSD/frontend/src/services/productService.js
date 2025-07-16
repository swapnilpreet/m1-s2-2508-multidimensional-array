import api from './api.js';

const getProducts = async (keyword = '', category = '', brand = '', minPrice = '', maxPrice = '', pageNumber = 1) => {
  const { data } = await api.get(
    `/api/products?keyword=${keyword}&category=${category}&brand=${brand}&minPrice=${minPrice}&maxPrice=${maxPrice}&pageNumber=${pageNumber}`
  );
  return data;
};

const getProductById = async (id) => {
  const { data } = await api.get(`/api/products/${id}`);
  return data;
};

// Add other product-related services like createProduct, updateProduct, deleteProduct, createProductReview

const productService = {
  getProducts,
  getProductById,
};

export default productService;