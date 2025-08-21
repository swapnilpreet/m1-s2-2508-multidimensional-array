import { Request, Response } from "express";
import StudentModel from "../models/Student"


export const createStudent =async (req:Request,res:Response)=>{
    try {
        const student=new StudentModel(req.body);
        await student.save();
        res.status(201).json({
            message:"student created successfully",
            student
        })
    } catch (error:any) {
        res.status(400).json({
            error:error.message ||  "Validation failed" 
        })
    }
}

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await StudentModel.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students" });
  }
};


export const getStudentById = async (req: Request, res: Response) => {
  try {
    const student = await StudentModel.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: "Invalid student ID" });
  }
};