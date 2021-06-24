// Config Express
const express = require('express');

const app = express();
const port = 4000;

app.listen(port, function() {
    console.log('The server is running, ' +
        ' please, open your browser at http://localhost/%s', 
        port);
  });

  //connectDB
const mongoose= require('mongoose');
require('dotenv').config({path:"./config/.env"})
//const ConnectDB = () => {
    mongoose.connect(
      process.env.MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      
      },
      (err) => {
        if (err) {
          console.log(err);
        } else console.log("database connected");
      }
    );

    //create user
    let user=require('./models/user')
    // user.create([{name:"nermine",age:28,email:"nermine.bouabdallah@gmail.com"},{name:"fatma",age:28,email:"fatma.benaissa@gmail.com"},{name:"wajih",age:25,email:"wajih.jaber@gmail.com"}]) 

    //get users

    app.get("/users", (req, res) =>
    user.find()
      .then((el) => res.json(el))
      .catch((err) => console.log(err))
  );

  app.use(express.json())
  //add user
  app.post("/add_user", (req, res) => {

    let newUser = new user(req.body);
    newUser
      .save()
      .then(() => res.json({ msg: "User added " })) //.then((el)=>res.json(el))
      .catch((err) => console.log(err));
  });

  //edit user
  app.put('/edit_user/:id',(req,res)=>{
    user.findByIdAndUpdate(req.params.id,{ $set:req.body},{new:true})
    .then((el)=>res.json(el)).catch((err)=>console.log(err))
  }
  )

  //delete user
  app.delete('/delete_user/:id',(req,res)=>{

    user.deleteOne({_id:req.params.id})
    .then((el)=>res.json(el)).catch((err)=>console.log(err))
  
  })