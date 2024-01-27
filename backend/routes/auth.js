const express = require('express');
const User = require('../models/User.js');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = "PriyamIsAGoodB0$y"

const router = express.Router();

// Route 1: Create a user using: POST "/api/auth/createuser". Doesn't require auth
router.post('/createuser', [
  //express validator
  body('name').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 5 })
], async (req, res) => {
  // if there are errors return bad request or errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // check whether a user with this email exists already
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ error: "Sorry a user with this email already exists" })
    }

    // using bcrypt package to create hash of password
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // create a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      //password: req.body.password
      password: secPass
    })
    const data = {
      user:{
        id: user.id
      }
    }
    //using json webtoken we are signing a unique token for the user. So user can't change the data without permision.
    const authData = jwt.sign(data, JWT_SECRET)
    console.log(authData);
    //res.json(user)
    res.json({authData})
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal server error")
  }




  //   .then(user => res.json(user))
  //   .catch(err=> {console.log(err)
  // res.json({error: "please enter a unique value for email"})});

  // neeche wala isse pahle ke video ka content hai. jab express validator use nhi hua tha
  // console.log(req.body);
  // const user = User(req.body)
  // user.save();
  // res.send(req.body); //req.body means request ki body ka data
})

// Route 2: Login a user using: POST "/api/auth/login". No login required
router.post('/login', [
  //express validator
  body('email', 'Enter a valid Email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  // if there are errors return bad request or errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {email, password} = req.body;
  try {
    //asynchronous await required
    let user = await User.findOne({email})
    if(!user){
      return res.status(400).json({error: "Please try to login with correct credential"})
    }
    //asynchronous await is required
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      return res.status(400).json({error: "Please try to login with correct credential"})
    }
    const data = {
      user:{
        id: user.id
      }
    }
    //using json webtoken we are signing a unique token for the user. So user can't change the data without permision.
    const authData = jwt.sign(data, JWT_SECRET)
    console.log(authData);
    res.json({authData})
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal server error")
    
  }

})

// Route 3: Fetch a user data using: POST "/api/auth/getuser". login required
router.post('/getuser', fetchuser, async (req, res) => {
  // if there are errors return bad request or errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user);
} catch (error) {
  console.log(error.message)
  res.status(500).send("Internal server error")
}})


module.exports = router;
