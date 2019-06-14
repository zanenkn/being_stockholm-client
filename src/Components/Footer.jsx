import React, { Component } from 'react';
import { Grid, Icon, Header, Container } from 'semantic-ui-react';

class Footer extends Component {
  render() {
    return (

        <Grid id='footer' verticalAlign='middle'>
          <Grid.Row>
            <Grid.Column textAlign='center' width={3}>
              <Icon
                id='footer-menu-icon'
                name='bars'
                color='orange'
                onClick={this.props.handleAnimationChange('overlay')} />
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
              <Icon circular
                id='footer-user-icon'
                name='user'
                color='orange' />
            </Grid.Column>
          </Grid.Row>
        </Grid>
    )
  }
}

export default Footer;
