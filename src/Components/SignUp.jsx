import React, { Component } from 'react'
import { Form, Button, Container, Message, Header, Sidebar } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { registerUser } from '../reduxTokenAuthConfig'

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    password_confirmation: '',
    level: '',
    message: '',
    errors_signup: '',
    activeItem: '',
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleChangeLevel = (e) => {
    this.setState({ level: e.target.value, activeItem: e.target.value })
  }

  createUser = (e) => {
    e.preventDefault();
    const { history, registerUser } = this.props
    const {
      email,
      password,
      password_confirmation,
      level,
    } = this.state
    registerUser({ email, password, password_confirmation, level })
      .then(response => {
        this.setState({ message: true })
        setTimeout(function () { history.push('/') }, 1000)
      }).catch(error => {
        this.setState({
          errors_signup: error.response.data.errors.full_messages,
          message: false
        })
      })
  }

  render() {
    const { activeItem } = this.state

    let user = this.props.currentUser.isSignedIn
    let message

    if (user === true && this.state.message === true) {
      message = (
        <>
          <br />
          <Message color="green">
            <p>You have succesfully created an account!</p>
          </Message>
        </>
      )
    } else if (this.state.message === false) {
      message = (
        <>
          <br />
          <Message color="red">
            <p>Your account could not be created because of following error(s):</p>
            <ul>
              {this.state.errors_signup.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </Message>
        </>
      )
    }
    return (
      <Sidebar.Pushable as={Container} id="views-main-container-sidebar">
        <Container className="views-main-container"textAlign='center'>

          <Header className="views-main-header" as='h1'>
            Sign Up
          </Header>
          <br></br>
          <br></br>

          {message}

          <Form id="signup-form">
            <Form.Input
              id="email"
              value={this.state.email}
              onChange={this.onChangeHandler}
              placeholder="Email"
            />
            <Form.Input
              id="password"
              type="password"
              value={this.state.password}
              onChange={this.onChangeHandler}
              placeholder="Password"
            />
            <Form.Input
              id="password_confirmation"
              type="password"
              value={this.state.password_confirmation}
              onChange={this.onChangeHandler}
              placeholder="Password Confirmation"
            />
          </Form>
          <br></br>

          <p
          className='text'>
          What kind of stockholmer do you consider yourself to be?</p>

          <Button.Group
            className='button-group'
            toggle={true}
            inverted={true}>
            <Button
              id='newbie'
              basic color='grey'
              active={activeItem === 'newbie'}
              value={'newbie'}
              onClick={this.handleChangeLevel}>
              NEWBIE
            </Button>
            <Button
              id='settled'
              basic color='grey'
              active={activeItem === 'settled'}
              value={'settled'}
              onClick={this.handleChangeLevel}>
              SETTLED
              </Button>
          </Button.Group>
          <br></br>
          <br></br>

          <Button className='submit-button' id="sign_up_button" onClick={this.createUser}>Sign Up</Button>

        </Container>
      </Sidebar.Pushable>  
    )
  }
}
const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}
export default connect(
  mapStateToProps,
  { registerUser },
)(SignUp)