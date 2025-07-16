import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPrescription, setUploadProgress, clearUploadState } from '../../slices/prescriptionSlice.js';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import '../../styles/components.css'; // Import component-specific styles

const PrescriptionUpload = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const { isLoading, error, uploadProgress, uploadedPrescription } = useSelector((state) => state.prescriptions);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        dispatch(clearUploadState());
        dispatch(showNotification({ message: 'File size exceeds 5MB limit.', type: 'error' }));
        return;
      }
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(selectedFile.type)) {
        dispatch(clearUploadState());
        dispatch(showNotification({ message: 'Only JPG, PNG, and PDF formats are allowed.', type: 'error' }));
        return;
      }
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      dispatch(clearUploadState()); // Clear previous state on new file selection
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    e.currentTarget.classList.add('drag-over'); // Add a class for visual feedback
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('drag-over');
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      if (droppedFile.size > 5 * 1024 * 1024) { // 5MB limit
        dispatch(clearUploadState());
        dispatch(showNotification({ message: 'File size exceeds 5MB limit.', type: 'error' }));
        return;
      }
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(droppedFile.type)) {
        dispatch(clearUploadState());
        dispatch(showNotification({ message: 'Only JPG, PNG, and PDF formats are allowed.', type: 'error' }));
        return;
      }
      setFile(droppedFile);
      setPreviewUrl(URL.createObjectURL(droppedFile));
      dispatch(clearUploadState()); // Clear previous state on new file selection
    }
  };

  const handleUpload = async () => {
    if (!file) {
      dispatch(showNotification({ message: 'Please select a file to upload.', type: 'error' }));
      return;
    }

    // Pass a progress callback to the service
    const onProgress = (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      dispatch(setUploadProgress(percentCompleted));
    };

    dispatch(uploadPrescription(file, onProgress)); // Pass file and progress callback
  };

  return (
    <div className="prescription-upload-container">
      <h3>Upload Your Prescription</h3>
      <div
        className="drag-drop-area"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }}
          accept="image/jpeg,image/png,application/pdf"
        />
        <p>Drag & Drop your prescription here, or click to select file</p>
        <p className="file-format-info">Accepted formats: JPG, PNG, PDF (Max 5MB)</p>
      </div>

      {file && (
        <div className="file-info">
          <p>Selected File: {file.name}</p>
          {previewUrl && file.type.startsWith('image/') && (
            <div className="image-preview">
              <img src={previewUrl} alt="Prescription Preview" />
            </div>
          )}
          {isLoading && uploadProgress > 0 && uploadProgress < 100 && (
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${uploadProgress}%` }}>
                {uploadProgress}%
              </div>
            </div>
          )}
          <button
            onClick={handleUpload}
            className="btn btn-primary upload-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Uploading...' : 'Upload Prescription'}
          </button>
        </div>
      )}
      {error && <p className="upload-message error">{error}</p>}
      {uploadedPrescription && !isLoading && !error && (
        <p className="upload-message success">Prescription uploaded successfully!</p>
      )}
    </div>
  );
};

export default PrescriptionUpload;