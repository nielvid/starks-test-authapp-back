const express = require('express')
const route = express.Router();
const User = require('../model/user')
const bcrypt = require("bcryptjs");
const { registerValidation, LoginValidation } = require("../validation");
const jwt = require('jsonwebtoken')
const {requireLogin} = require('../middleware/auth')


route.get('/',  requireLogin, (req, res, next)=>{
  //console.log(req.user)
  try{
    const user = User.findById({_id:req.user._id});
   //res.send(user)
    res.send('Welcome to our homepage')
  }
  catch(err){
    console.log(err)
  }
    
})

route.get('/register', (req, res)=>{
    res.send('Register here')
})
route.get('/api/students', (req, res)=>{
    var students = [
        {name:"James", age: 20, sex:'male'},
        {name:'Kate', age:21, sex:'female'},
        {name:'Angel', age:14, sex:'female'},
        {name: 'Daniel', age:15, sex:'male'},
        {name: 'David', age:18, sex:'male'}
    ]
    res.send(students)
})

route.post('/api/newuser', async (req, res)=>{

 // validate the user
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message   });
  }

//check if email exist in the database
  const isEmailExist = await User.findOne({ email: req.body.email });
if (isEmailExist)
return res.status(400).json({ error: "Email already exists" });

    // hash the password

 bcrypt.hash(req.body.password, 10)
 .then(res =>{
     var newUser = new User({
        username: req.body.username,
        email: req.body.email,
       password:res,
        tel: req.body.tel
    })

    newUser.save().then((response)=>{
        /*console.log(response)*/
       
 }).catch(err => console.log(err) )
 return newUser
})
 .then((data)=>{
    console.log(data)
     
    }).catch( err => console.log(err))
    
   res.send("User register")
})


route.post("/api/login", async (req, res, next) => {

  try{

  // validate the user
  const { error } = LoginValidation(req.body);
 
  if (error) return res.status(400).json({ error:   error.details[0].message });
  const user = await User.findOne({ email: req.body.email });
  // throw error when email is wrong
  if (!user) return res.status(400).json({ error: "Email is wrong" });
  // check for password correctness
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
  return res.status(400).json({ error: "Password is wrong" });

    const token  = jwt.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn: "3m"})
  res.json({
    error: null,
    data: {
      userId: user._id,
      token: token,
      message: "Login successful",
    },
  });

  }
  catch(err){ console.log(err)}

});

module.exports = route;