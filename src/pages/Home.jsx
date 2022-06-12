import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { CgProfile as Buyer } from 'react-icons/cg'
import { TbTruckDelivery as Seller } from 'react-icons/tb'

const Home = () => {
  let navigate = useNavigate()
  return (
    <Container>
      <Header>Registration</Header>
      <SubContainer>
        <ButtonContainer>
          <Title>Buyer Registration</Title>
          <Button
            onClick={() => {
              navigate('/register/buyer')
            }}
          >
            <BuyerIcon />
            Click Here for Registration
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Title>Seller Registration</Title>
          <Button
            onClick={() => {
              navigate('/register/seller')
            }}
          >
            <SellerIcon />
            Click Here for Registration
          </Button>
        </ButtonContainer>
      </SubContainer>
    </Container>
  )
}

export default Home

const Container = styled.div`
  font-weight: bold;
  font-size: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Header = styled.div`
  font-size: 40px;
  margin: 20px 0 40px;
`
const SubContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`
const ButtonContainer = styled.div`
  border-radius: 10px;
  border: 2px solid rgba(0, 0, 0, 0.5);
  margin-inline: 20px;
  padding: 30px;
`
const Title = styled.div`
  text-align: center;
  font-size: 30px;
  margin-bottom: 20px;
`
const Button = styled.button`
  width: 100%;
  padding: 40px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 30px;
  background-color: white;
  border: none;
  &:hover {
    cursor: pointer;
    color: #ffc20f;
  }
`
const BuyerIcon = styled(Buyer)`
  font-size: 80px;
  margin-bottom: 20px;
`
const SellerIcon = styled(Seller)`
  font-size: 80px;
  margin-bottom: 20px;
`
