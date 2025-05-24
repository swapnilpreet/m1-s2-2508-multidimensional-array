import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} style={{ width: '200px' }} />
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetails;

