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
          <Header as='h3'>New Content Awaits</Header>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Sidebar>
)

HorizontalSidebar.propTypes = {
  visible: PropTypes.bool,
}


export default class MenuSidebar extends Component {
  state = {
    animation: 'overlay',
    visible: false,
  }

  handleAnimationChange = animation => () =>
  this.setState(prevState => ({ animation, visible: !prevState.visible }))

  render() {
    const { animation, visible } = this.state

    return (
      <>
        <div>
          <HorizontalSidebar animation={animation} visible={visible} />  
        </div>
        <div>
        <Button onClick={this.handleAnimationChange('overlay')}>MENU</Button>
        </div>
      </>
    )
  }
}