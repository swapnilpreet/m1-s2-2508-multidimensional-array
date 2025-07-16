import api from './api.js';

const uploadPrescription = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append('prescription', file);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: onUploadProgress, // Pass progress callback
  };

  const { data } = await api.post('/api/prescriptions/upload', formData, config);
  return data;
};

const prescriptionService = {
  uploadPrescription,
};

export default prescriptionService;