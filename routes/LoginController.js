const express = require('express')
const router = express.Router(({ mergeParams: true }))
const axios = require('axios')
const User = require('../db/UserModel')
const blobUtil = require('blob-util')

const  subscriptionKey = process.env.subscriptionKey;
const  uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

router.post('/', (req,res) => {
    console.log(req.body.pic)

    var sourceImageUrl = req.body.pic;

    axios({
        method: "post",
        url: uriBase + "?",
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
        headers: { 
                    "Content-Type" : "application/json",
                    "Ocp-Apim-Subscription-Key" : subscriptionKey
                },
        params: {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
        },
      })
      .then(res => {
            const data = res.data
            return data
            
        })
        .then(data => res.json(data))
      .catch(err => console.log(err))
})

router.post('/signIn', (req,res) => {

    const email = req.body.email
    const password = req.body.password
    const registeredPic = req.body.registeredPic
    console.log(req.body)

    User.findOne({email})
    .then(user => {
        if (user) {
            console.log("this user exist:",user)
          res.json({userExist : true})
        }
        else {
            console.log("this do not exist:",user)
           return User.create(req.body)
        }
    })
    .then(user => res.json(user))
    .catch(err => console.log(err))
})

    




module.exports = router