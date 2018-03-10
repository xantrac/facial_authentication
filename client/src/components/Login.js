import React, { Component } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
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
     email : "",
     password : ""
    }

    delayState = function () {
      setTimeout(() => {
          this.setState({redirect : true})
      }, 2000);
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
            if (res.data.length > 0) {
            return res.data[0].faceId
            }
            else {this.props.alert.error("No face detected, try again")}
        })
        .catch(err => console.log(err))
    }

    validateUser = async(event) => {
      try {
        event.preventDefault()
        const user = await axios.get(`api/login/${this.state.email}`)
        if (user.data) {
          const savedPic = user.data.registeredPic
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
            if (isIdentical) {
              this.props.alert.success(`User face is matching!`)
              this.delayState() 
              }
            else {
              this.props.alert.error("User face is not matching")
              this.setState({name : "", email : "", password : ""})
            }
          }
          else {
            this.props.alert.error("Wrong password")
            this.setState({name : "", email : "", password : ""})
          }
        }
        else {
          this.props.alert.error("User doesn't exist")
          this.setState({name : "", email : "", password : ""})
        }
      
    }
    catch(error) {
      console.error(error);
    }
        
    };

    render() {

      if (this.state.redirect) {
        return (<Redirect to={`/personalPage/${this.state.email}`}/>)
      }
        return (
            <Wrapper>
                <Webcam
                    audio={false}
                    height={350}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={350}
                />

                <Form style={styles.form} onSubmit={this.validateUser}>
                    <Input 
                        onChange={this.handleChange}
                        value={this.state.email}
                        name="email"
                        placeholder="email"
                        required="true"
                    />
                    <Input 
                        onChange={this.handleChange}
                        value={this.state.password}
                        name="password"
                        placeholder="password"
                        required="true"
                    />
                    <Button style={styles.signInButton} color="primary">Log In</Button>
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

const styles = {

  signInButton: {
    margin: "5% 0"
  },

  form: {
      display : "flex",
      flexDirection : 'column',
  }
}
