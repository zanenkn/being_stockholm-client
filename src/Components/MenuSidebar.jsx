import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Grid, Header, Segment, Sidebar } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOutUser } from '../reduxTokenAuthConfig';
import { withRouter } from 'react-router-dom';

class MenuSidebar extends Component {

  signOut = (e) => {
    e.preventDefault()
    const { history, signOutUser } = this.props
    signOutUser()
      .then(response => {
        history.push('/')
      })
      
  }

  render() {

    const { signOut } = this

    let user = this.props.currentUser.isSignedIn
    let loginLabels

    if (user === true) {
      loginLabels = (
        <>
          <Header
            id='log-out-link'
            className="sidebar-menu-link"
            as={Link}
            to='log-out'
            // onClick={()=> this.props.dispatch({ type: 'CHANGE_VISIBILITY'}) && signOut }>
            onClick={ signOut }>
            Log out
          </Header>
        </>
      )
    } else {
      loginLabels = (
        <>
          <Header
            id='log-in'
            className="sidebar-menu-link"
            as={Link}
            to='log-in'
            onClick={() => this.props.dispatch({ type: 'CHANGE_VISIBILITY' })}>
            Log in / Sign up
          </Header> 
        </>
      )
    }

    return (
      <Sidebar
        id='menu-sidebar'
        as={Segment}
        animation='overlay'
        direction='left'
        visible={this.props.visible}>

        <Grid
          textAlign='center'
          verticalAlign='middle'
          id='menu-sidebar-grid'>

          <Grid.Column>
            {loginLabels}
            <br></br>
            <br></br>

            <Header
              id='about'
              className="sidebar-menu-link"
              as={Link}
              to='about'
              onClick={() => this.props.dispatch({ type: 'CHANGE_VISIBILITY' })}>
              About Project
            </Header>
            <br></br>
            <br></br>

            <Header
              id='contact'
              className="sidebar-menu-link"
              as={Link}
              to='contact'
              onClick={() => this.props.dispatch({ type: 'CHANGE_VISIBILITY' })}>
              Get in touch
            </Header>
            <br></br>
            <br></br>

            <Header
              id='partnerds'
              className="sidebar-menu-link"
              as={Link}
              to='partnerds'
              onClick={() => this.props.dispatch({ type: 'CHANGE_VISIBILITY' })}>
              Partners
             </Header>
            <br></br>
            <br></br>

            <Header
              id='legal-info'
              className="sidebar-menu-link"
              as={Link}
              to='legal-info'
              onClick={() => this.props.dispatch({ type: 'CHANGE_VISIBILITY' })}>
              Legal info
            </Header>
          </Grid.Column>
        </Grid>
      </Sidebar>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    state: state,
    currentUser: state.reduxTokenAuth.currentUser,
    visible: state.animation.sidebarVisible
  }
}

const mapDispatchToProps = {
  signOutUser
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuSidebar))