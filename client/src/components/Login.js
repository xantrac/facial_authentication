import React, { Component } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios'
import styled from 'styled-components';
import { Form, Input, Button } from 'reactstrap';
import { withAlert } from 'react-alert'


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

const  subscriptionKey = process.env.REACT_APP_subscriptionKey;

class Login extends Component {

    state ={
     
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        event.preventDefault()
    }

    setRef = (webcam) => {
        this.webcam = webcam;
    }

    detectFace = (image) => {
        const  uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
        const data = makeblob(image)
        console.log(data)
        return axios({
            method: "post",
            url: uriBase + "?",
            data: data,
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
        .then(res => {
            console.log(res.data)
            return res.data[0].faceId
        })
        .catch(err => console.log(err))
    }

    validateUser = async(event) => {
      try {
        event.preventDefault()
        const user = await axios.get(`api/login/${this.state.email}`)
        if (user.data.email) {
          const savedPic = user.data.registeredPic
          console.log(savedPic)
          if (user.data.password === this.state.password) {
            const imageSrc = this.webcam.getScreenshot()
            const picToVerify = await this.detectFace(imageSrc)
            const match = await axios({
              method: "post",
              data : {
                faceId1 : savedPic,
                faceId2 : picToVerify
              },
              url: "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/verify",
              headers: { 
                  "Content-Type" : 'application/json',
                  "Ocp-Apim-Subscription-Key" : subscriptionKey
                  }
              })
            const isIdentical = match.data.isIdentical
            if (isIdentical) { this.setState({redirect : true})}
            else {this.props.alert.error("User face is not matching")}
          }
          else {this.props.alert.error("Wrong password")}
        }
        else {this.props.alert.error("Wrong email")}
      
    }
    catch(error) {
      console.error(error);
    }
        
    };

    render() {
        return (
            <Wrapper>
                <Webcam
                    audio={false}
                    height={350}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={350}
                />

                <Form onSubmit={this.validateUser}>
                    <Input onChange={this.handleChange} name="email" placeholder="email"/>
                    <Input onChange={this.handleChange} name="password" placeholder="password"/>
                    <Button color="primary">Sign In</Button>
                </Form>
            </Wrapper>
        );
    }
}

export default withAlert(Login);

const Wrapper = styled.div`
    width : 100vw;
    height : 100vh;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
`
