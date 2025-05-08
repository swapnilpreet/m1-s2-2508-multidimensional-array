const PlanCard = ({ title, price, features, isFree }) => {
    return (
      <div style={cardStyle}>
        <h2>{title}</h2>
        <ul>
          {features.map((feat, i) => (
            <li key={i}>✅ {feat}</li>
          ))}
        </ul>
        <h3>{isFree ? "Free" : `$${price}`}</h3>
        <button style={buttonStyle}>Get Started</button>
      </div>
    );
  };
  
  const cardStyle = {
    border: "1px solid #ccc",
    padding: "20px",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-evenly",
    margin: "10px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  };
  
  const buttonStyle = {
    backgroundColor: "blueviolet",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    height:"50px",
  };
  
  export default PlanCard;
  