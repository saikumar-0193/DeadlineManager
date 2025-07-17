import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (name && email && password) {
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Registration successful!');
          navigate('/'); // Navigate to login page
        } else {
          alert(data.message || 'Registration failed');
        }
      } catch (err) {
        alert('Error connecting to server');
        console.error(err);
      }
    } else {
      alert('Please fill all fields');
    }
  };

  return (
    <div className="register-wrapper">
      <form className="register-box">
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="button" onClick={handleRegister}>Register</button>
        <p>Already have an account? <a href="/">Login</a></p>
      </form>
    </div>
  );
};

export default Register;
