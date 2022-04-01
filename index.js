const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const Student = require('./Model/student')

mongoose.connect('mongodb+srv://student-info:student-info@cluster0.xmg1j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',()=>{
    console.log('Connected Succesfully');
});

const PORT = 5000;

app.use(bodyparser.json())

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.post('/student',(req,res)=>{
    const info = req.body;
    const newStudent = new Student(info);
    newStudent.save((err,student)=>{
        if(err){
            res.send(err);
        }
        else{
            res.send(student);
        }
    })
});

app.get('/student',async (req,res)=>{
    const students = await Student.find();
    res.send(students);
});

app.get('/student/search',async (req,res)=>{
    const queryMobile = req.body.mobile;
    const students = await Student.findOne({mobile:queryMobile});
    res.send(students);
});

app.post('/student/update',async(req,res)=>{
    const queryMobile = req.body.mobile;
    const students = await Student.updateOne({mobile:queryMobile},{
        name:req.body.name,
        age:req.body.age,
        mobile:req.body.name
    });
    res.send(students);
});

app.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`)
});
