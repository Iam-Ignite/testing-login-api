import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../App.css"

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill out both fields');
      return;
    }

    try {
      const { data } = await login({
        variables: { identifier: email, password },
      });       

      localStorage.setItem('accessToken', data.login.jwt);
      toast.success('Login successful!');
      navigate('/account');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <form className="form" onSubmit={handleLogin}>
      <div className="flex-column">
        <label>Email</label>
      </div>
      <div className="inputForm">
    
        <input
          placeholder="Enter your Email"
          className="input"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="flex-column">
        <label>Password</label>
      </div>
      <div className="inputForm">
     
        <input
          placeholder="Enter your Password"
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="button-submit" type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Log In'}
      </button>
  
    </form>
  );
};

export default LoginScreen;