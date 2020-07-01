const express = require("express")
const Task = require("./../models/TaskModel")

const router = express.Router()

//get all tasks
router.get("/tasks",async (req,res,next)=>{
    const task = await Task.find({})

    res.status(200).json({
        status:"ok",
        results:task.length,
        data:{task}
    })
})

//post tasks


module.exports = router
