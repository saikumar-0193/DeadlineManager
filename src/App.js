// src/App.js
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CreateTask from './pages/CreateTask';
import Dashboard from './pages/Dashboard';
import EditTask from './pages/EditTask';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/edit-task" element={<EditTask />} />
      </Routes>
    </Router>
  );
}

export default App;
