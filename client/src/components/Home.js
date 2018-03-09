import React, { Component } from 'react';
import Webcam from 'react-webcam';
import logo from '../logo.svg';
import '../App.css';
import axios from 'axios'
import { Link } from 'react-router-dom';


class Home extends Component {

 

  render() {
    return (
      <div>
          <Link to={"/login"}>Log In</Link>
          <Link to={"/signin"}>Sign In</Link>
      </div>
    );
  }
}

export default Home;
