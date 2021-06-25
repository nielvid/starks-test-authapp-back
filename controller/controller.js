/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const { registerValidation, LoginValidation } = require("../validation");

const HomePage = async (req, res, next) => {
  // console.log(req.user)
  const students = [
        {name:"James", age: 20, sex:"male"},
        {name:"Kate", age:21, sex:"female"},
        {name:"Angel", age:14, sex:"female"},
        {name: "Daniel", age:15, sex:"male"},
        {name: "David", age:18, sex:"male"}
    ];
  try {
    const user = await User.findById( req.user._id );
      console.log(user);
    res.status(200).json({
        students 
    });
  } catch (err) {
    next(err);
  }
};


  
// eslint-disable-next-line consistent-return
const AddUser = async(req, res, next) => {
  try {
      // validate the user
      const data = req.body;
  const { error } = registerValidation(data);
  if (error) {
return res.status(400).json({ error: error.details[0].message });
  }
    
  // check if email exist in the database
  const isEmailExist = await User.findOne({ email: data.email });
        console.log(isEmailExist);
  if (isEmailExist){
return res.status(400).json({ error: "Email already exists" });
  }
  // hash the password
   const hashedPassword = await bcrypt.hash(data.password, 10);
    // save to database
      const {username, email,telephone}  = data; 
     const newUser = {
        username,
         email,
         password: hashedPassword,
         telephone
     };
       
    const details = await User.create(newUser);

        res.status(200).json({
            status: 200,
            message:" registered sucessfully ",
            data: details
        });
  } 
  catch (error) {
      next(error);
  }
       
};

const Login = async (req, res, next) => {
  try {
    // validate the user
    const { error } = LoginValidation(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });
    const user = await User.findOne({ email: req.body.email });
    // throw error when email is wrong
    if (!user) return res.status(400).json({ error: "Email is wrong" });
    // check for password correctness
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Password is wrong" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });
    res.send({
      userId: user._id,
      username: user.email,
      token,
      message: "Login successful",
    });
     
  } catch (err) {
    next(err);
  }
 return "abc";
};
module.exports = { HomePage, AddUser, Login };
