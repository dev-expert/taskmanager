const express = require("express")
const Task = require("./../models/TaskModel")

const router = express.Router()

//get all tasks
router.get("/tasks/:id", async (req, res, next) => {
    const task = await Task.find({ owner: req.params.id });
  
    res.status(200).json({
      status: "ok",
      results: task.length,
      data: { task },
    });
  });
  
  //post tasks
  router.post("/tasks", async (req, res, next) => {
    const task = await new Task(req.body);
    task.save();
  
    res.status(200).json({
      status: "ok",
      results: task.length,
      data: { task },
    });
  });

  //delete tasks
  router.delete("/tasks/:id",async(req,res)=>{
    const task = await User.findByIdAndDelete(req.params.id)

    res.status(203).json({
        status:"ok",
        data:{
            message:"deleted"
        }
    })
})


module.exports = router
