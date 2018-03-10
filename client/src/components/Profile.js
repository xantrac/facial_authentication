import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import axios from 'axios'
import { Link } from 'react-router-dom';

class Profile extends Component {

    state = {
        user: {
            name: ""
        }
    }

    getUser = () => {
        axios.get(`/api/login/${this.props.match.params.email}`)
            .then(res => { this.setState({ user: res.data }) })
            .catch(err => console.log(err))
    }


    componentWillMount() {
        this.getUser()
    }


    render() {

        return (
            <Wrapper>
                <Title>This is {this.state.user.name} page</Title>
                <SubTitle>you logged in using your face!</SubTitle>
                <SubTitle>Isn't incredible?!</SubTitle>
                <ButtonWrapper>
                    <Link to={"/"}><Button color="primary" size="lg">Log Out</Button></Link>
                </ButtonWrapper> 
            </Wrapper>
        );
    }
}

export default Profile;

const Wrapper = styled.div`
    width : 100vw;
    height : 100vh;
    display : flex;
    align-items : center;
    flex-direction : column;
`

const Title = styled.div`
    width : 100%;
    text-align : center;
    color : blue;
    font-size : 6vh;
    margin : 10% 0 5% 0;
    @media (max-width: 425px) {
        margin : 50% 0 5% 0;
    }
`

const SubTitle = styled.div`
    width : 100%;
    text-align : center;
    font-size : 3vh;
`

const ButtonWrapper = styled.div`
  margin : 5%;
`