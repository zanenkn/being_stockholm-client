import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Grid,
  Header,
  Segment,
  Sidebar,
} from 'semantic-ui-react'

const HorizontalSidebar = ({ visible }) => (
  <Sidebar as={Segment} animation='overlay' direction='right' visible={visible}>
    <Grid textAlign='center'>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Header as='h3'>MENU</Header>
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
        <HorizontalSidebar animation={this.props.animation} visible={this.props.visible} />
      </>
    )
  }
}