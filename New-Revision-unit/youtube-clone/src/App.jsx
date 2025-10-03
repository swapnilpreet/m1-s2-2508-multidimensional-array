import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import Home from './Pages/Home';
import Watch from './Pages/Watch';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <div className="flex flex-1 pt-14"> {/* pt-14 for header height */}
            <Sidebar />
            <main className="flex-1 p-4 overflow-y-auto">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Protected Route for Video Detail */}
                <Route
                  path="/watch/:videoId"
                  element={
                    <ProtectedRoute>
                      <Watch />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;