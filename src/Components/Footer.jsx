import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

class Footer extends Component {
  render() {
    return(
      <Grid id='footer' celled='internally'>
        <Grid.Row>
        <Grid.Column width={3}>
          <p>test</p>
        </Grid.Column>
        <Grid.Column width={10}>
        <p>test</p>
        </Grid.Column>
        <Grid.Column width={3}>
        <p>test</p>
        </Grid.Column>
      </Grid.Row>
      </Grid>
    )
  }
}

export default Footer;