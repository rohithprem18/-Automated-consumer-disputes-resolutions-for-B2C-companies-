import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CustomerSupport from './components/CustomerSupport';
import CustomerSupportCategories from './components/CustomerSupportCategories';
import { auth } from './firebase/config';
import { Toaster } from 'react-hot-toast';
import NetflixIntro from './components/NetflixIntro';

function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      {showIntro && <NetflixIntro />}
      <Toaster position="top-right" />
      <Routes>
        {!user ? (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />
          </>
        ) : (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customer-support" element={<CustomerSupportCategories />} />
            <Route path="/customer-support/:category" element={<CustomerSupport />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;