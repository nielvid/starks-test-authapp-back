const express = require ('express');
const BodyParser = require('body-parser')
var app =  express()


app.use(express.urlencoded({extended: false}) )
app.get('/api/students', (req, res)=>{
    var students = [
        {name:"James", age: 20, sex:'male'},
        {name:'Kate', age:21, sex:'female'},
        {name:'Angel', age:14, sex:'female'},
        {name: 'Daniel', age:15, sex:'male'},
        {name: 'David', age:18, sex:'male'}
    ]
    res.send(students)
})


app.post('/api/newuser', (req, res)=>{
    const user = {

        username: req.body.username,
        email: req.body.email,
       password:req.body.password,
        tel: req.body.tel
    }
    res.send(user)
})
app.listen(process.env.PORT || 5000,  (req, res)=> {
    console.log('server started at Port')
})

