import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Map from './Map'


class MainContent extends Component {
  render() {
    return(
      <Container id='main_content'>
        <Map/>
      </Container>
    )
  }
}

export default MainContent;