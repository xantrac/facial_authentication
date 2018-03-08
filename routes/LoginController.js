const express = require('express')
const router = express.Router(({ mergeParams: true }))
const axios = require('axios')

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

    // Perform the REST API call.
    // $.ajax({
    //     url: uriBase + "?" + $.param(params),
    //     // Request headers.
    //     beforeSend: function(xhrObj){
    //         xhrObj.setRequestHeader("Content-Type","application/json");
    //         xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    //     },
    //     type: "POST",
    //     // Request body.
    //     data: '{"url": ' + '"' + sourceImageUrl + '"}',
    // })

    // .done(function(data) {
    //     // Show formatted JSON on webpage.
    //     $("#responseTextArea").val(JSON.stringify(data, null, 2));
    // })

    // .fail(function(jqXHR, textStatus, errorThrown) {
    //     // Display error message.
    //     var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
    //     errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
    //         jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
    //     alert(errorString);
    // });
})



    




module.exports = router