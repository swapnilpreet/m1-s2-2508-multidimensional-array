import React from 'react';
import { useFeedback } from '../context/FeedbackContext';
import { useNavigate } from 'react-router-dom';

const Summary: React.FC = () => {
  const { data } = useFeedback();
  const navigate = useNavigate();
  if (!data.name || !data.email || !data.feedback || data.rating < 1) {
    navigate('/');
    return null;
  }

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <h2>Feedback Summary</h2>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Email:</strong> {data.email}</p>
      <p><strong>Rating:</strong> {data.rating}</p>
      <p><strong>Feedback:</strong> {data.feedback}</p>
      <button onClick={() => navigate('/')}>Edit</button>
    </div>
  );
};

export default Summary;
