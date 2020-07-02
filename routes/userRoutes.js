const express = require("express");
const User = require("./../models/UserModel");
const Task = require("./../models/TaskModel");
const jwt = require("jsonwebtoken");

const router = express.Router();

const signToken = (id)=>
{
   return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
      });
}

//signUp users
router.post("/signup", async (req, res) => {
  const user = await new User(req.body).save();
  const token = signToken(user._id)

  res.status(201).json({
    status: "ok",
    token,
    data: { user },
  });
});

//login users
router.post("/login", async (req, res) => {
  //get email and password
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error("please provide email and password");
    }

    //check if user exist with this email

    const user = await User.findOne({email}).select("+password")


    //check if user is there and password is correct

    if (!user || ! (await user.correctPassword(password,user.password))) {
        throw new Error("email or password is incorrect");
    }
    //generate token and send to client

    const token = signToken(user._id)

    res.status(201).json({
        status: "ok",
        token
      });
  } catch(err) {
    res.status(400).json({
        status: "Error",
        message:err.message
      });

  }
});

//get all users
router.get("/users", async (req, res, next) => {
  const user = await User.find();

  res.status(200).json({
    status: "ok",
    result: user.length,
    data: { user },
  });
});

//get user by Id
router.get("/users/:id", async (req, res, next) => {
  console.log(req.params.id);
  const user = await User.findById(req.params.id);

  res.status(200).json({
    status: "ok",
    data: { user },
  });
});

//delete user by ID
router.delete("/users/:id", async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  //delete tasks related to that user
  await Task.deleteMany({ owner: user._id });

  res.status(203).json({
    status: "ok",
    data: {
      message: "deleted",
    },
  });
});

module.exports = router;
