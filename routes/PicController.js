const express = require('express')
const router = express.Router(({ mergeParams: true }))
const axios = require('axios')
const User = require('../db/UserModel')
const blobUtil = require('blob-util')


const  subscriptionKey = process.env.subscriptionKey;
const  uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";




router.get('/:userId', (req,res) => {

    User.findById(req.params.userId)
    .then(user => {
        const data = user.registeredPic
        const buffer = new Buffer(data, 'base64').toString('binary').split('')
    axios({
        method: "post",
        url: uriBase + "?",
        data: buffer,
        headers: { 
                    "Content-Type" : 'application/octet-stream',
                    "processData" : false,
                    "Ocp-Apim-Subscription-Key" : subscriptionKey
                },
        params: {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
        },
        })
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err))

})
    




module.exports = router