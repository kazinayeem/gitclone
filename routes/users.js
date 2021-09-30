const router = require("express").Router();
const User = require("../models/User");

const bcrypt = require("bcrypt");
// get user

router.get("/alluser", (req, res) => {
  User.find((error, data) => {
    if (error) {
      res.status(200).json({
        error: error,
      });
    } else {
      res.status(200).json({
        data: data,
      });
    }
  });
});
//register

router.post("/register", async (req, res) => {
  try {
    //generate new pass

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // new user

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //save user and send response

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    //find user
    const user = await user.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong username or password");

    // value pass

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong username or password");

    //send res

    res.status(200).json({ _id: user._id, username: username });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
