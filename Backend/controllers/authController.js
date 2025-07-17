const bcrypt = require('bcryptjs');
const users = require('../data/users'); // ✅ Corrected import

// Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { name, email, password: hashedPassword };
  users.push(newUser);

  return res.status(201).json({ message: 'User registered successfully' });
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  return res.status(200).json({
    message: 'Login successful',
    user: { name: user.name, email: user.email },
  });
};

module.exports = { registerUser, loginUser };
