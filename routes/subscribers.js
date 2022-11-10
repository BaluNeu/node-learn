// creating the subscribers router

const express = require('express');
const { resolve } = require('path');
//const { appendFile } = require('fs');

const Subscriber = require('../models/subscriber')

const router  = express.Router();

//getting all

router.get('/', async (req,res)=>{
    try{
    const subscribers = await Subscriber.find()
    res.send(subscribers)
    } catch (error) {
    res.status(500).json({message: error.message})
    }
});

// getting one

router.get('/:id', getSubscriberwithId, (req,res)=>{
    res.send(res.subscriber);
    
});


// post or create one

router.post('/', async (req,res)=>{
    const subscriber = new Subscriber({
        name: req.body.name,
        subscriberToChannel: req.body.subscriberToChannel,
        subscribeDate : req.body.subscribeDate
    })

    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber);
        
    } catch (error) {
        res.status(500).json({message: error.message}); 
    }

    
});


// upddate one

router.patch('/:id', getSubscriberwithId, async(req,res)=>{
    if(res.body.name!=null){
        res.subscriber.name = res.body.name;
    }

    if(res.body.subscriberToChannel!=null){
        res.subscriber.subscriberToChannel = res.body.subscriberToChannel;
    }

    try {
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber);
        
    } catch (error) {
        res.status(500).json({message: error.message});
    }

    
});


// delete one

router.delete('/:id', getSubscriberwithId, async (req,res)=>{

    try {
        await res.subscriber.remove();
        res.json({message: 'deleted subscriber'});
        
    } catch (error) {
        res.status(500).json({message: error.message}); 
    }

    
});

// for ids we are defining a middleware

async function getSubscriberwithId(req, res,next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber == null) {
            return res.status(404).json({ message: "cannot find subscriber"})
        }
        
    } catch (error) {
        res.status(500).json({message: error.message}); 
    }

    res.subscriber = subscriber
    next()

}



module.exports = router;