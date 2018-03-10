import React, { Component } from 'react';
import '../App.css';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';



class Home extends Component {

 

  render() {
    return (
      <Wrapper>
        <Title>Face authentication</Title>
        <ButtonSection>
          <ButtonWrapper>
            <Link to={"/login"}><Button style={styles.button} color="primary" size="lg">Log In</Button></Link>
          </ButtonWrapper>
          <ButtonWrapper>
            <Link to={"/signin"}><Button style={styles.button} color="danger" size="lg">Sign Up</Button></Link>
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

const styles = {

  button: {
    minWidth : "100px"
  },
}