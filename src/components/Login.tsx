import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-[#141414] p-8 rounded-lg shadow-lg w-96 border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
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
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#E50914] text-white rounded-lg px-4 py-2 hover:bg-[#B2070F] transition-colors"
          >
            Login
          </button>
        </form>
        <p className="text-gray-400 text-sm mt-4 text-center">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-[#E50914] hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login; 