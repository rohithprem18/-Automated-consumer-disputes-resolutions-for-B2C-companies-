import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/config';
import { User, Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: username
      });
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-[#141414] p-8 rounded-lg shadow-lg w-96 border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-700 px-4 py-2 pl-10 bg-gray-800 text-white placeholder-gray-400"
              required
            />
          </div>
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-gray-700 px-4 py-2 pl-10 bg-gray-800 text-white placeholder-gray-400"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-700 px-4 py-2 pl-10 bg-gray-800 text-white placeholder-gray-400"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-700 px-4 py-2 pl-10 bg-gray-800 text-white placeholder-gray-400"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#E50914] text-white rounded-lg px-4 py-2 hover:bg-[#B2070F] transition-colors"
          >
            Register
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-[#E50914] hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register; 