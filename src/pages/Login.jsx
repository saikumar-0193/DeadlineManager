import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log("🔘 handleLogin triggered");
    alert("handleLogin triggered!"); // Just to confirm click is working

    if (email && password) {
      console.log("📨 Sending login request with:", { email, password });

      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log('🔄 Response from login API:', data);

        if (response.ok) {
          alert('✅ Login successful!');
          localStorage.setItem('user', JSON.stringify(data.user));
          console.log('📦 Saved to localStorage:', localStorage.getItem('user'));

          navigate('/dashboard');
          console.log('🚀 Navigated to /dashboard');
        } else {
          alert(data.message || '❌ Login failed');
          console.error('❌ Login failed:', data.message);
        }
      } catch (err) {
        alert('❗ Error connecting to server');
        console.error('❗ Login request error:', err);
      }
    } else {
      alert('⚠️ Please enter email and password');
      console.warn('⚠️ Email or password missing');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
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
        <button
          type="button"
          onClick={() => {
            console.log("🔘 Login button clicked");
            handleLogin();
          }}
        >
          Login
        </button>
        <p>Don't have an account? <a href="/register">Register</a></p>
      </div>
    </div>
  );
};

export default Login;
