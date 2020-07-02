const express = require("express")
const User = require("./../models/UserModel")
const Task = require("./../models/TaskModel")

const router = express.Router()

//get all users
router.get("/users",async (req,res,next)=>{
    const user = await User.find({})
    
    res.status(200).json({
        status:"ok",
        result:user.length,
        data:{user}
    })
})

//get user by Id
router.get("/users/:id",async (req,res,next)=>{
    console.log(req.params.id)
    const user = await User.findById(req.params.id)
    
    res.status(200).json({
        status:"ok",
        data:{user}
    })
})

//post users
router.post("/users",async (req,res)=>{
    const user = await new User(req.body)
    user.save()

    res.status(201).json({
        status:"ok",
        data:{user}
    })

})

//delete user by ID
router.delete("/users/:id",async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id)

    //delete tasks related to that user
    await Task.deleteMany({"owner":user._id})

    res.status(203).json({
        status:"ok",
        data:{
            message:"deleted"
        }
    })
})

module.exports = router