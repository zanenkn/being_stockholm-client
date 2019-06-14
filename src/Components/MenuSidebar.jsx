import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Grid, Header, Segment, Sidebar } from 'semantic-ui-react'

const HorizontalSidebar = ({ visible }) => (
  <Sidebar
    id='menu_sidebar'
    as={Segment}
    animation='overlay'
    direction='left'
    visible={visible}>
    <Grid textAlign='center'>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Header
            as='h3'>
            MENU
            </Header>
        </Grid.Column>
      </Grid.Row>
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
