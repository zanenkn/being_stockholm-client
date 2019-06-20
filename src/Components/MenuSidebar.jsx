import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Grid, Header, Segment, Sidebar } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

class MenuSidebar extends Component {
  render() {
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
            <Header
              id='log-in'
              className="sidebar-menu-link"
              as={Link}
              to='log-in'
              onClick={() => this.props.dispatch({ type: 'CHANGE_VISIBILITY' })}>
              Log in / Sign up
            </Header>
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
    visible: state.animation.sidebarVisible
  }
}

export default connect(mapStateToProps)(MenuSidebar)