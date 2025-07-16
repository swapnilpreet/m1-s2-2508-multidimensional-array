import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slices/cartSlice.js';
import '../../styles/components.css'; // Import component-specific styles

const ProductDetailsContent = ({ product }) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const handleAddToCart = () => {
    dispatch(addToCart({
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: Number(qty),
      countInStock: product.countInStock
    }));
  };

  return (
    <div className="product-details-content">
      <h2>{product.name}</h2>
      <p className="product-details-price">${product.price.toFixed(2)}</p>
      <p><strong>Brand:</strong> {product.brand}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Status:</strong> {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</p>
      {product.countInStock > 0 && (
        <div className="form-group flex items-center gap-md">
          <label htmlFor="qty">Qty:</label>
          <select
            id="qty"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="qty-select"
          >
            {[...Array(product.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>
        </div>
      )}
      <button
        onClick={handleAddToCart}
        className="btn btn-primary mt-lg w-full"
        disabled={product.countInStock === 0}
      >
        {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
      </button>

      <div className="product-details-tabs">
        <button
          className={`product-details-tab-btn ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button
          className={`product-details-tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews ({product.numReviews})
        </button>
        <button
          className={`product-details-tab-btn ${activeTab === 'faqs' ? 'active' : ''}`}
          onClick={() => setActiveTab('faqs')}
        >
          FAQs
        </button>
      </div>

      <div className="product-details-tab-content">
        {activeTab === 'description' && (
          <div>
            <h3>Product Description</h3>
            <p>{product.description}</p>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div>
            <h3>Customer Reviews</h3>
            {product.reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              <ul className="reviews-list">
                {product.reviews.map((review) => (
                  <li key={review._id} className="review-item">
                    <strong>{review.name}</strong>
                    <p>Rating: {review.rating} Stars</p>
                    <p>{review.comment}</p>
                    <small>{new Date(review.createdAt).toLocaleDateString()}</small>
                  </li>
                ))}
              </ul>
            )}
            {/* Add review form here */}
          </div>
        )}
        {activeTab === 'faqs' && (
          <div>
            <h3>Frequently Asked Questions</h3>
            <p>Q: How should I store this medicine?</p>
            <p>A: Store in a cool, dry place away from direct sunlight.</p>
            {/* More FAQs */}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsContent;






// // In ProductDetailsPage.jsx
// import ProductDetailsContent from '../components/products/ProductDetailsContent.jsx';

// const ProductDetailsPage = () => {
//   // ... existing logic to fetch product ...
//   return (
//     <div className="product-details-container my-xl">
//       <div className="product-details-image-col">
//         <img src={product.image} alt={product.name} className="product-details-image" />
//       </div>
//       <div className="product-details-info-col">
//         <ProductDetailsContent product={product} /> {/* Use the new component here */}
//       </div>
//     </div>
//   );
// };