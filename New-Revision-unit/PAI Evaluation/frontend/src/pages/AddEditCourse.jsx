import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authcontext";

export default function AddEditCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/courses", 
        { title, description, category, price },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      alert("Course added!");
      navigate("/");
    } catch (err) {
      alert(err.response.data.msg || "Error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-4 border">
      <h2 className="text-xl font-bold mb-4">Add Course</h2>
      <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} className="border p-2 w-full mb-2"/>
      <input type="text" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} className="border p-2 w-full mb-2"/>
      <input type="text" placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} className="border p-2 w-full mb-2"/>
      <input type="number" placeholder="Price" value={price} onChange={e=>setPrice(e.target.value)} className="border p-2 w-full mb-2"/>
      <button type="submit" className="bg-green-500 text-white p-2 w-full">Add Course</button>
    </form>
  );
}
