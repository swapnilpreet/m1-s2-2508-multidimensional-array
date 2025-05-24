import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  const categories = [...new Set(products.map(p => p.category))];

  const filtered = products.filter(p =>
    categoryFilter === 'all' ? true : p.category === categoryFilter
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === 'low') return a.price - b.price;
    if (sortOrder === 'high') return b.price - a.price;
    return 0;
  });

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Product Store</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label>Filter by Category: </label>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="all">All</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <label style={{ marginLeft: '1rem' }}>Sort by Price: </label>
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="">None</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      <div>
        {sorted.map(product => (
          <div key={product.id} style={{ marginBottom: '1rem' }}>
            <Link to={`/product/${product.id}`}>
              <h3>{product.title}</h3>
            </Link>
            <p>${product.price}</p>
            <p>Category: {product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
