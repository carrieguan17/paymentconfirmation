import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
var ENDPOINT = "/checkout";
var ENDPOINT2 = "/confirmation";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      homepage: true,
      f1: false,
      f2: false,
      f3: false,
      confirmation: false,
      currentUserId: '',
      confirmationData: []
    }
    this.onClickCheckout = this.onClickCheckout.bind(this)
    this.onClickF1Next = this.onClickF1Next.bind(this)
    this.onClickF2Next = this.onClickF2Next.bind(this)
    this.onClickF3Next = this.onClickF3Next.bind(this)
    this.onClickPurchase = this.onClickPurchase.bind(this)
  }

  onClickCheckout() {
    this.setState({
      homepage: false,
      f1: true
    })
  }

  onClickF1Next(profile) {
    axios.post(ENDPOINT, profile)
    .then((profile) => {
      console.log('Profile created')
    })
    .catch((err) => {
      console.log('Error creating profile')
    })
    axios.get(ENDPOINT)
    .then((id) => {
      this.setState({
        currentUserId: id.data[0]['last_insert_id()']
      })
    })
    .catch((err) => {
      console.log('Error getting current user id')
    })
    .then(() => {
        this.setState({
        f1: false,
        f2: true
      })
    })
  }

  onClickF2Next(contact) {
    axios.post(ENDPOINT, contact)
    .then((contact) => {
      console.log(`Contact info added`)
    })
    .catch((err) => {
      console.log(`Error adding contact info`)
    })
    this.setState({
      f2: false,
      f3: true
    })
  }

  onClickF3Next(payment) {
    axios.post(ENDPOINT, payment)
    .then((payment) => {
      console.log(`Payment info provided`)
    })
    .catch((err) => {
      console.log(`Error providing payment info`)
    })
    axios.get(ENDPOINT2)
    .then((result) => {
      this.setState({
        confirmationData: result.data[0]
      })
    })
    .catch((err) => {
      console.log('Error getting confirmation')
    })
    .then(() => {
      this.setState({
        f3: false,
        confirmation: true
      })
    })
    .then(() => {
      console.log(this.state)
    })
  }

  onClickPurchase() {
    this.setState({
      confirmation: false,
      homepage: true
    })
  }

  render () {
    return (
      <div>
        <Displaypage homepage={this.state.homepage} f1={this.state.f1} f2={this.state.f2} f3={this.state.f3} confirmation={this.state.confirmation} onClickCheckout={this.onClickCheckout} onClickF1Next={this.onClickF1Next} onClickF2Next={this.onClickF2Next} onClickF3Next={this.onClickF3Next} onClickPurchase={this.onClickPurchase} currentUserId={this.state.currentUserId} confirmationData={this.state.confirmationData}/>
      </div>
    )
  }

}

function Displaypage (props) {
  if (props.homepage) {
    return <Homepage onClickCheckout={props.onClickCheckout}/>
  } else if (props.f1) {
    return <F1 onClickF1Next={props.onClickF1Next}/>
  } else if (props.f2) {
    return <F2 onClickF2Next={props.onClickF2Next} currentUserId={props.currentUserId}/>
  } else if (props.f3) {
    return <F3 onClickF3Next={props.onClickF3Next} currentUserId={props.currentUserId}/>
  } else if (props.confirmation) {
    return <Confirmation confirmationData={props.confirmationData} onClickPurchase={props.onClickPurchase}/>
  }
}

function Homepage (props) {
  var onSubmit = function() {
    props.onClickCheckout()
  }
  return (
    <div>
      <h1>Checkout Homepage</h1>
      <button onClick={() => { return onSubmit()}}>Checkout</button>
    </div>
  )
  // need to register the event as a function invokation
}

class F1 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      form: 'f1',
      name: '',
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onClickF1Next(this.state)
  }

  render () {

    return (
      <div>
      <h1>Profile Info</h1>
      <form>
        <label>
          Name
          <input name="name" value={this.state.name} onChange={this.handleChange}/>
        </label>
        <br></br>
        <label>
          Email
          <input name="email" value={this.state.email} onChange={this.handleChange}/>
        </label>
        <br></br>
        <label>
          Password
          <input name="password" value={this.state.password} onChange={this.handleChange}/>
        </label>
      </form>
      <button onClick={this.handleSubmit}>Next</button>
      </div>
    )
  }
}

class F2 extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      form: 'f2',
      currentUserId: this.props.currentUserId,
      shippingAddL1: '',
      shippingAddL2: '',
      city: '',
      state: '',
      zipCode: '',
      phoneNum: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(event.target.name, event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onClickF2Next(this.state)
  }

  render () {
    return (
      <div>
        <h1>Contact Info</h1>
        <form>
          <div>
            Shipping Address
          </div>
          <br></br>
          <label>
            Line 1
            <input name="shippingAddL1" value={this.state.shippingAddL1} onChange={this.handleChange}/>
          </label>
          <br></br>
          <label>
            Line 2
            <input name="shippingAddL2" value={this.state.shippingAddL2} onChange={this.handleChange}/>
          </label>
          <br></br>
          <label>
            City
            <input name="city" value={this.state.city} onChange={this.handleChange}/>
          </label>
          <br></br>
          <label>
            State
            <input name="state" value={this.state.state} onChange={this.handleChange}/>
          </label>
          <br></br>
          <label>
            Zip Code
            <input name="zipCode" value={this.state.zipCode} onChange={this.handleChange}/>
          </label>
          <br></br>
          <label>
            Phone Number
            <input name="phoneNum" value={this.state.phoneNum} onChange={this.handleChange}/>
          </label>
          <br></br>
          <button onClick={this.handleSubmit}>Next</button>
        </form>
      </div>
    )
  }
}

class F3 extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      form: 'f3',
      currentUserId: this.props.currentUserId,
      creditCard: '',
      expirationDate: '',
      cvv: '',
      billingZip: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onClickF3Next(this.state)
  }

  render () {
    return (
      <div>
        <h1>Payment</h1>
        <form>
          <label>
            Credit Card Number
            <input name="creditCard" value={this.state.creditCard} onChange={this.handleChange}/>
          </label>
          <br></br>
          <label>
            Expiration Date
            <input name="expirationDate" value={this.state.expirationDate} onChange={this.handleChange}/>
          </label>
          <br></br>
          <label>
            CVV
            <input name="cvv" value={this.state.cvv} onChange={this.handleChange}/>
          </label>
          <br></br>
          <label>
            Billing Zip Code
            <input name="billingZip" value={this.state.billingZip} onChange={this.handleChange}/>
          </label>
          <br></br>
          <button onClick={this.handleSubmit}>Next</button>
        </form>
      </div>
    )
  }
}

function Confirmation (props) {

  var onSubmit = function() {
    props.onClickPurchase()
  }

  return (
    <div>
      <h1>Summary</h1>
        <h2>Profile</h2>
          <div>Name: {props.confirmationData['name']}</div>
          <br></br>
          <div>Email: {props.confirmationData['email']}</div>
          <br></br>
          <div>Password: {props.confirmationData['password']}</div>
        <h2>Contact Info</h2>
          <div>Shipping Address</div>
          <br></br>
          <div>Line1: {props.confirmationData['shippingAddL1']}</div>
          <br></br>
          <div>Line2: {props.confirmationData['shippingAddL2']}</div>
          <br></br>
          <div>City: {props.confirmationData['city']}</div>
          <br></br>
          <div>State: {props.confirmationData['state']}</div>
          <br></br>
          <div>Zip Code: {props.confirmationData['zipCode']}</div>
          <br></br>
          <div>Phone Number: {props.confirmationData['phoneNum']}</div>
        <h2>Payment Info</h2>
          <div>Credit Card Number: {props.confirmationData['creditCard']}</div>
          <br></br>
          <div>Expiration Date: {props.confirmationData['expirationDate']}</div>
          <br></br>
          <div>CVV: {props.confirmationData['cvv']}</div>
          <br></br>
          <div>Billing Zip Code: {props.confirmationData['billingZip']}</div>
          <br></br>
      <button onClick={() => {return onSubmit()}}>Purchase</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));


