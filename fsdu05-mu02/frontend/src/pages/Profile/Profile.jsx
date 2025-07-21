// import React, { useState } from "react";
// import axios from "axios";
// import "./Profile.css";

// const Profile = () => {
//   const [user, setUser] = useState({
//     name: "",
//     email: "",
//     medicalHistory: [],
//   });

//   const [newCondition, setNewCondition] = useState({
//     condition: "",
//     diagnosisDate: "",
//     medications: "",
//     notes: "",
//   });

//   const [image, setImage] = useState("");
//   const [uploading, setUploading] = useState(false);

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "your_upload_preset"); // from Cloudinary

//     try {
//       setUploading(true);
//       const res = await axios.post(
//         "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
//         formData
//       );
//       setImage(res.data.secure_url);
//     } catch (err) {
//       console.error("Upload error:", err);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleAddCondition = () => {
//     if (
//       newCondition.condition &&
//       newCondition.diagnosisDate &&
//       newCondition.medications
//     ) {
//       setUser((prev) => ({
//         ...prev,
//         medicalHistory: [...prev.medicalHistory, newCondition],
//       }));
//       setNewCondition({
//         condition: "",
//         diagnosisDate: "",
//         medications: "",
//         notes: "",
//       });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const updatedUser = { ...user, profilePic: image };
//     console.log("User Data to Submit:", updatedUser);
//     alert("Profile updated! Check console for data.");
//   };

//   return (
//     <div className="profile-container">
//       <h2>Update Your Profile</h2>

//       <form onSubmit={handleSubmit} className="profile-form">
//         <div className="image-upload">
//           <label htmlFor="imageUpload">
//             {uploading ? "Uploading..." : image ? <img src={image} alt="Profile" /> : "Upload Profile Picture"}
//           </label>
//           <input
//             type="file"
//             id="imageUpload"
//             onChange={handleImageUpload}
//             hidden
//           />
//         </div>

//         <input
//           type="text"
//           placeholder="Name"
//           value={user.name}
//           required
//           onChange={(e) => setUser({ ...user, name: e.target.value })}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={user.email}
//           required
//           onChange={(e) => setUser({ ...user, email: e.target.value })}
//         />

//         <div className="medical-section">
//           <h3>Medical History</h3>
//           <input
//             type="text"
//             placeholder="Condition"
//             value={newCondition.condition}
//             onChange={(e) =>
//               setNewCondition({ ...newCondition, condition: e.target.value })
//             }
//           />
//           <input
//             type="date"
//             value={newCondition.diagnosisDate}
//             onChange={(e) =>
//               setNewCondition({ ...newCondition, diagnosisDate: e.target.value })
//             }
//           />
//           <input
//             type="text"
//             placeholder="Medications (comma separated)"
//             value={newCondition.medications}
//             onChange={(e) =>
//               setNewCondition({ ...newCondition, medications: e.target.value })
//             }
//           />
//           <textarea
//             placeholder="Notes"
//             value={newCondition.notes}
//             onChange={(e) =>
//               setNewCondition({ ...newCondition, notes: e.target.value })
//             }
//           ></textarea>
//           <button type="button" onClick={handleAddCondition} className="add-btn">
//             + Add Condition
//           </button>

//           <ul className="history-list">
//             {user.medicalHistory.map((item, index) => (
//               <li key={index}>
//                 <strong>{item.condition}</strong> — {item.diagnosisDate}
//                 <br />
//                 Medications: {item.medications}
//                 <br />
//                 Notes: {item.notes}
//               </li>
//             ))}
//           </ul>
//         </div>

//         <button type="submit" className="submit-btn">
//           Save Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Profile;

import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  max-width: 700px;
  margin: auto;
  padding: 2rem;
  background: #ffffff;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  font-family: "Segoe UI", sans-serif;

  h2 {
    text-align: center;
    color: #333;
    margin-bottom: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ImageUpload = styled.div`
  text-align: center;
  margin-bottom: 1rem;

  label {
    display: inline-block;
    background-color: #eee;
    padding: 1rem;
    border-radius: 50%;
    cursor: pointer;
    transition: 0.3s;
  }

  img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
  }

  @media (max-width: 600px) {
    img {
      width: 90px;
      height: 90px;
    }
  }
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 80px;
`;

const MedicalSection = styled.div`
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 12px;

  h3 {
    margin-bottom: 1rem;
    color: #555;
  }
`;

const AddButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const SubmitButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const HistoryList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-top: 1rem;

  li {
    margin-bottom: 0.8rem;
    background: #f1f1f1;
    padding: 0.8rem;
    border-radius: 10px;
  }
`;

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    medicalHistory: [],
  });

  const [newCondition, setNewCondition] = useState({
    condition: "",
    diagnosisDate: "",
    medications: "",
    notes: "",
  });

  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset");

    try {
      setUploading(true);
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        formData
      );
      setImage(res.data.secure_url);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleAddCondition = () => {
    if (
      newCondition.condition &&
      newCondition.diagnosisDate &&
      newCondition.medications
    ) {
      setUser((prev) => ({
        ...prev,
        medicalHistory: [...prev.medicalHistory, newCondition],
      }));
      setNewCondition({
        condition: "",
        diagnosisDate: "",
        medications: "",
        notes: "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, profilePic: image };
    console.log("User Data to Submit:", updatedUser);
    alert("Profile updated! Check console for data.");
  };

  return (
    <Container>
      <h2>Update Your Profile</h2>
      <Form onSubmit={handleSubmit}>
        <ImageUpload>
          <label htmlFor="imageUpload">
            {uploading ? "Uploading..." : image ? <img src={image} alt="Profile" /> : "Upload Profile Picture"}
          </label>
          <input type="file" id="imageUpload" onChange={handleImageUpload} hidden />
        </ImageUpload>

        <Input
          type="text"
          placeholder="Name"
          value={user.name}
          required
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <Input
          type="email"
          placeholder="Email"
          value={user.email}
          required
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <MedicalSection>
          <h3>Medical History</h3>
          <Input
            type="text"
            placeholder="Condition"
            value={newCondition.condition}
            onChange={(e) =>
              setNewCondition({ ...newCondition, condition: e.target.value })
            }
          />
          <Input
            type="date"
            value={newCondition.diagnosisDate}
            onChange={(e) =>
              setNewCondition({ ...newCondition, diagnosisDate: e.target.value })
            }
          />
          <Input
            type="text"
            placeholder="Medications (comma separated)"
            value={newCondition.medications}
            onChange={(e) =>
              setNewCondition({ ...newCondition, medications: e.target.value })
            }
          />
          <Textarea
            placeholder="Notes"
            value={newCondition.notes}
            onChange={(e) =>
              setNewCondition({ ...newCondition, notes: e.target.value })
            }
          />
          <AddButton type="button" onClick={handleAddCondition}>
            + Add Condition
          </AddButton>

          <HistoryList>
            {user.medicalHistory.map((item, index) => (
              <li key={index}>
                <strong>{item.condition}</strong> — {item.diagnosisDate}
                <br />
                Medications: {item.medications}
                <br />
                Notes: {item.notes}
              </li>
            ))}
          </HistoryList>
        </MedicalSection>

        <SubmitButton type="submit">Save Profile</SubmitButton>
      </Form>
    </Container>
  );
};

export default Profile;
