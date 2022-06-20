import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Select from 'react-select'
import axios from 'axios'

const BASE_API_URL = 'http://localhost:8080/api'

const RegisterBuyer = () => {
  const [step2, setStep2] = useState(false)

  useEffect(() => {
    const getAllStates = async () => {
      await axios
        .get(`${BASE_API_URL}/states`)
        .then((res) => {
          let options = []
          res.data.forEach((stateObject, i) => {
            let current = {
              value: stateObject.statecode,
              label: stateObject.statename,
            }
            options[i] = current
          })
          setStates(options)
        })
        .catch((err) => {
          console.log('ERROR WHILE FETCHING STATES FROM API ---> ', err)
        })
    }

    getAllStates()
  }, [])

  useEffect(() => {
    const getAllVarieties = async () => {
      await axios
        .get(`${BASE_API_URL}/varieties`)
        .then((res) => {
          let options = []
          res.data.forEach((varietyObject, i) => {
            let current = { value: varietyObject, label: varietyObject }
            options[i] = current
          })
          setAllVarieties(options)
        })
        .catch((err) => {
          console.log('ERROR WHILE FETCHING Varieties FROM API ---> ', err)
        })
    }

    const getAllGrades = async () => {
      await axios
        .get(`${BASE_API_URL}/grades`)
        .then((res) => {
          let options = []
          res.data.forEach((gradeObject, i) => {
            let current = { value: gradeObject, label: gradeObject }
            options[i] = current
          })
          setGrades(options)
        })
        .catch((err) => {
          console.log('ERROR WHILE FETCHING Grades FROM API ---> ', err)
        })
    }

    const getAllPaymentByOptions = async () => {
      await axios
        .get(`${BASE_API_URL}/payment-options`)
        .then((res) => {
          let options = []
          res.data.forEach((paymentByObject, i) => {
            let current = { value: paymentByObject, label: paymentByObject }
            options[i] = current
          })
          setPaymetbyOptions(options)
        })
        .catch((err) => {
          console.log(
            'ERROR WHILE FETCHING PaymentBy Options FROM API ---> ',
            err
          )
        })
    }

    const getPaymentDurations = async () => {
      await axios
        .get(`${BASE_API_URL}/payment-durations`)
        .then((res) => {
          let options = []
          res.data.forEach((paymentDurationObject, i) => {
            let current = {
              value: paymentDurationObject,
              label: paymentDurationObject,
            }
            options[i] = current
          })
          setPaymentDurations(options)
        })
        .catch((err) => {
          console.log(
            'ERROR WHILE FETCHING Payment Durations FROM API ---> ',
            err
          )
        })
    }

    getAllVarieties()
    getAllGrades()
    getAllPaymentByOptions()
    getPaymentDurations()
  }, [step2])

  const [loading, setLoading] = useState(false)
  const [states, setStates] = useState({ value: 0, label: 'select' })
  const [cities, setCities] = useState({ value: 0, label: 'select' })
  const [state, setState] = useState()
  const [city, setCity] = useState()
  const [name, setName] = useState()
  const [companyName, setCompanyName] = useState()
  const [buyerType, setBuyerType] = useState()
  const [officeLandline, setOfficeLandline] = useState()
  const [mobile, setMobile] = useState()
  const [email, setEmail] = useState()
  const [productsManufactured, setProductsManufactured] = useState()
  const [password, setPassword] = useState()
  const [confirmedPassword, setConfirmedPassword] = useState()
  const [website, setWebsite] = useState()
  const [gstNumber, setGstNumber] = useState()
  const [address, setAddress] = useState()
  const [allvarieties, setAllVarieties] = useState()
  const [varieties, setVarieties] = useState()
  const [grades, setGrades] = useState()
  const [grade, setGrade] = useState()
  const [paymentbyOptions, setPaymetbyOptions] = useState()
  const [paymentbyOption, setPaymentbyOption] = useState()
  const [paymentDurations, setPaymentDurations] = useState()
  const [paymentDuration, setPaymentDuration] = useState()
  const [weeklyQty, setWeeklyQty] = useState()

  const fetchCities = async (curState) => {
    const curStateId = curState.value

    await axios
      .get(`${BASE_API_URL}/${curStateId}/cities`)
      .then((res) => {
        let options = []
        console.log(res.data)
        res.data.forEach((cityObject, i) => {
          let current = {
            value: cityObject.districtcode,
            label: cityObject.districtname,
          }
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

    setLoading(true)
    if (!step2) {
      let stateId = state.value
      let cityId = city.value
      await axios
        .post(`${BASE_API_URL}/register/buyer`, {
          name,
          state: stateId,
          city: cityId,
          companyName,
          buyerType,
          officeLandline,
          mobile,
          email,
          productsManufactured,
          password,
          website,
          gstNumber,
          address,
        })
        .then((res) => {
          setLoading(false)
          console.log(res.data)})
        .catch((err) => {
          setLoading(false)
          console.log(err)})
    } else {
      let statename = state.label
      let cityname = city.label
      let varietyVal = ''
      varieties.forEach((v) => {
        varietyVal += v.label + ', '
      })
    
      await axios
        .post(`${BASE_API_URL}/register/buyer/2`, {
          // userid,
          state: statename,
          city: cityname,
          variety: varietyVal,
          grade: grade.label,
          weekly: weeklyQty,
          payment_Through: paymentbyOption.label,
          payment_Duration: paymentDuration.label,
           
        })
        .then((res) => {console.log(res.data)
          setLoading(false)
        })
        .catch((err) => {console.log(err)
          setLoading(false)
        })

    }
  }

  const handleFill = async () => {
    await fetchCities({ value: 13, label: 'Haryana' })
    setState({ value: 13, label: 'Haryana' })
    setCity({ value: 446, label: 'Gurgaon' })

    if (!step2) {
      setName('Kartik')
      setCompanyName('Some Company')
      setBuyerType('Manufacturer')
      setOfficeLandline(1234567890)
      setMobile(9090909090)
      setEmail('kartik@gmail.com')
      setProductsManufactured('some products')
      setPassword('123456')
      setConfirmedPassword('123456')
      setWebsite('https://kartikthakur.tech')
      setGstNumber('22AABBB0000A1Z5')
      setAddress('House no. 1, New Palam Vihar, Gurgaon, Haryana')
    } else {
      setVarieties([{label: "Lokwan", value: "Lokwan"}, {label: "Sharbati",value: "Sharbati"}])
setGrade({label: "Grade I", value: "Grade I"})
setPaymentbyOption({label: "NEFT", value: "NEFT"})
setPaymentDuration({label: "Same Day On Delivery", value : "Same Day On Delivery"})
setWeeklyQty(200)
    }
  }

  const getRows = () => {
    return (
      <Row>
        <Label>
          Delivery State
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
          Delivery City
          <br />
          <CityInput
            options={cities}
            value={city}
            onChange={(curCity) => setCity(curCity)}
            required
          />
        </Label>
        <Label>
          Variety
          <br />
          <VarietyInput
            isMulti
            options={allvarieties}
            value={varieties}
            onChange={(cur) => setVarieties(cur)}
            required
          />
        </Label>
        <Label>
          Grade
          <br />
          <GradeInput
            options={grades}
            value={grade}
            onChange={(curGrade) => setGrade(curGrade)}
            required
          />
        </Label>
        <Label>
          Weekly Quantity
          <br />
          <WeeklyQtyInput
            type="number"
            placeholder="Your Qty"
            required
            value={weeklyQty}
            onChange={(e) => setWeeklyQty(e.target.value)}
          />
        </Label>
      </Row>
    )
  }

  return (
    <Container>
      {step2 ? (
        <>
          <Header>
            STEP 2: Buying Requirements
            <div>
              <button
                onClick={() => {
                  setStep2(false)
                }}
              >
                Prev Form
              </button>
              <button onClick={(e) => handleFill()}>Auto fill</button>
            </div>
          </Header>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <FormData>{getRows()}</FormData>
            <AddMoreButton>+ Add More Requirements</AddMoreButton>
            <br />
            <br />
            <SubHeader>Payments Will Be Made</SubHeader>
            <Label>
              {/* Grade */}
              <br />
              <PaymentDurationInput
                options={paymentDurations}
                value={paymentDuration}
                onChange={(curduration) => setPaymentDuration(curduration)}
                required
              />
            </Label>
            <Label>
              Payment Mode
              <br />
              <PaymentByInput
                options={paymentbyOptions}
                value={paymentbyOption}
                onChange={(curMode) => setPaymentbyOption(curMode)}
                required
              />
            </Label>

            <SubmitButton>{
              loading?
              "Please Wait..."
              :"Submit"}</SubmitButton>
          </Form>
        </>
      ) : (
        <>
          <Header>
            STEP 1: Company Representative Info
            <div>
              <button onClick={(e) => handleFill()}>Auto fill</button>
              <button
                onClick={() => {
                  setStep2(true)
                }}
              >
                Next Form
              </button>
            </div>
          </Header>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <FormData>
              <Label>
                Name
                <br />
                <NameInput
                  type="text"
                  placeholder="Your Name"
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
                  placeholder="Your Company Name"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </Label>
              <Label>
                Buyer Type
                <br />
                <BuyerTypeContainer
                  onChange={(e) => setBuyerType(e.target.value)}
                >
                  <BuyerTypeInput
                    type="radio"
                    checked={buyerType === 'Trader(Buyer)'}
                    value="Trader(Buyer)"
                    name="buyertype"
                  />
                  Trader(Buyer)
                  <br />
                  <BuyerTypeInput
                    type="radio"
                    checked={buyerType === 'Manufacturer'}
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
                  placeholder="Your Office Landline"
                  value={officeLandline}
                  onChange={(e) => setOfficeLandline(e.target.value)}
                />
              </Label>
              <Label>
                Mobile
                <br />
                <MobileInput
                  type="tel"
                  placeholder="Your Mobile"
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
                  placeholder="Your Email"
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
                  placeholder="Your Product"
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
                  placeholder="Your Password"
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
                  placeholder="Confirm Password"
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
                  placeholder="Your Website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </Label>
              <Label>
                GST Number
                <br />
                <GstNumberInput
                  type="text"
                  placeholder="Enter GST Number"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value)}
                />
              </Label>
              <Label>
                Address
                <br />
                <AddressInput
                  type="text"
                  placeholder="Please Enter Your Complete Address."
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

            <SubmitButton>{
              loading?
              "Please Wait..."
              :"JOIN NOW"}</SubmitButton>
          </Form>
        </>
      )}
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
  display: flex;
  justify-content: space-between;
  font-size: 30px;
  padding-bottom: 10px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
`
const SubHeader = styled(Header)`
  margin-bottom: 0;
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
    width: 235px;
  }
  margin-top: 5px;

  width: 80%;
`
const CityInput = styled(StateInput)``

const VarietyInput = styled(StateInput)`
  & > * {
    width: 300px;
  }
`
const GradeInput = styled(StateInput)`
  & > * {
    width: 150px;
  }
`

const PaymentDurationInput = styled(StateInput)`
  margin-bottom: 20px;
  & > * {
    width: 400px;
  }
`

const PaymentByInput = styled(StateInput)`
  margin-bottom: 20px;
`
const WeeklyQtyInput = styled(NameInput)`
  width: 100px;
`
const OfficeLandlineInput = styled.input``
const MobileInput = styled.input``
const EmailInput = styled.input``
const ProductsManufacturedInput = styled.input``
const PasswordInput = styled.input``
const ConfirmPasswordInput = styled.input``
const WebsiteInput = styled.input``
const GstNumberInput = styled.input``
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
const Row = styled.div`
  display: flex;
  gap: 10px;
`
const AddMoreButton = styled.div`
  width: max-content;
  padding: 10px 20px;
  background-color: white;
  color: rgba(0, 0, 0, 0.9);
  border: solid rgba(0, 0, 0, 0.3) 1px;
  border-radius: 10px;
`
