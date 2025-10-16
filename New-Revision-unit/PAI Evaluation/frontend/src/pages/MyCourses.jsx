import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/authcontext";


export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get("http://localhost:5000/api/enrollments/my-courses", {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(res => setCourses(res.data));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map(c => (
          <div key={c._id} className="border p-4">
            <h2 className="font-bold">{c.title}</h2>
            <p>{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
