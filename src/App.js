import React, { Component } from 'react';
import { Container, Sidebar } from 'semantic-ui-react';
import Footer from './Components/Footer';
import Map from './Components/Map'
import MenuSidebar from './Components/MenuSidebar';


class App extends Component {
  state = {
    sidebarVisible: false,
  }

  handleAnimationChange = animation => () =>
    this.setState(prevState => ({ animation, sidebarVisible: !prevState.sidebarVisible }))

  render() {
    return (
      <>
        <Sidebar.Pushable as={Container} id='main_content'>
          <Map />
          <MenuSidebar visible={this.state.sidebarVisible} />
        </Sidebar.Pushable>
        <Footer handleAnimationChange={this.handleAnimationChange} />
      </>
    )
  }
}

export default App;
