const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// SIGN UP
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      const message = "User already exists";
      return res.status(200).json({ message });
    } else {
      const hashpassword = bcrypt.hashSync(password, 10);  // Hash the password

      // Create and save the new user
      const newUser = new User({ email, username, password: hashpassword });
      await newUser.save();
      return res.status(200).json({ user: newUser });
    }
  } catch (error) {
    
    console.error('Error creating user:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// SIGN IN
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
  
      if (!user) {
        return res.status(200).json({ message: "Please Sign Up First" });
      }
  
      const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
  
      if (!isPasswordCorrect) {
        return res.status(200).json({ message: "Password Is Not Correct" });
      }
  
      const { password, ...others } = user._doc;
      return res.status(200).json({ user: user });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: "Unable to log in" });
    }
  });
  
module.exports = router;
