import React from "react";

const HeaderBar = React.memo(({ count, filter }) => {
  return (
    <div className="header">
      <h2>Items: {count}</h2>
      <p>Active Category: {filter}</p>
    </div>
  );
});

export default HeaderBar;
