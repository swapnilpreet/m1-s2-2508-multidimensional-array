// import React from "react";
// import "../css/MedicineCard.css";
// import { useNavigate } from "react-router-dom";
// import { AddMedicineTocart } from "../../Apicalls/user";
// import { useSelector } from "react-redux";

// const MedicineCard = ({ medicine, onCompareToggle, isSelected }) => {
//   const navigate = useNavigate();
//   const {user} = useSelector((state) => state.users);
//   // console.log("user",user?.myCarts);
  
//   const handleCardClick = () => {
//     navigate(`/medicine/${medicine._id}`);
//   };

//   const AddtoCart = async (medicineId) => {
//     try {
//       console.log("id",medicineId)
//       const response = await AddMedicineTocart(medicineId);
//       if (response) {
//         // console.log(response);
//         // alert("added to cart");
//       } else {
//         throw new Error("something went wrong add to cart");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
  
//   return (
//     <div
//       className={`modern-medicine-card ${isSelected ? "selected" : ""}`}
//       onClick={handleCardClick}
//     >
//       <div className="discount-tag">10% OFF</div>

//       <div className="image-container">
//         <img
//           src={medicine.image}
//           alt={medicine.name}
//           className="medicine-img"
//         />
//       </div>

//       <div className="card-body">
//         <div className="medicine-info">
//           <h3 className="medicine-title">{medicine.name}</h3>
//           <div className="price-box">
//             <span className="price">₹{medicine.price}</span>
//             <span className="mrp">₹{medicine.price + 88}</span>
//           </div>
//         </div>

//         <div className="compare-section">
//           <button
//             className={`compare-btn ${isSelected ? "active" : ""}`}
//             onClick={(e) => {
//               e.stopPropagation();
//               onCompareToggle(medicine);
//             }}
//           >
//             {isSelected ? "Selected" : "Compare"}
//           </button>
//         </div>
//       </div>

//       <div className="card-actions">
//         <button
//           className={`pillmedicine active ${user?.myCarts?.includes(medicine?._id) ? "disabled" : ""}`}
//           // className="add-cart-btn"
//           disabled={user?.myCarts?.includes(medicine?._id)}
//           onClick={() => AddtoCart({medicineId:medicine?._id})}
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default MedicineCard;


import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AddMedicineTocart } from "../../Apicalls/user";
import { useSelector } from "react-redux";

const Card = styled.div`
  width: 280px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
  margin: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.15);
  }

  &.selected {
    border: 2px solid #007bff;
  }

  &:hover .pill-btn {
    bottom: 20px;
    opacity: 1;
  }

  @media screen and (max-width: 768px) {
    width: 90%;
    margin: 1rem auto;
  }
`;

const DiscountTag = styled.div`
  position: absolute;
  top: 14px;
  left: 14px;
  background: #ff3b3f;
  color: white;
  font-size: 0.75rem;
  padding: 5px 10px;
  border-radius: 12px;
  font-weight: bold;
  z-index: 1;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 180px;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const MedicineImg = styled.img`
  max-width: 80%;
  max-height: 100%;
  object-fit: contain;
`;

const CardBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
`;

const MedicineInfo = styled.div`
  flex: 1;
`;

const MedicineTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.3rem;
  color: #333;
  text-align: left;
`;

const PriceBox = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  text-align: left;
`;

const Price = styled.span`
  color: #2e7d32;
  font-weight: 600;
`;

const Mrp = styled.span`
  color: #999;
  text-decoration: line-through;
  font-size: 0.9rem;
`;

const CompareSection = styled.div`
  flex-shrink: 0;
`;

const CompareBtn = styled.button`
  background-color: ${(props) => (props.active ? "#007bff" : "#f0f0f0")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background-color: #d9d9d9;
  }
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.8rem;
`;

const PillButton = styled.button`
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: ${(props) => (props.disabled ? "#ccc" : "#0066ff")};
  color: ${(props) => (props.disabled ? "#666" : "#fff")};
  border: ${(props) => (props.disabled ? "1px solid #aaa" : "none")};
  border-radius: 25px;
  padding: 12px 24px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? "0.8" : "0")};
  transition: all 0.3s ease;
  box-shadow: ${(props) =>
    props.disabled ? "none" : "0 6px 14px rgba(0, 102, 255, 0.3)"};
`;

const MedicineCard = ({ medicine, onCompareToggle, isSelected }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  const handleCardClick = () => {
    navigate(`/medicine/${medicine._id}`);
  };

  const AddtoCart = async ({ medicineId }) => {
    try {
      const response = await AddMedicineTocart(medicineId);
      if (!response) throw new Error("something went wrong");
    } catch (error) {
      console.log(error);
    }
  };

  const isInCart = user?.myCarts?.includes(medicine?._id);

  return (
    <Card className={isSelected ? "selected" : ""} onClick={handleCardClick}>
      <DiscountTag>10% OFF</DiscountTag>
      <ImageContainer>
        <MedicineImg src={medicine.image} alt={medicine.name} />
      </ImageContainer>

      <CardBody>
        <MedicineInfo>
          <MedicineTitle>{medicine.name}</MedicineTitle>
          <PriceBox>
            <Price>₹{medicine.price}</Price>
            <Mrp>₹{medicine.price + 88}</Mrp>
          </PriceBox>
        </MedicineInfo>

        <CompareSection>
          <CompareBtn
            active={isSelected}
            onClick={(e) => {
              e.stopPropagation();
              onCompareToggle(medicine);
            }}
          >
            {isSelected ? "Selected" : "Compare"}
          </CompareBtn>
        </CompareSection>
      </CardBody>

      <CardActions>
        <PillButton
          className="pill-btn"
          disabled={isInCart}
          onClick={(e) => {
            e.stopPropagation();
            AddtoCart({ medicineId: medicine?._id });
          }}
        >
          Add to Cart
        </PillButton>
      </CardActions>
    </Card>
  );
};

export default MedicineCard;
