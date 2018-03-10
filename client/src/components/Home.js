import React, { Component } from 'react';
import Webcam from 'react-webcam';
import logo from '../logo.svg';
import '../App.css';
import { Button } from 'reactstrap';
import axios from 'axios'
import { Link } from 'react-router-dom';
import styled from 'styled-components';



class Home extends Component {

 

  render() {
    return (
      <Wrapper>
        <Title>Face authentication</Title>
        <ButtonSection>
          <ButtonWrapper>
            <Link to={"/login"}><Button color="primary" size="lg">Log In</Button></Link>
          </ButtonWrapper>
          <ButtonWrapper>
            <Link to={"/signin"}><Button color="danger" size="lg">Sign In</Button></Link>
          </ButtonWrapper> 
        </ButtonSection>
      </Wrapper>
      
    );
  }
}

export default Home;


const Wrapper = styled.div`
    width : 100vw;
    height : 100vh;
    display : flex;
    align-items : center;
    flex-direction : column

`
const ButtonWrapper = styled.div`
  margin : 5%;
`

const ButtonSection = styled.div`
  display : flex;
  width : 100%;
  justify-content : center
`

const Title = styled.div`
  font-size : 5vh;
  margin : 10% 0 5% 0;
  @media (max-width: 425px) {
    margin : 50% 0 5% 0;
  }
`