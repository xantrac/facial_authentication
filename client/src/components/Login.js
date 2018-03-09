import React, { Component } from 'react';
import Webcam from 'react-webcam';
import logo from '../logo.svg';
import '../App.css';
import axios from 'axios'

class Login extends Component {

  setRef = (webcam) => {
    this.webcam = webcam;
  }
 
  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    console.log(imageSrc)
    axios.post('api/login', {pic : imageSrc})
    .then(res => console.log(res.data))
  };

  render() {
    return (
      <div>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
        />
        <button onClick={this.capture}>Capture photo</button>
      </div>
    );
  }
}

export default Login;
