const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://cjeckley01:Cjeckley1998!@tech-assessment.0xrhade.mongodb.net/assessmentDB?retryWrites=true&w=majority",
  {}
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://13.244.73.99:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const User = mongoose.model("user", {
  email: String,
  password: String,
  name: String,
  surname: String,
  birthDate: Date,
  employeeNumber: String,
  salary: Number,
  position: String,
  manager: String,
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });

    if (user) {
      res.json({ success: true, message: "login successful", user });
    } else {
      res.status(401).json({ success: false, message: "User does not exist" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
app.post("/api/users", async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await User.create(userData);
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Update a user by ID
app.put("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Delete a user by ID
app.delete("/api/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findByIdAndDelete(userId);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to MongoDB!");
});

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
