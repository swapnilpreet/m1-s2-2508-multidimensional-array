// import React, { useState } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import "./Admin.css";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// const Admin = () => {
 
//   const [activeTab, setActiveTab] = useState("orders");
//   const [showMedicineForm, setShowMedicineForm] = useState(false);
//   const [editableUser, setEditableUser] = useState(false);
//   const [editableMedicine, setEditableMedicine] = useState(false);

//     // const GetAllOrder = async () => {
//     //   try {
//     //     const response = await ;
//     //     if (response?.data) {
//     //     } else {
//     //       throw new Error(response.message);
//     //     }
//     //   } catch (error) {
//     //     console.log(error.message);
//     //   }
//     // };

//     // const GetAllUsers = async () => {
//     //   try {
//     //     const response = await ;
//     //     if (response?.data) {
//     //     } else {
//     //       throw new Error(response.message);
//     //     }
//     //   } catch (error) {
//     //     console.log(error.message);
//     //   }
//     // };

//     // const GetAllMedicines = async () => {
//     //   try {
//     //     const response = await ;
//     //     if (response?.data) {
//     //     } else {
//     //       throw new Error(response.message);
//     //     }
//     //   } catch (error) {
//     //     console.log(error.message);
//     //   }
//     // };

//     // const AddMedicine= async () => {
//     // try {
//     //   const response = await ;
//     //   if (response?.data) {
//     //   } else {
//     //     throw new Error(response.message);
//     //   }
//     // } catch (error) {
//     //   console.log(error.message);
//     // }
//     // };

//     // const EditUser = async () => {
//     //   try {
//     //     const response = await ;
//     //     if (response?.data) {
//     //     } else {
//     //       throw new Error(response.message);
//     //     }
//     //   } catch (error) {
//     //     console.log(error.message);
//     //   }
//     // };

//     // const EditMedicine= async () => {
//     //   try {
//     //     const response = await ;
//     //     if (response?.data) {
//     //     } else {
//     //       throw new Error(response.message);
//     //     }
//     //   } catch (error) {
//     //     console.log(error.message);
//     //   }
//     // };

//   const [userData, setUserData] = useState({
//     id: "#USR001",
//     name: "Jane Smith",
//     email: "jane@email.com",
//     role: "User"
//   });

//   const [medicineData, setMedicineData] = useState({
//     id: "#MED001",
//     name: "Paracetamol",
//     chemical: "Acetaminophen",
//     company: "ABC Pharma",
//     price: "₹10",
//     image: "https://via.placeholder.com/40",
//     category: "Painkiller"
//   });

//   const statsData = [
//     { name: "Week", Users: 20, Orders: 35, Medicines: 5 },
//     { name: "Month", Users: 80, Orders: 150, Medicines: 25 },
//     { name: "Year", Users: 900, Orders: 1100, Medicines: 300 }
//   ];

//   const handleUserChange = (e, field) => {
//     setUserData({ ...userData, [field]: e.target.value });
//   };

//   const handleMedicineChange = (e, field) => {
//     setMedicineData({ ...medicineData, [field]: e.target.value });
//   };

//   const renderOrders = () => (
//     <div className="tab-content">
//       <h2>All Orders</h2>
//       <table className="data-table">
//         <thead>
//           <tr>
//             <th>Order ID</th><th>User</th><th>Status</th><th>Action</th><th>API Call</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>#ORD123</td><td>John Doe</td><td>Processing</td>
//             <td>
//               <select>
//                 <option>Processing</option>
//                 <option>Shipped</option>
//                 <option>On the Way</option>
//                 <option>Delivered</option>
//               </select>
//             </td>
//             <td><button onClick={() => alert("API Called for order")}>Update</button></td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );

//   const renderMedicines = () => (
//     <div className="tab-content">
//       <h2>Manage Medicines</h2>
//       <button onClick={() => setShowMedicineForm(!showMedicineForm)}>
//         {showMedicineForm ? "Close Form" : "Add Medicine"}
//       </button>

//       {showMedicineForm && (
//         <form className="medicine-form">
//           <input type="text" placeholder="Medicine Name" />
//           <input type="text" placeholder="Chemical Name" />
//           <input type="text" placeholder="Company Name" />
//           <input type="number" placeholder="Price" />
//           <input type="text" placeholder="Category" />
//           <input type="text" placeholder="Image URL" />
//           <textarea placeholder="Description" rows={3} />
//           <button type="submit">Add Medicine</button>
//         </form>
//       )}

//       <div className="medicine-list">
//         <h3>Existing Medicines</h3>
//         <table className="data-table">
//           <thead>
//             <tr>
//               <th>ID</th><th>Name</th><th>Chemical</th><th>Company</th><th>Price</th><th>Image</th><th>Category</th><th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>{medicineData.id}</td>
//               <td>{editableMedicine ? <input value={medicineData.name} onChange={(e) => handleMedicineChange(e, 'name')} /> : medicineData.name}</td>
//               <td>{editableMedicine ? <input value={medicineData.chemical} onChange={(e) => handleMedicineChange(e, 'chemical')} /> : medicineData.chemical}</td>
//               <td>{editableMedicine ? <input value={medicineData.company} onChange={(e) => handleMedicineChange(e, 'company')} /> : medicineData.company}</td>
//               <td>{editableMedicine ? <input value={medicineData.price} onChange={(e) => handleMedicineChange(e, 'price')} /> : medicineData.price}</td>
//               <td>{editableMedicine ? <input value={medicineData.image} onChange={(e) => handleMedicineChange(e, 'image')} /> : <img src={medicineData.image} alt="med" />}</td>
//               <td>{editableMedicine ? <input value={medicineData.category} onChange={(e) => handleMedicineChange(e, 'category')} /> : medicineData.category}</td>
//               <td>
//                 <button onClick={() => setEditableMedicine(!editableMedicine)}>{editableMedicine ? "Save" : "Edit"}</button>
//                 <button className="delete" onClick={() => alert("Delete API Called")}>Delete</button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );

//   const renderUsers = () => (
//     <div className="tab-content">
//       <h2>All Users</h2>
//       <table className="data-table">
//         <thead>
//           <tr><th>User ID</th><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>{userData.id}</td>
//             <td>{editableUser ? <input value={userData.name} onChange={(e) => handleUserChange(e, 'name')} /> : userData.name}</td>
//             <td>{editableUser ? <input value={userData.email} onChange={(e) => handleUserChange(e, 'email')} /> : userData.email}</td>
//             <td>{editableUser ? <input value={userData.role} onChange={(e) => handleUserChange(e, 'role')} /> : userData.role}</td>
//             <td>
//               <button onClick={() => setEditableUser(!editableUser)}>{editableUser ? "Save" : "Edit"}</button>
//               <button className="delete" onClick={() => alert("Delete User API Called")}>Delete</button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );

//   const renderStats = () => {
//     const labels = statsData.map((item) => item.name);
//     const data = {
//       labels,
//       datasets: [
//         {
//           label: "Users",
//           data: statsData.map(item => item.Users),
//           backgroundColor: "#8884d8"
//         },
//         {
//           label: "Orders",
//           data: statsData.map(item => item.Orders),
//           backgroundColor: "#82ca9d"
//         },
//         {
//           label: "Medicines",
//           data: statsData.map(item => item.Medicines),
//           backgroundColor: "#ffc658"
//         }
//       ]
//     };
//     const options = {
//       responsive: true,
//       plugins: {
//         legend: { position: "top" },
//         title: { display: true, text: "User, Order, and Medicine Stats" }
//       }
//     };

//     return (
//       <div className="tab-content">
//         <h2>Dashboard</h2>
//         <div style={{ width: "100%", height: "400px" }}>
//           <Bar data={data} options={options} />
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="admin-panel">
//       <h1>Admin Panel</h1>
//       <div className="tabs">
//         <button onClick={() => setActiveTab("orders")} className={activeTab === "orders" ? "active" : ""}>Orders</button>
//         <button onClick={() => setActiveTab("medicines")} className={activeTab === "medicines" ? "active" : ""}>Medicines</button>
//         <button onClick={() => setActiveTab("users")} className={activeTab === "users" ? "active" : ""}>Users</button>
//         <button onClick={() => setActiveTab("stats")} className={activeTab === "stats" ? "active" : ""}>Stats</button>
//       </div>
//       <div className="panel-content">
//         {activeTab === "orders" && renderOrders()}
//         {activeTab === "medicines" && renderMedicines()}
//         {activeTab === "users" && renderUsers()}
//         {activeTab === "stats" && renderStats()}
//       </div>
//     </div>
//   );
// };

// export default Admin;

import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styled from "styled-components";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminWrapper = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: auto;
  font-family: "Segoe UI", sans-serif;
`;

const TitleHeading = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

const Tabs = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const TabButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: ${(props) => (props.active ? "#007bff" : "#f0f0f0")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
`;

const Content = styled.div`
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th,
  td {
    border: 1px solid #ddd;
    padding: 0.8rem;
    text-align: left;
    font-size: 1rem;
  }

  th {
    background-color: #f7f7f7;
  }

  @media (max-width: 768px) {
    th,
    td {
      font-size: 0.9rem;
    }
  }
`;

const Input = styled.input`
  padding: 0.6rem;
  margin-top: 0.5rem;
  width: 100%;
  max-width: 400px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
`;

const TextArea = styled.textarea`
  padding: 0.6rem;
  margin-top: 0.5rem;
  width: 100%;
  max-width: 400px;
  border-radius: 6px;
  border: 1px solid #ccc;
  outline: none;
`;

const Select = styled.select`
  padding: 0.6rem;
  margin-top: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: ${(props) => (props.delete ? "#dc3545" : "#28a745")};
  color: white;
  cursor: pointer;
  border: none;
  padding: 0.6rem 1.2rem;
  margin-top: 0.5rem;
  border-radius: 6px;
  width: fit-content;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Admin = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const [showMedicineForm, setShowMedicineForm] = useState(false);
  const [editableUser, setEditableUser] = useState(false);
  const [editableMedicine, setEditableMedicine] = useState(false);

  const [userData, setUserData] = useState({
    id: "#USR001",
    name: "Jane Smith",
    email: "jane@email.com",
    role: "User"
  });

  const [medicineData, setMedicineData] = useState({
    id: "#MED001",
    name: "Paracetamol",
    chemical: "Acetaminophen",
    company: "ABC Pharma",
    price: "₹10",
    image: "https://via.placeholder.com/40",
    category: "Painkiller"
  });

  const statsData = [
    { name: "Week", Users: 20, Orders: 35, Medicines: 5 },
    { name: "Month", Users: 80, Orders: 150, Medicines: 25 },
    { name: "Year", Users: 900, Orders: 1100, Medicines: 300 }
  ];

  const handleUserChange = (e, field) => {
    setUserData({ ...userData, [field]: e.target.value });
  };

  const handleMedicineChange = (e, field) => {
    setMedicineData({ ...medicineData, [field]: e.target.value });
  };

  const renderOrders = () => (
    <Content>
      <h2>All Orders</h2>
      <Table>
        <thead>
          <tr>
            <th>Order ID</th><th>User</th><th>Status</th><th>Action</th><th>API Call</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#ORD123</td><td>John Doe</td><td>Processing</td>
            <td>
              <Select>
                <option>Processing</option>
                <option>Shipped</option>
                <option>On the Way</option>
                <option>Delivered</option>
              </Select>
            </td>
            <td><Button onClick={() => alert("API Called for order")}>Update</Button></td>
          </tr>
        </tbody>
      </Table>
    </Content>
  );

  const renderMedicines = () => (
    <Content>
      <h2>Manage Medicines</h2>
      <Button onClick={() => setShowMedicineForm(!showMedicineForm)}>
        {showMedicineForm ? "Close Form" : "Add Medicine"}
      </Button>

      {showMedicineForm && (
        <form>
          <Input type="text" placeholder="Medicine Name" />
          <Input type="text" placeholder="Chemical Name" />
          <Input type="text" placeholder="Company Name" />
          <Input type="number" placeholder="Price" />
          <Input type="text" placeholder="Category" />
          <Input type="text" placeholder="Image URL" />
          <TextArea placeholder="Description" rows={3} />
          <Button type="submit">Add Medicine</Button>
        </form>
      )}

      <div>
        <h3>Existing Medicines</h3>
        <Table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Chemical</th><th>Company</th><th>Price</th><th>Image</th><th>Category</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{medicineData.id}</td>
              <td>{editableMedicine ? <Input value={medicineData.name} onChange={(e) => handleMedicineChange(e, 'name')} /> : medicineData.name}</td>
              <td>{editableMedicine ? <Input value={medicineData.chemical} onChange={(e) => handleMedicineChange(e, 'chemical')} /> : medicineData.chemical}</td>
              <td>{editableMedicine ? <Input value={medicineData.company} onChange={(e) => handleMedicineChange(e, 'company')} /> : medicineData.company}</td>
              <td>{editableMedicine ? <Input value={medicineData.price} onChange={(e) => handleMedicineChange(e, 'price')} /> : medicineData.price}</td>
              <td>{editableMedicine ? <Input value={medicineData.image} onChange={(e) => handleMedicineChange(e, 'image')} /> : <img src={medicineData.image} alt="med" />}</td>
              <td>{editableMedicine ? <Input value={medicineData.category} onChange={(e) => handleMedicineChange(e, 'category')} /> : medicineData.category}</td>
              <td>
                <Button onClick={() => setEditableMedicine(!editableMedicine)}>{editableMedicine ? "Save" : "Edit"}</Button>
                <Button delete onClick={() => alert("Delete API Called")}>Delete</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Content>
  );

  const renderUsers = () => (
    <Content>
      <h2>All Users</h2>
      <Table>
        <thead>
          <tr><th>User ID</th><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>{userData.id}</td>
            <td>{editableUser ? <Input value={userData.name} onChange={(e) => handleUserChange(e, 'name')} /> : userData.name}</td>
            <td>{editableUser ? <Input value={userData.email} onChange={(e) => handleUserChange(e, 'email')} /> : userData.email}</td>
            <td>{editableUser ? <Input value={userData.role} onChange={(e) => handleUserChange(e, 'role')} /> : userData.role}</td>
            <td>
              <Button onClick={() => setEditableUser(!editableUser)}>{editableUser ? "Save" : "Edit"}</Button>
              <Button delete onClick={() => alert("Delete User API Called")}>Delete</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </Content>
  );

  const renderStats = () => {
    const labels = statsData.map((item) => item.name);
    const data = {
      labels,
      datasets: [
        {
          label: "Users",
          data: statsData.map(item => item.Users),
          backgroundColor: "#8884d8"
        },
        {
          label: "Orders",
          data: statsData.map(item => item.Orders),
          backgroundColor: "#82ca9d"
        },
        {
          label: "Medicines",
          data: statsData.map(item => item.Medicines),
          backgroundColor: "#ffc658"
        }
      ]
    };
    const options = {
      responsive: true,
      plugins: {
        legend: { position: "top" },
        title: { display: true, text: "User, Order, and Medicine Stats" }
      }
    };

    return (
      <Content>
        <h2>Dashboard</h2>
        <div style={{ width: "100%", height: "400px" }}>
          <Bar data={data} options={options} />
        </div>
      </Content>
    );
  };

  return (
    <AdminWrapper>
      <TitleHeading>Admin Panel</TitleHeading>
      <Tabs>
        <TabButton onClick={() => setActiveTab("orders")} active={activeTab === "orders"}>Orders</TabButton>
        <TabButton onClick={() => setActiveTab("medicines")} active={activeTab === "medicines"}>Medicines</TabButton>
        <TabButton onClick={() => setActiveTab("users")} active={activeTab === "users"}>Users</TabButton>
        <TabButton onClick={() => setActiveTab("stats")} active={activeTab === "stats"}>Stats</TabButton>
      </Tabs>
      {activeTab === "orders" && renderOrders()}
      {activeTab === "medicines" && renderMedicines()}
      {activeTab === "users" && renderUsers()}
      {activeTab === "stats" && renderStats()}
    </AdminWrapper>
  );
};

export default Admin;
