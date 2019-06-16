import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Grid, Header, Segment, Sidebar } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const HorizontalSidebar = ({ visible }) => (
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
          className="sidebar-menu-link"
          as={Link}
          to='log-in'>
          Log in / Sign up
        </Header>
        <br></br>
        <br></br>

        <Header
          className="sidebar-menu-link"
          as={Link}
          to='about'>
          About Project
        </Header>
        <br></br>
        <br></br>

        <Header
          className="sidebar-menu-link"
          as={Link}
          to='contact'>
          Get in touch
        </Header>
        <br></br>
        <br></br>

        <Header
          className="sidebar-menu-link"
          as={Link}
          to='partnerds'>
          Partners
        </Header>
        <br></br>
        <br></br>

        <Header
          className="sidebar-menu-link"
          as={Link}
          to='legal-info'>
          Legal info
        </Header>

      </Grid.Column>

    </Grid>

  </Sidebar>
)

HorizontalSidebar.propTypes = {
  visible: PropTypes.bool,
}

export default class MenuSidebar extends Component {

  render() {

    return (
      <>
        <HorizontalSidebar visible={this.props.visible} />
      </>
    )
  }
}
