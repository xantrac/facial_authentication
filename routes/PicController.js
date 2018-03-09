const express = require('express')
const router = express.Router(({ mergeParams: true }))
const axios = require('axios')
const User = require('../db/UserModel')
const blobUtil = require('blob-util')


const  subscriptionKey = process.env.subscriptionKey;
const  uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

const makeblob = function (dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);
        return new Blob([raw], { type: contentType });
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}


router.get('/:userId', (req,res) => {
    User.findById(req.params.userId)
    .then(user => {
        const data = user.registeredPic
    axios({
        method: "post",
        url: uriBase + "?",
        data: makeblob(data),
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

})
    




module.exports = router