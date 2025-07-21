import { axiosInstance } from "./axiosinstance";



export const SignupUser=async(payload)=>{
    try {
        const response=await axiosInstance.post('/api/auth/register',payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}


export const LoginUser=async(payload)=>{
    try {
        const response=await axiosInstance.post('/api/auth/login',payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}


export const AddMedicalHistory=async(payload)=>{
    try {
        const response=await axiosInstance.post('/api/users/medical-history',payload);
        return response.data;
    } catch (error) {
        return error.message;
    }
}



export const GetCurrentUser=async()=>{
    try {
        const response=await axiosInstance.get('/api/users/profile');
        return response.data;
    } catch (error) {
        return error.message;
    }
}


export const AddMedicineTocart = async (medicineId)=>{
    try {
        const response = await axiosInstance.post('/api/users/cart', medicineId);
        return response.data;
    } catch (error) {
        return error.message;
    }
}

export const GetMyAllcart = async()=>{
    try {
        const response = await axiosInstance.get('/api/users/getcart');
        return response.data;
    } catch (error) {
        return error.message;
    }
}


export const Clearmycart = async()=>{
    try {
        const response = await axiosInstance.get('/api/users/clear-cart');
        return response.data;
    } catch (error) {
        return error.message;
    }
}


