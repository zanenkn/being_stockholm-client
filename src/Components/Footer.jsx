import React, { Component } from 'react';
import { Grid, Icon, Header, Container } from 'semantic-ui-react';

class Footer extends Component {
  render() {
    return (

        <Grid id='footer' verticalAlign='middle' centered columns={3}>
     
            <Grid.Column textAlign='center'  verticalAlign='middle' width={3}>
            <svg height = '5vw' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="#F2711C" d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg> 
            </Grid.Column>
            <Grid.Column textAlign='center' width={10}>
              <Header
                color='orange'
                id='footer-logo'
                as='h3'>
                Being Stockholm
            </Header>
            </Grid.Column>
            <Grid.Column textAlign='center' width={3}>
            <svg height = '5vw' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path fill="#F2711C" d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zM7 6v2a3 3 0 1 0 6 0V6a3 3 0 1 0-6 0zm-3.65 8.44a8 8 0 0 0 13.3 0 15.94 15.94 0 0 0-13.3 0z"/></svg>
            </Grid.Column>

        </Grid>
    )
  }
}

export default Footer;
