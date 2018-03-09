import React, { Component } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios'
import styled from 'styled-components';
import { Form, Input, Button } from 'reactstrap';


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

class SignUp extends Component {

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
        const  subscriptionKey = process.env.REACT_APP_subscriptionKey;
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

    capture = (event) => {
        event.preventDefault()
        const imageSrc = this.webcam.getScreenshot();
        this.detectFace(imageSrc)
        .then(id => {
            console.log(id)
            const newUser = {
                name : this.state.name,
                email : this.state.email,
                password : this.state.password,
                registeredPic : id
            }
        return axios.post('api/login/signIn', newUser)
        })
        .then(res => console.log(res.data))
        .catch(err => console.log(err))     
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

                <Form onSubmit={this.capture}>
                    <Input onChange={this.handleChange} name="name" placeholder="name"/>
                    <Input onChange={this.handleChange} name="email" placeholder="email"/>
                    <Input onChange={this.handleChange} name="password" placeholder="password"/>
                    <Button color="primary">Sign In</Button>
                </Form>
            </Wrapper>
        );
    }
}

export default SignUp;

const Wrapper = styled.div`
    width : 100vw;
    height : 100vh;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
`
