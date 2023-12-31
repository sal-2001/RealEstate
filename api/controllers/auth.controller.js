import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //if email is valid or not
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not found!"));
    } else {
      //matching the password
      const validPassword = bcrypt.compareSync(password, validUser.password);

      if (!validPassword) {
        return next(errorHandler(401, "Wrong credentials!"));
      } else {
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

        //we want to remove the password data from the token, so we destructure the user details, ie, we save everything but the password
        const { password: pass, ...rest } = validUser._doc;

        // we can add expiry date for our cookie like (expire: new Date() + 24*60*60*100) means will expire after 1000 days
        res
          .cookie("access_token", token, { httpOnly: true })
          .status(200)
          .json(rest);
      }
    }
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      //we want to remove the password data from the token, so we destructure the user details, ie, we save everything but the password
      const { password: pass, ...rest } = user._doc;

      // we can add expiry date for our cookie like (expire: new Date() + 24*60*60*100) means will expire after 1000 days
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      // as the password is mandatory and google signin doesn't provide any password, we need to generate one
      // 36 means numbers from 0-9 and a-z, and -8 means we need last 8 digits (16 digit password we generate)
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out!");
  } catch (error) {
    next(error);
  }
};
