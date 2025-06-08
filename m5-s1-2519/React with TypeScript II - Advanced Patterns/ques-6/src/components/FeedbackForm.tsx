import React, { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFeedback } from '../context/FeedbackContext';

const FeedbackForm: React.FC = () => {
  const { data, setData } = useFeedback();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { name, email, rating, feedback } = data;
    if (!name || !email || rating < 1 || rating > 5 || !feedback) {
      alert('Please fill out all fields correctly.');
      return;
    }

    navigate('/summary');
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: '0 auto' }}>
      <h2>Feedback Form</h2>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={data.name}
        onChange={handleChange}
        required
      />
      <br />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
        required
      />
      <br />

      <input
        type="number"
        name="rating"
        placeholder="Rating (1-5)"
        value={data.rating}
        onChange={handleChange}
        min={1}
        max={5}
        required
      />
      <br />

      <textarea
        name="feedback"
        placeholder="Your feedback..."
        value={data.feedback}
        onChange={handleChange}
        rows={4}
        required
      />
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default FeedbackForm;
