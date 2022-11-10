// creating mdoel to interact with database

const mongoose = require('mongoose')

//creating subscriber schema

const subscriberSchema = new mongoose.Schema(
    // json object
    {
        name: {
            type: String,
            required: true

        },

        subscriberToChannel: {
            type: String,
            required: true

        },

        subscribeDate:{
            type: Date,
            required: true,
            default: Date.now()
        }


    }

)

module.exports = mongoose.model('Subscriber', subscriberSchema)