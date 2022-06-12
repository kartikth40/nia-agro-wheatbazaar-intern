import React from 'react'
import styled from 'styled-components'

const Header = () => {
  return (
    <Container>
      <ImageContainer>
        <img src="/images/logo.png" alt="company logo" />
      </ImageContainer>
      <Nav>
        <HeaderTop>
          <span>Login</span> <span>Register</span>
        </HeaderTop>
        <HeaderBottom>
          <span>Home</span>
          <span>About Us</span>
          <span>How it Works</span>
          <span>Proposition</span>
          <span>Make it Work</span>
          <span>Contact</span>
        </HeaderBottom>
      </Nav>
    </Container>
  )
}

export default Header

const Container = styled.header`
  font-size: 30px;
  display: flex;
  width: 80vw;
  padding: 15px 5px;
  margin-inline: auto;
  justify-content: space-between;
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);
`
const ImageContainer = styled.div``
const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
const HeaderTop = styled.div`
  & span {
    &:hover {
      cursor: pointer;
      color: #ffc20f;
    }
    font-weight: bolder;
    margin-left: 20px;
  }
  margin-bottom: 10px;
`
const HeaderBottom = styled.div`
  font-size: 20px;
  & span {
    &:hover {
      cursor: pointer;
      color: #ffc20f;
    }
    margin-left: 20px;
  }
`
