import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Grid, Header, Segment, Sidebar } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const VerticalSidebar = ({ visible }) => (
  <Sidebar
    id='menu-sidebar'
    as={Segment}
    animation='overlay'
    direction='left'
    visible={visible}>

    <Grid
      textAlign='center'
      verticalAlign='middle'
      id='menu-sidebar-grid'>

      <Grid.Column>

        <Header
          id='log-in'
          className="sidebar-menu-link"
          as={Link}
          to='log-in'>
          Log in / Sign up
        </Header>
        <br></br>
        <br></br>

        <Header
          id='about'
          className="sidebar-menu-link"
          as={Link}
          to='about'>
          About Project
        </Header>
        <br></br>
        <br></br>

        <Header
          id='contact'
          className="sidebar-menu-link"
          as={Link}
          to='contact'>
          Get in touch
        </Header>
        <br></br>
        <br></br>

        <Header
          id='partnerds'
          className="sidebar-menu-link"
          as={Link}
          to='partnerds'>
          Partners
        </Header>
        <br></br>
        <br></br>

        <Header
          id='legal-info'
          className="sidebar-menu-link"
          as={Link}
          to='legal-info'>
          Legal info
        </Header>

      </Grid.Column>

    </Grid>

  </Sidebar>
)

VerticalSidebar.propTypes = {
  visible: PropTypes.bool,
}

export default class MenuSidebar extends Component {

  render() {

    return (
      <>
        <VerticalSidebar visible={this.props.visible} />
      </>
    )
  }
}
