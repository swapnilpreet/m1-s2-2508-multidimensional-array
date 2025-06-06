import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="p-4 bg-blue-600 text-white flex justify-between">
    <div className="font-bold">MindTrack</div>
    <div className="space-x-4">
      <Link to="/">Dashboard</Link>
      <Link to="/journal">Journal</Link>
      <Link to="/mentor">Mentor</Link>
    </div>
  </nav>
);

export default Navbar;
