const ToDoModel = require('../models/Todomodel');
const User=require("../models/user");

module.exports.getTodo = async (req, res) => {
    const { _id } = req.body;
        // Ensure user exists
        const existingUser = await User.findById(_id);
        if (existingUser) {
            // Find all to-dos related to the user
            const todos = await ToDoModel.find({ user: _id });

            res.json({ list: todos });
        } else {
            res.status(404).json({ message: "User not found" });
        }
   
};

module.exports.saveToDo = async (req, res) => {
    try {
        
            const { text, email } = req.body;
            const existingUser = await User.findOne({ email });
    
            if (existingUser) {
                const list = new ToDoModel({ text, user: existingUser._id });
                await list.save();
    
                existingUser.list.push(list._id);
                await existingUser.save();
    
                res.status(200).json({ list });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        
        
    } catch (err) {
        console.log(err);
        res.status(500).send(err); // Send an error response in case of failure
    }
};
module.exports.updateToDo= async(req,res)=>{
    try{
        const { _id ,text,email}=req.body;
        const existingUser = await User.findOne({ email });
        
            if (existingUser) {
                const updatedToDo =await ToDoModel.findByIdAndUpdate(_id,{ text});
                if (updatedToDo) {
                    res.status(200).json({ message: "Updated Successfully", updatedToDo });
                } else {
                    res.status(404).json({ message: "ToDo not found for this user" });
                }
                
            } else {
                res.status(404).json({ message: "User not found" });
            }

    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
};
module.exports.deleteToDo = async (req, res) => {
    try {
        const { _id, email } = req.query;
        const existingUser = await User.findOneAndUpdate(
            { email },
            { $pull: { list: _id } }
        );

        if (existingUser) {
            await ToDoModel.findByIdAndDelete(_id);
            res.send("Deleted Successfully");
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};
