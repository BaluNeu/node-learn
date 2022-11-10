// creating the subscribers rounter

const express = require('express');
//const { appendFile } = require('fs');

const todoObject = require('../models/todoApp')

const router  = express.Router();

//getting all

router.get('/', async(req,res)=>{
    try{
        const todoObjects = await todoObject.find()
        res.send(todoObjects);
        } catch (error) {
        res.status(404).json({message: error.message})
        }
});

// getting one

router.get('/:id', (req,res)=>{
    res.send(req.params.id);
    
});


// post or create one

router.post('/', async(req,res)=>{
    const todoObjects = new todoObject({
        id : req.body.id,
        name: req.body.name,
        title: req.body.title,
        description : req.body.description,
        dueDate: req.body.dueDate
    })

    try {
        const newtodoObject = await todoObjects.save()
        res.status(201).json(newtodoObject);
        
    } catch (error) {
        res.status(500).json({message: error.message}); 
    }
    
});


// upddate one

router.patch('/:id', getSubscriberwithId, async (req,res)=>{

    if(res.body.name!=null){
        res.todoAppObject.title = res.body.title;
    }

    if(res.body.description!=null){
        res.todoAppObject.description = res.body.description;
    }

    try {
        const updatedTodoObject = await res.todoAppObject.save();
        res.json(updatedTodoObject);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }

    
});


// delete one

router.delete('/:id',getSubscriberwithId, async (req,res)=>{

    
});

async function getSubscriberwithId(req, res,next) {
    let todoAppObject
    try {
        todoAppObject = await todoObject.findById(req.params.id)
        if(todoAppObject == null) {
            return res.status(404).json({ message: "cannot find todoObject"})
        }
        
    } catch (error) {
        res.status(500).json({message: error.message}); 
    }

    res.todoAppObject = todoAppObject
    next()

}




module.exports = router;