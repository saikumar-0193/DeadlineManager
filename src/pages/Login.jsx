import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Login successful!');
          localStorage.setItem('user', JSON.stringify(data.user)); // store logged-in user
          navigate('/dashboard');
        } else {
          alert(data.message || 'Login failed');
        }
      } catch (err) {
        alert('Error connecting to server');
        console.error(err);
      }
    } else {
      alert('Please enter email and password');
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-box">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={handleLogin}>Login</button>
        <p>Don't have an account? <a href="/register">Register</a></p>
      </form>
    </div>
  );
};

export default Login;
