// import React from "react";
// import "../css/CompareModal.css";
// import { FaTimes } from "react-icons/fa";

// const CompareModal = ({ medicines, onClose }) => {
//   return (
//     <div className="compare-modal-overlay">
//       <div className="compare-modal">
//         <div className="modal-header">
//           <h2>Compare Medicines</h2>
//           <FaTimes className="close-icon" onClick={onClose} />
//         </div>

//         <div className="modal-body">
//           {medicines.map((med) => (
//             <div key={med._id} className="compare-card">
//               <img src={med.image} alt={med.name}/>
//               <h3>{med.name}</h3>
//               <p><strong>Brand:</strong>{med.brand || "Generic Health"}</p>
//               <p><strong>Compound:</strong>{med.compound||"Paracetamol + XYZ"}</p>
//               <p><strong>Price:</strong> ₹{med.price}</p>
//               <p><strong>MRP:</strong> ₹{med.mrp}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CompareModal;


import React from "react";
import styled, { keyframes } from "styled-components";
import { FaTimes } from "react-icons/fa";

// Animation
const slideDown = keyframes`
  from {
    transform: translateY(-30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 16px;
  width: 90%;
  max-width: 800px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
  animation: ${slideDown} 0.3s ease-in-out;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
    font-size: 1.5rem;
  }
`;

const CloseIcon = styled(FaTimes)`
  cursor: pointer;
  font-size: 1.3rem;
`;

const ModalBody = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const CompareCard = styled.div`
  flex: 1 1 45%;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);

  img {
    max-width: 100px;
    height: auto;
    margin-bottom: 0.5rem;
  }
`;

// Main Component
const CompareModal = ({ medicines, onClose }) => {
  return (
    <Overlay>
      <Modal>
        <ModalHeader>
          <h2>Compare Medicines</h2>
          <CloseIcon onClick={onClose} />
        </ModalHeader>
        <ModalBody>
          {medicines.map((med) => (
            <CompareCard key={med._id}>
              <img src={med.image} alt={med.name} />
              <h3>{med.name}</h3>
              <p><strong>Brand:</strong> {med.brand || "Generic Health"}</p>
              <p><strong>Compound:</strong> {med.compound || "Paracetamol + XYZ"}</p>
              <p><strong>Price:</strong> ₹{med.price}</p>
              <p><strong>MRP:</strong> ₹{med.mrp}</p>
            </CompareCard>
          ))}
        </ModalBody>
      </Modal>
    </Overlay>
  );
};

export default CompareModal;
