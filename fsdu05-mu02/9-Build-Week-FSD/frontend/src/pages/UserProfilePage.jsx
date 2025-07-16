import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile, resetUpdateSuccess } from '../slices/userSlice.js';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import '../styles/components.css'; // Import component-specific styles
import '../styles/pages.css'; // Assuming page-specific styles

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const { profile, isLoading, error, success } = useSelector((state) => state.user);
  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [medicalHistory, setMedicalHistory] = useState([]);
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => {
    if (!userInfo) {
      // Redirect or handle unauthenticated state (handled by PrivateRoute)
      return;
    }
    if (!profile || success) { // Fetch profile if not loaded or if update was successful
      dispatch(getUserProfile());
      dispatch(resetUpdateSuccess()); // Reset success flag after fetching
    } else {
      setName(profile.name);
      setEmail(profile.email);
      setMedicalHistory(profile.medicalHistory || []);
    }
  }, [dispatch, userInfo, profile, success]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ name, email }));
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setPasswordMessage('');

    if (newPassword !== confirmNewPassword) {
      setPasswordMessage('New passwords do not match.');
      return;
    }

    if (!oldPassword || !newPassword) {
      setPasswordMessage('Please provide both current and new passwords.');
      return;
    }

    dispatch(updateUserProfile({ oldPassword, newPassword }))
      .then(() => {
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setPasswordMessage('Password updated successfully!');
      })
      .catch(() => {
        // Error message handled by notificationSlice
        setPasswordMessage('Failed to update password.');
      });
  };

  const handleMedicalHistoryChange = (index, field, value) => {
    const updatedHistory = [...medicalHistory];
    updatedHistory[index][field] = value;
    setMedicalHistory(updatedHistory);
  };

  const addMedicalHistoryEntry = () => {
    setMedicalHistory([...medicalHistory, { condition: '', diagnosisDate: '', medications: [], notes: '' }]);
  };

  const removeMedicalHistoryEntry = (index) => {
    const updatedHistory = medicalHistory.filter((_, i) => i !== index);
    setMedicalHistory(updatedHistory);
  };

  const handleMedicalHistorySave = () => {
    dispatch(updateUserProfile({ medicalHistory }));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p className="upload-message error text-center">{error}</p>;
  }

  if (!profile) {
    return <p className="text-center">No user profile found.</p>;
  }

  return (
    <div className="profile-container my-xl">
      <h2>User Profile</h2>

      <section className="profile-section">
        <h3>Personal Information</h3>
        <form onSubmit={handleProfileUpdate}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Profile
          </button>
        </form>
      </section>

      <section className="profile-section">
        <h3>Change Password</h3>
        {passwordMessage && <p className={`upload-message ${passwordMessage.includes('successfully') ? 'success' : 'error'}`}>{passwordMessage}</p>}
        <form onSubmit={handlePasswordUpdate}>
          <div className="form-group">
            <label htmlFor="oldPassword">Current Password</label>
            <input
              type="password"
              id="oldPassword"
              placeholder="Enter current password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmNewPassword">Confirm New Password</label>
            <input
              type="password"
              id="confirmNewPassword"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Change Password
          </button>
        </form>
      </section>

      <section className="profile-section">
        <h3>Medical History</h3>
        {medicalHistory.length === 0 && <p>No medical history recorded yet.</p>}
        {medicalHistory.map((entry, index) => (
          <div key={index} className="medical-history-item">
            <div className="form-group">
              <label>Condition:</label>
              <input
                type="text"
                value={entry.condition}
                onChange={(e) => handleMedicalHistoryChange(index, 'condition', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Diagnosis Date:</label>
              <input
                type="date"
                value={entry.diagnosisDate ? new Date(entry.diagnosisDate).toISOString().split('T')[0] : ''}
                onChange={(e) => handleMedicalHistoryChange(index, 'diagnosisDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Medications (comma-separated):</label>
              <input
                type="text"
                value={Array.isArray(entry.medications) ? entry.medications.join(', ') : entry.medications}
                onChange={(e) => handleMedicalHistoryChange(index, 'medications', e.target.value.split(',').map(s => s.trim()))}
              />
            </div>
            <div className="form-group">
              <label>Notes:</label>
              <textarea
                value={entry.notes}
                onChange={(e) => handleMedicalHistoryChange(index, 'notes', e.target.value)}
              ></textarea>
            </div>
            <button
              type="button"
              onClick={() => removeMedicalHistoryEntry(index)}
              className="btn btn-danger btn-sm"
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addMedicalHistoryEntry} className="btn btn-secondary mt-md">
          Add Medical Condition
        </button>
        {medicalHistory.length > 0 && (
          <button type="button" onClick={handleMedicalHistorySave} className="btn btn-primary mt-md" style={{ marginLeft: 'var(--spacing-md)' }}>
            Save Medical History
          </button>
        )}
      </section>
    </div>
  );
};

export default UserProfilePage;