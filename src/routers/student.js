const express = require("express");
const router = new express.Router();
const Student = require("../models/students");

// creat or post the registration of students with the help of async await
router.post("/students", async(req, res)=>{

    try{

        const user = new Student(req.body);
        const createUser = await user.save();
        res.status(201).send(createUser); 

    }catch(err){
        res.status(400).send(err);
    }
       
})

// get or read the data of registered Student
router.get("/students", async(req, res)=>{

    try{
        const studentsData = await Student.find();
        res.send(studentsData);

    }catch(err){ res.send(err); }
});

// get the indivisual student data using id
router.get("/students/:id", async(req, res)=>{

    try{
        const _id  = req.params.id;
        const studentData = await Student.findById(_id);
        console.log(studentData);

        if(!studentData){
            return res.status(404).send();
        }else{
            res.send(studentData);
        }
    }catch(err){ res.status(500).send(err); }
});

// update the students by its id
router.patch("/students/:id", async(req, res)=>{

    try{

        const _id = req.params.id;
        const updateStudents = await Student.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        // console.log(updateStudents);
        res.send(updateStudents);

    }catch(err){
        res.status(404).send(err);
    }
})

// Delete the student by its id
router.delete("/students/:id", async(req, res)=>{
    
    try{

     const deleteStudent = await Student.findByIdAndDelete(req.params.id);
     if(!req.params.id){
        return res.status(404).send();
     }
      res.send(deleteStudent);
    }catch(err){
        res.status(500).send(err);
    }
})

module.exports = router;