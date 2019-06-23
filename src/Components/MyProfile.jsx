import React, { Component } from 'react'
import { Header, Container, Sidebar, Button, Grid, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'

class MyProfile extends Component {
  render() {
    let nameMatch = (this.props.currentUser.attributes.uid).match(/^([^@]*)@/);
    let name = nameMatch ? nameMatch[1] : null;
    let greetingName = name.charAt(0).toUpperCase() + name.slice(1)
    let greeting = `Hello ${greetingName}!`

    return (
      <Sidebar.Pushable as={Container} id="views-main-container-sidebar">
        <div fluid onClick={this.props.sidebarVisible ? () => { this.props.dispatch({ type: 'CHANGE_VISIBILITY' }) } : () => { }}>
          <Container className="views-main-container">
            <Header className="views-main-header" as='h1'>
              My profile
            </Header>
            <br></br>
            <Grid centered>
            <p>
              {greeting}
            </p>
            <p className="views-text-container" >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <Divider hidden />
            <p className='text'>
              Please help us make Being Stockholm better and answer six questions about yourself.
            </p>         
            <Button
              className="submit-button"
              href="https://github.com"
              target="_blank"
            >
              Take me to the survey
            </Button>
          </Grid>
          </Container>
        </div>
      </Sidebar.Pushable>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser,
    sidebarVisible: state.animation.sidebarVisible
  }
}

export default connect(mapStateToProps)(MyProfile);