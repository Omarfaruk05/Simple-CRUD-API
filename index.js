const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Sample hardcoded user data
let users = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
  { id: 3, username: "user3", password: "password3" },
];

// Get all users
app.get("/api/users", (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Get single user by ID
app.get("/api/users/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Create a new user
app.post("/api/users", (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Update a user
app.put("/api/users/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { username, password } = req.body;
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }
    users[userIndex] = { id, username, password };
    res.status(200).json(users[userIndex]);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Delete a user
app.delete("/api/users/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ message: "User not found" });
    }
    const deletedUser = users.splice(userIndex, 1);
    res.status(200).json(deletedUser[0]);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
