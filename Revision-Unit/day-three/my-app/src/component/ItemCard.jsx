import React from "react";

const ItemCard = React.memo(({ item, updateStock, deleteItem }) => {
  return (
    <div className="card">
      <h4>{item.name}</h4>
      <p>Category: {item.category}</p>
      <p>Price: {item.price}</p>
      <p>Stock: {item.stock}</p>
      <p>Rating: {item.rating}</p>
      <div className="actions">
        <button onClick={() => updateStock(item.id)}>Reduce Stock</button>
        <button onClick={() => deleteItem(item.id)}>Remove</button>
      </div>
    </div>
  );
});

export default ItemCard;
