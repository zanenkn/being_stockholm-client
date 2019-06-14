import React, { Component } from 'react';
import { Container, Sidebar, Segment } from 'semantic-ui-react';
import Map from './Map'
import MenuSidebar from './MenuSidebar';

class MainContent extends Component {
  render() {
    return (
      <Container id='main_content'>
        <Sidebar.Pushable as={Segment}>
          <Map />
          <MenuSidebar/>
        </Sidebar.Pushable>
      </Container>
    )
  }
}

export default MainContent;