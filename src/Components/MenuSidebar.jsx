import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Grid, Header, Segment, Sidebar } from 'semantic-ui-react'

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
          className="sidebar-menu-link">
          Log in / Sign up
        </Header>

        <Header
          className="sidebar-menu-link">
          About Project
        </Header>

        <Header
          className="sidebar-menu-link">
          Get in touch
        </Header>

        <Header
          className="sidebar-menu-link">
          Partners
        </Header>

        <Header
          className="sidebar-menu-link">
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
