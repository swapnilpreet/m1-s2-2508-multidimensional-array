
import express  from "express"
import { createStudent, getStudentById, getStudents } from "../controllers/studentController";


const router=express.Router();

router.post("/students",createStudent);
router.get("/students", getStudents);
router.get("/students/:id", getStudentById);
export default router;


