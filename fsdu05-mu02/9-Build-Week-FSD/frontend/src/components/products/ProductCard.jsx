import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slices/cartSlice.js';
import '../../styles/components.css'; // Import component-specific styles

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: 1, // Default quantity
      countInStock: product.countInStock // Pass countInStock for validation in cart
    }));
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`}>
        <img src={product.image} alt={product.name} className="product-card-image" />
      </Link>
      <Link to={`/products/${product._id}`}>
        <h3 className="product-card-title">{product.name}</h3>
      </Link>
      <p className="product-card-price">${product.price.toFixed(2)}</p>
      <div className="product-card-actions">
        <button
          onClick={handleAddToCart}
          className="btn btn-primary"
          disabled={product.countInStock === 0}
        >
          {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
        {/* <button className="btn btn-secondary">Compare</button> */}
      </div>
    </div>
  );
};

export default ProductCard;