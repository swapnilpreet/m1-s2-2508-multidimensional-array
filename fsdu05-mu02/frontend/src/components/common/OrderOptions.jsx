// import React, { useState } from "react";
// import "../css/OrderOptions.css";
// import { FiPhoneCall } from "react-icons/fi";
// import { LuFilePlus } from "react-icons/lu";
// import axios from "axios";
// import { SetLoader } from "../../redux/LoadingSlice";
// import { AddMedicalHistory } from "../../Apicalls/user";
// import { useDispatch } from "react-redux";

// const OrderOptions = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     condition: "",
//     diagnosisDate: "",
//     medications: [""],
//     notes: "",
//     prescriptionFile: null, // Stores the File object
//   });
//   const [preview, setPreview] = useState(""); // Stores the URL for local preview
//   const dispatch = useDispatch();

//   const handleChange = (e, index) => {
//     if (e.target.name === "medications") {
//       const meds = [...formData.medications];
//       meds[index] = e.target.value;
//       setFormData({ ...formData, medications: meds });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const addMedicationField = () => {
//     setFormData({ ...formData, medications: [...formData.medications, ""] });
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, prescriptionFile: file });
//       // Create a local URL for image preview
//       setPreview(URL.createObjectURL(file));
//     } else {
//       setFormData({ ...formData, prescriptionFile: null });
//       setPreview("");
//     }
//   };

//   const handleSubmit = async () => {
//     // Basic validation
//     if (
//       !formData.condition ||
//       !formData.diagnosisDate ||
//       formData.medications.some((med) => !med.trim()) ||
//       !formData.prescriptionFile
//     ) {
//       alert("Please fill all required fields and upload a prescription.");
//       return;
//     }

//     try {
//       const cloudinaryFormData = new FormData();
//       cloudinaryFormData.append("file", formData.prescriptionFile);
//       cloudinaryFormData.append("upload_preset", "apna-meds");
//       cloudinaryFormData.append("cloud_name", "dejqyvuqj");

//       console.log("Uploading to Cloudinary...");
//       const cloudRes = await axios.post(
//         `https://api.cloudinary.com/v1_1/${cloudinaryFormData.get(
//           "cloud_name"
//         )}/image/upload`,
//         cloudinaryFormData
//       );

//       console.log(cloudRes.data.secure_url);

//       const prescriptionUrl = cloudRes.data.secure_url;
//       console.log("Cloudinary Upload Success. URL:", formData, prescriptionUrl);

//       // 2. Send medical history data + prescription URL to your backend
//       // Make sure your backend route is set up to receive this data
//       // and update the user's medical history array.
//       // You'll likely need to use your axiosInstance if it's authenticated.
//       // Example using a placeholder path, uncomment and adapt as needed:

//       // const response = await axios.post(
//       //   "http://localhost:3000/api/users/medical-history", // Your backend endpoint
//       //   {
//       //     condition: formData.condition,
//       //     diagnosisDate: formData.diagnosisDate,
//       //     medications: formData.medications,
//       //     notes: formData.notes,
//       //     prescriptionUrl: prescriptionUrl, // Send the Cloudinary URL to your backend
//       //   },
//       //   {
//       //     headers: {
//       //       Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming authentication is required
//       //     },
//       //   }
//       // );

//       const payload = {
//         condition: formData.condition,
//         diagnosisDate: formData.diagnosisDate,
//         medications: formData.medications,
//         notes: formData.notes,
//         prescriptionUrl: prescriptionUrl,
//       };
//       try {
//         dispatch(SetLoader(true));
//         const response = await AddMedicalHistory(payload);
//         if(response){
//           alert("added");
//           dispatch(SetLoader(false));
//         } else {
//           throw new Error(response.message);
//         }
//       } catch (error) {
//         console.log(error);
//         dispatch(SetLoader(false));
//       }
//       console.log("Backend response:");

//       // alert("Medical history saved and prescription uploaded!");
//       setShowModal(false);
//       // Reset form fields after successful submission
//       setFormData({
//         condition: "",
//         diagnosisDate: "",
//         medications: [""],
//         notes: "",
//         prescriptionFile: null,
//       });
//       setPreview("");
//     } catch (error) {
//       console.error("Submission Error:", error);
//       // More specific error messages based on error type
//       if (error.response) {
//         // Error from your backend or Cloudinary API response
//         alert(
//           `Error: ${error.response.data.message || error.response.statusText}`
//         );
//       } else if (error.request) {
//         // No response from server
//         alert(
//           "Network error: No response from server. Please check your connection."
//         );
//       } else {
//         // Other errors
//         alert("An unexpected error occurred. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="order-options-container">
//       <div className="order-title">
//         <span className="line" />
//         <span className="label">Place Your Order Via</span>
//         <span className="line" />
//       </div>

//       <div className="order-buttons">
//         <div className="order-card">
//           <div className="icon-box">
//             <FiPhoneCall className="icon" />
//           </div>
//           <div className="text-box">
//             <strong>Call 09240250346</strong> to place order
//           </div>
//         </div>

//         <div className="order-card" onClick={() => setShowModal(true)}>
//           <div className="icon-box">
//             <LuFilePlus className="icon" />
//           </div>
//           <div className="text-box">
//             Upload a <strong>prescription</strong>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>Upload Prescription</h3>

//             <input
//               type="text"
//               name="condition"
//               placeholder="Condition *"
//               value={formData.condition}
//               onChange={handleChange}
//             />
//             <input
//               type="date"
//               name="diagnosisDate"
//               value={formData.diagnosisDate}
//               onChange={handleChange}
//             />
//             {formData.medications.map((med, index) => (
//               <input
//                 key={index}
//                 type="text"
//                 name="medications"
//                 placeholder="Medication *"
//                 value={med}
//                 onChange={(e) => handleChange(e, index)}
//               />
//             ))}
//             <button type="button" onClick={addMedicationField}>
//               + Add Medication
//             </button>

//             <textarea
//               name="notes"
//               placeholder="Notes (optional)"
//               value={formData.notes}
//               onChange={handleChange}
//             />

//             <input type="file" onChange={handleFileChange} accept="image/*" />
//             {preview && (
//               <img
//                 src={preview}
//                 alt="Prescription Preview"
//                 width="120"
//                 height="120"
//                 style={{ marginTop: "10px", border: "1px solid #ddd" }}
//               />
//             )}

//             <div className="modal-actions">
//               <button type="submit" onClick={handleSubmit}>
//                 Submit
//               </button>
//               <button type="button" onClick={() => setShowModal(false)}>
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderOptions;

import React, { useState } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { LuFilePlus } from "react-icons/lu";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../redux/LoadingSlice";
import { AddMedicalHistory } from "../../Apicalls/user";
import styled from "styled-components";

const Container = styled.div`
  margin: 30px 0;
  text-align: center;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  font-size: 20px;
  font-weight: 600;
`;

const Label = styled.div`
  color: #111;
`;

const Line = styled.div`
  flex: 1;
  height: 1px;
  background: #ccc;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 25px;
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  background: #f5f5f5;
  padding: 15px 25px;
  border-radius: 10px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: #eaeaea;
  }
`;

const IconBox = styled.div`
  font-size: 24px;
  margin-right: 12px;
  color: #0066c3;
`;

const Icon = styled.div``;

const TextBox = styled.div`
  font-size: 16px;
  color: #333;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 25px;
  border-radius: 10px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  text-align: left;

  h3 {
    margin-bottom: 15px;
  }

  button {
    margin-top: 10px;
    padding: 8px 14px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background: #0062cc;
    }
  }
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  display: block;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  button:last-child {
    background: #dc3545;

    &:hover {
      background: #c82333;
    }
  }
`;

const OrderOptions = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    condition: "",
    diagnosisDate: "",
    medications: [""],
    notes: "",
    prescriptionFile: null,
  });
  const [preview, setPreview] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e, index) => {
    if (e.target.name === "medications") {
      const meds = [...formData.medications];
      meds[index] = e.target.value;
      setFormData({ ...formData, medications: meds });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const addMedicationField = () => {
    setFormData({ ...formData, medications: [...formData.medications, ""] });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, prescriptionFile: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, prescriptionFile: null });
      setPreview("");
    }
  };

  const handleSubmit = async () => {
    if (
      !formData.condition ||
      !formData.diagnosisDate ||
      formData.medications.some((med) => !med.trim()) ||
      !formData.prescriptionFile
    ) {
      alert("Please fill all required fields and upload a prescription.");
      return;
    }

    try {
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", formData.prescriptionFile);
      cloudinaryFormData.append("upload_preset", "apna-meds");
      cloudinaryFormData.append("cloud_name", "dejqyvuqj");

      const cloudRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinaryFormData.get(
          "cloud_name"
        )}/image/upload`,
        cloudinaryFormData
      );

      const prescriptionUrl = cloudRes.data.secure_url;

      const payload = {
        condition: formData.condition,
        diagnosisDate: formData.diagnosisDate,
        medications: formData.medications,
        notes: formData.notes,
        prescriptionUrl,
      };

      try {
        dispatch(SetLoader(true));
        const response = await AddMedicalHistory(payload);
        if (response) {
          alert("added");
          dispatch(SetLoader(false));
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        console.log(error);
        dispatch(SetLoader(false));
      }

      setShowModal(false);
      setFormData({
        condition: "",
        diagnosisDate: "",
        medications: [""],
        notes: "",
        prescriptionFile: null,
      });
      setPreview("");
    } catch (error) {
      console.error("Submission Error:", error);
      if (error.response) {
        alert(
          `Error: ${error.response.data.message || error.response.statusText}`
        );
      } else if (error.request) {
        alert("Network error: No response from server.");
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <Container>
      <Title>
        <Line />
        <Label>Place Your Order Via</Label>
        <Line />
      </Title>
      <Buttons>
        <Card>
          <IconBox>
            <Icon as={FiPhoneCall} />
          </IconBox>
          <TextBox>
            <strong>Call 09240250346</strong> to place order
          </TextBox>
        </Card>

        <Card onClick={() => setShowModal(true)}>
          <IconBox>
            <Icon as={LuFilePlus} />
          </IconBox>
          <TextBox>
            Upload a <strong>prescription</strong>
          </TextBox>
        </Card>
      </Buttons>

      {showModal && (
        <ModalOverlay>
          <Modal>
            <h3>Upload Prescription</h3>
            <Input
              type="text"
              name="condition"
              placeholder="Condition *"
              value={formData.condition}
              onChange={handleChange}
            />
            <Input
              type="date"
              name="diagnosisDate"
              value={formData.diagnosisDate}
              onChange={handleChange}
            />
            {formData.medications.map((med, index) => (
              <Input
                key={index}
                type="text"
                name="medications"
                placeholder="Medication *"
                value={med}
                onChange={(e) => handleChange(e, index)}
              />
            ))}
            <button type="button" onClick={addMedicationField}>
              + Add Medication
            </button>
            <TextArea
              name="notes"
              placeholder="Notes (optional)"
              value={formData.notes}
              onChange={handleChange}
            />
            <Input type="file" onChange={handleFileChange} accept="image/*" />
            {preview && (
              <img
                src={preview}
                alt="Prescription Preview"
                width="120"
                height="120"
                style={{ marginTop: "10px", border: "1px solid #ddd" }}
              />
            )}
            <ModalActions>
              <button onClick={handleSubmit}>Submit</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </ModalActions>
          </Modal>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default OrderOptions;
