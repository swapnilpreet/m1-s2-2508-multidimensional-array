import React, { useState } from 'react';

const Journal = () => {
  const [form, setForm] = useState({
    studyHours: '',
    breakTime: '',
    sleep: '',
    stress: 5,
    focus: 5,
    reflection: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Journal entry:', form);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Daily Journal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="studyHours" type="number" placeholder="Study Hours" className="w-full p-2 border" onChange={handleChange} />
        <input name="breakTime" type="number" placeholder="Break Time (min)" className="w-full p-2 border" onChange={handleChange} />
        <input name="sleep" type="number" placeholder="Sleep (hours)" className="w-full p-2 border" onChange={handleChange} />
        <label>Stress: <input name="stress" type="range" min="1" max="10" value={form.stress} onChange={handleChange} /></label>
        <label>Focus: <input name="focus" type="range" min="1" max="10" value={form.focus} onChange={handleChange} /></label>
        <textarea name="reflection" rows="4" className="w-full p-2 border" placeholder="Write your reflection..." onChange={handleChange}></textarea>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default Journal;