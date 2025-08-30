import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";
import mongoose from 'mongoose';

export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, linkedIn, password } = req.body;

    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Additional validation (e.g., email format, password strength)

    // Check if username already exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "This username is already taken." });
    }

    // Check if email already exists
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "An account with this email already exists." });
    }

    // Hash the user password using bcrypt before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      linkedIn,
      password: hashedPassword
    });

    try {
      const savedUser = await newUser.save();
      generateToken(res, savedUser._id);
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: savedUser._id,
          firstName: savedUser.firstName,
          lastName: savedUser.lastName,
          username: savedUser.username,
          email: savedUser.email,
          linkedIn: savedUser.linkedIn
        }
      });
    } catch (error) {
      res
        .status(400)
        .json({
          message: "User registration failed. Please check your details.",
          error: error.message
        });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Not fully implemented yet
export const loginUserToken = async (req, res) => {
  return res.send({ message: "Hello there - authorisation success!" });
};

export const getUserInfo = async (req, res) => {
  const id = req.params.id;
  // Check if id is valid
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  const user = await User.findById(id);
  return res.status(201).send(`Succesful! ${user}`);
};

// Deleting a user's account
export const deleteUser = async(req, res) => {
  const id = req.params.id;
  // Check if id is valid
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
  const user = await User.deleteOne({_id : id});
  return res.status(201).send(`${user} Sucessfully delelted`);
}

export const addUser = async(req, res) => {
  const user = await User.create({
    firstName: 'Alison',
    lastName: 'Davidson',
    username: 'ali123',
    email: 'alison@gmail.com',
    password: 'bearLingoI$C00l',
    streak: { lastActive: '2023-01-15T10:30:00Z',
      current: 10,
      longest: 10
    }
  });
  console.log('Created user:', user);
  return res.status(201).send(`${user} created!`);
}





// export const getCompletedLevels = async(req, res) => {
  
// }

