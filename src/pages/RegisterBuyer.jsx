import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Select from 'react-select'
import axios from 'axios'

const BASE_API_URL = 'http://localhost:8080'

const RegisterBuyer = () => {
  useEffect(() => {
    const getAllStates = async () => {
      await axios
        .get(`${BASE_API_URL}/states`)
        .then((res) => {
          let options = []
          res.data.forEach((stateObject, i) => {
            let current = { value: stateObject.id, label: stateObject.state }
            options[i] = current
          })
          setStates(options)
        })
        .catch((err) => {
          console.log('ERROR WHILE FETCHING STATES FOROM API ---> ', err)
        })
    }

    getAllStates()
  }, [])

  const [states, setStates] = useState({ value: 0, label: 'select' })
  const [cities, setCities] = useState()
  const [state, setState] = useState()
  const [city, setCity] = useState()
  const [name, setName] = useState()
  const [companyName, setCompanyName] = useState()
  const [buyerType, setBuyerType] = useState()

  const [offileLandline, setOfficeLandline] = useState()
  const [mobile, setMobile] = useState()
  const [email, setEmail] = useState()
  const [productsManufactured, setProductsManufactured] = useState()
  const [password, setPassword] = useState()
  const [confirmedPassword, setConfirmedPassword] = useState()
  const [website, setWebsite] = useState()
  const [GSTNumber, setGSTNumber] = useState()
  const [address, setAddress] = useState()

  const fetchCities = async (curState) => {
    const curStateId = curState.value

    await axios
      .get(`${BASE_API_URL}/${curStateId}/cities`)
      .then((res) => {
        let options = []
        res.data.forEach((cityObject, i) => {
          let current = { value: cityObject.id, label: cityObject.city }
          options[i] = current
        })
        setCities(options)
        setCity(options[0])
      })
      .catch((err) => {
        console.log('ERROR WHILE FETCHING CITIES FOROM API ---> ', err)
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // console.log(
    //   name,
    //   companyName,
    //   buyerType,
    //   state,
    //   city,
    //   offileLandline,
    //   mobile,
    //   email,
    //   productsManufactured,
    //   password,
    //   confirmedPassword,
    //   website,
    //   GSTNumber,
    //   address,
    //   tnc
    // )
  }

  return (
    <Container>
      {/* <button onClick={(e) => handleSubmit(e)}>press me </button> */}
      <Header>STEP 1: Company Representative Info</Header>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <FormData>
          <Label>
            Name
            <br />
            <NameInput
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Label>
          <Label>
            Company Name
            <br />
            <CompanyNameInput
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </Label>
          <Label>
            Buyer Type
            <br />
            <BuyerTypeContainer onChange={(e) => setBuyerType(e.target.value)}>
              <BuyerTypeInput
                type="radio"
                value="Trader(Buyer)"
                name="buyertype"
              />
              Trader(Buyer)
              <br />
              <BuyerTypeInput
                type="radio"
                value="Manufacturer"
                name="buyertype"
                required
              />
              Manufacturer
            </BuyerTypeContainer>
          </Label>
          <Label>
            State
            <br />
            <StateInput
              options={states}
              value={state}
              onChange={(curState) => {
                setState(curState)
                fetchCities(curState)
              }}
              required
            />
          </Label>
          <Label>
            City
            <br />
            <CityInput
              options={cities}
              value={city}
              onChange={(curCity) => setCity(curCity)}
              required
            />
          </Label>
          <Label>
            Office Landline
            <br />
            <OfficeLandlineInput
              type="text"
              value={offileLandline}
              onChange={(e) => setOfficeLandline(e.target.value)}
            />
          </Label>
          <Label>
            Mobile
            <br />
            <MobileInput
              type="tel"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </Label>
          <Label>
            Email
            <br />
            <EmailInput
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Label>
          <Label>
            Products Manufactured
            <br />
            <ProductsManufacturedInput
              type="text"
              required
              value={productsManufactured}
              onChange={(e) => setProductsManufactured(e.target.value)}
            />
          </Label>
          <Label>
            Password
            <br />
            <PasswordInput
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Label>
          <Label>
            Confirm Password
            <br />
            <ConfirmPasswordInput
              type="password"
              required
              value={confirmedPassword}
              onChange={(e) => setConfirmedPassword(e.target.value)}
            />
          </Label>
          <Label>
            Website
            <br />
            <WebsiteInput
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </Label>
          <Label>
            GST Number
            <br />
            <GSTNumberInput
              type="text"
              value={GSTNumber}
              onChange={(e) => setGSTNumber(e.target.value)}
            />
          </Label>
          <Label>
            Address
            <br />
            <AddressInput
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Label>
        </FormData>
        <Conditions>
          <ConditionInput
            type="checkbox"
            // defaultChecked={tnc}
            // onChange={() => setTnc(!tnc)}
            required
          />
          Accept Terms & Conditions*
        </Conditions>

        <SubmitButton>JOIN NOW</SubmitButton>
      </Form>
    </Container>
  )
}

export default RegisterBuyer

const Container = styled.div`
  width: 80%;
  margin: 20px;
  margin-inline: auto;
  border: rgba(0, 0, 0, 0.3) 2px solid;
  border-radius: 15px;
  padding: 20px;
`
const Header = styled.div`
  font-size: 30px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
`
const Form = styled.form``
const FormData = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  & > * {
    margin: 20px 0;
    flex-basis: 33%;
    flex-shrink: 1;
    & input {
      margin-top: 5px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      padding: 9px;
      border-radius: 5px;
      color: black;
      font-size: 15px;
    }
  }
`
const Label = styled.label`
  color: rgba(0, 0, 0, 0.7);
  font-size: 15px;
`
const NameInput = styled.input``
const CompanyNameInput = styled.input``
const BuyerTypeContainer = styled.div``
const BuyerTypeInput = styled.input``
const StateInput = styled(Select)`
  & > * {
    font-size: 15px;
  }
  margin-top: 5px;

  width: 80%;
`
const CityInput = styled(Select)`
  & > * {
    font-size: 15px;
  }
  margin-top: 5px;

  width: 80%;
`
const OfficeLandlineInput = styled.input``
const MobileInput = styled.input``
const EmailInput = styled.input``
const ProductsManufacturedInput = styled.input``
const PasswordInput = styled.input``
const ConfirmPasswordInput = styled.input``
const WebsiteInput = styled.input``
const GSTNumberInput = styled.input``
const AddressInput = styled.textarea`
  margin-top: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 9px;
  border-radius: 5px;
  color: black;
  font-size: 15px;
`
const Conditions = styled.div`
  margin-bottom: 10px;
`
const ConditionInput = styled.input``
const SubmitButton = styled.button`
  width: 100%;
  padding: 20px;
  margin-inline: auto;
  font-size: 20px;
  background-color: hsl(150 70% 50%);
  border: 2px solid hsl(150 90% 80%);
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
`
