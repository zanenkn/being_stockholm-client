import React, {Component} from 'react'
import { Header, Container, Sidebar } from 'semantic-ui-react'
import { connect } from 'react-redux'

class MyProfile extends Component {
  render() {

  return(
    <Sidebar.Pushable as={Container} id="views-main-container-sidebar">
    <div onClick={this.props.sidebarVisible ? () => { this.props.dispatch({ type: 'CHANGE_VISIBILITY' }) } : () => { }}>
      <Container className="views-main-container">
        <Header className="views-main-header" as='h1'>
          My profile 
        </Header>
        <br></br>
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