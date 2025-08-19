import React from "react";

const TotalSummary = React.memo(({ sumPrice }) => {
  return (
    <div className="summary">
      <h3>Total Value: ${sumPrice}</h3>
    </div>
  );
});

export default TotalSummary;
