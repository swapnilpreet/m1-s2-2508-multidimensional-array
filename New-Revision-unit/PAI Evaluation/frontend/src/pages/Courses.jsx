import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authcontext";


export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useContext(AuthContext);

  const fetchCourses = async () => {
    const res = await axios.get(`http://localhost:5000/api/courses?search=${search}`);
    setCourses(res.data);
  };

  useEffect(() => { fetchCourses(); }, [search]);

  const enroll = async (id) => {
    try {
      await axios.post(`http://localhost:5000/api/enrollments/enroll/${id}`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      alert("Enrolled!");
    } catch (err) {
      alert(err.response.data.msg || "Error");
    }
  };

  return (
    <div className="p-4">
      <input type="text" placeholder="Search" value={search} onChange={e=>setSearch(e.target.value)} className="border p-2 mb-4 w-full"/>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map(c => (
          <div key={c._id} className="border p-4">
            <h2 className="font-bold">{c.title}</h2>
            <p>{c.description}</p>
            <p className="font-semibold">Price: {c.price}</p>
            {user && user.role === "student" && (
              <button onClick={()=>enroll(c._id)} className="bg-green-500 text-white p-2 mt-2">Enroll</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
