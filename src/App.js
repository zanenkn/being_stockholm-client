import React, { Component } from 'react';
import { Container, Sidebar, Segment } from 'semantic-ui-react';
import Footer from './Components/Footer';
import Map from './Components/Map'
import MenuSidebar from './Components/MenuSidebar';


class App extends Component {
  state = {
    animation: 'overlay',
    visible: false,
  }

  handleAnimationChange = animation => () =>
    this.setState(prevState => ({ animation, visible: !prevState.visible }))

  render() {
    return (
      <>
        <Sidebar.Pushable as={Container} id='main_content'>
          <Map />
          <MenuSidebar animation={this.state.animation} visible={this.state.visible} />
        </Sidebar.Pushable>
        <Footer handleAnimationChange={this.handleAnimationChange} />
      </>
    )
  }
}

export default App;



