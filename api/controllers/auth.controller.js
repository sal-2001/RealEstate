import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  //hash the password => we don't need to write await in front as it is already using await by default
  //the second value (10 here) is the salt number (number of round for creating the salt)
  const hashedPassword = bcrypt.hashSync(password, 10);
  // creating a new user with given details
  const newUser = new User({ username, email, password: hashedPassword });

  // for deplaying the error while authentication, we use try and catch method
  try {
    //save the new user in the database

    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    // to see the error in the insomnia, instead of the terminal
    next(error);
  }
};
