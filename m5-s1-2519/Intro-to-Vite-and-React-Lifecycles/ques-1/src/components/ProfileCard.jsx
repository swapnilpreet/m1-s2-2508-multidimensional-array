
const ProfileCard = ({name = "Anonymous User",age,bio = "This user has no biography provided.",}) => {
  const truncatedBio =bio.length > 100 ? bio.slice(0, 100) + "…Read More" : bio;

  const cardStyle = {
    border: "1px solid #ccc",
    borderRadius: "12px",
    padding: "20px",
    maxWidth: "400px",
    margin: "20px auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
  };

  const nameStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const ageStyle = {
    fontSize: "1rem",
    color: "#555",
    marginBottom: "10px",
  };

  const bioStyle = {
    fontSize: "1rem",
    color: "#333",
  };

  return (
    <div style={cardStyle}>
      <div style={nameStyle}>{name}</div>
      {age !== undefined && <div style={ageStyle}>Age: {age}</div>}
      <div style={bioStyle}>{truncatedBio}</div>
    </div>
  );
};

export default ProfileCard;
