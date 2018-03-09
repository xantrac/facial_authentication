import React, { Component } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios'

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

    capture = () => {
       
        const imageSrc = this.webcam.getScreenshot();
        const newUser = {
            email : this.state.email,
            password : this.state.password,
            registeredPic : imageSrc
        }
        
        axios.post('api/login/signIn', newUser)
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

                <input onChange={this.handleChange} name="email" placeholder="email"/>
                <input onChange={this.handleChange} name="password" placeholder="password"/>
                <button onClick={this.capture}>Capture photo</button>
            </div>
        );
    }
}

export default SignUp;
