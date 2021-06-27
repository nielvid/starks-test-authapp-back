const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const nodemailer = require('nodemailer')
const { registerValidation, LoginValidation } = require("../validation");
const { OAuth2Client } = require('google-auth-library')
// const client = new OAuth2Client(process.env.CLIENT_ID)
const {createTransporter} = require('../utilities/googleAPi')

const HomePage = async (req, res, next) => {
  // console.log(req.user)
  try {
    const user = await User.findById( req.user._id );
    const {email, _id} = user
       
    res.status(200).json({
        status: 200,
        message:" You are authorized to see this page ",
        data: {email, _id}
    });
  } catch (err) {
    next(err);
  }
};



const Signup = async(req, res, next) => {
  try {
      const data = req.body;
  const { error } = registerValidation(data);
  if (error) {
return res.status(400).json({ error: error.details[0].message });
  }
    
  const isEmailExist = await User.findOne({ email: data.email });
  if (isEmailExist){
return res.status(400).json({ error: "Email already exists" });
  }
   const hashedPassword = await bcrypt.hash(data.password, 10);
   
      const { email}  = data; 
     const user = {
      email,
      password: hashedPassword,
     };
       
    const account = await User.create(user);

        res.status(200).json({
            status: 200,
            message:" registered sucessfully ",
            data: account
        });
  } 
  catch (error) {
      next(error);
  }
       
};

const Login = async (req, res, next) => {
  try {
    
    const { error } = LoginValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });
    const {email, password} = req.body;
    const user = await User.findOne({ email});
    
    if (!user) return res.status(400).json({ error: "Email is wrong" });
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ error: "Incorrect Password " });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "120mins",
    });

    user.token = token;   
    const account = await User.create(user);
    res.send({
      status: 200,
      message:" Login sucessfull ",
      data:account
    });
     
  } catch (err) {
    next(err);
  }

};

const GoogleSignup = async (req, res, next) => {
   try {
      const { email, googleId}  = req.body
  const isEmailExist = await User.findOne({ email });
  if (isEmailExist){
return res.status(400).json({ error: "Email already exists" });
  }
   const hashedPassword = await bcrypt.hash(googleId, 10);
   
     const user = {
      email, password: hashedPassword,
     };   
    const account = await User.create(user);
   res.status(201).json({
            status: 200,
            message:" Login sucessfull ",
            data: account
        });
   } catch (error) {
     next(error)
   }
}

const GoogleLogin = async (req, res, next) => {
   try {
      const { email, googleId}  = req.body

      // const user = await User.findOne({ email});
    const token = jwt.sign({ _id: email }, process.env.JWT_SECRET, {
      expiresIn: "120mins",
    });
      
   const hashedPassword = await bcrypt.hash(googleId, 10);
  const user = {
    email,
    password: hashedPassword,
    token
} 
    const account = await User.create(user)

   res.status(201).json({
            status: 200,
            message:" Login sucessfull ",
            data: account
        });
   } catch (error) {
     next(error)
   }
}


const SendMail = async(req, res, next) => {
 
      // Pulling out the form data from the request body
      const recipient = req.body.email;
      const mailSubject = req.body.subject;
      const mailBody = req.body.message;
     

      // Mail options
      let mailOptions = {
        from: process.env.SENDER,
        to: recipient,
        subject: mailSubject,
        text: mailBody,
      };

      try {
        // Get response from the createTransport
        let emailTransporter = await createTransporter();

        // Send email
        emailTransporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            // failed block
            console.log(error);
          } else {
            // Success block
            console.log("Email sent: " + info.response);
            return res.send(info);
          }
        });
      } catch (error) {
        return console.log(error);
      }
    
  };


module.exports = { HomePage, Signup, Login, GoogleSignup , GoogleLogin, SendMail  };
