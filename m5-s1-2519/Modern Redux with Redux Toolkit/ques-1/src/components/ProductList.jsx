import React from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../cartSlice';

const products = [
  { id: 1, name: 'Apple', price: 100 },
  { id: 2, name: 'Banana', price: 40 },
  { id: 3, name: 'Orange', price: 60 },
];

const ProductList = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Products</h2>
      {products.map(product => (
        <div key={product.id} style={{ margin: '10px 0' }}>
          <span>{product.name} - ₹{product.price} </span>
          <button onClick={() => dispatch(addItem(product))}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
