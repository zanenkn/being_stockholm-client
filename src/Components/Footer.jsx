import React, { Component } from 'react';
import { Grid, Icon, Header, Dropdown } from 'semantic-ui-react';

class Footer extends Component {
  render() {
    return (
      <Grid id='footer' celled='internally'>
        <Grid.Row>
          <Grid.Column textAlign='center' width={3}>
            <Dropdown
              upward
              item
              icon='bars'
              color='orange'>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Icon name='dropdown' />
                  <span className='text'>New</span>
                  <Dropdown.Menu>
                    <Dropdown.Item>Document</Dropdown.Item>
                    <Dropdown.Item>Image</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>Open</Dropdown.Item>
                <Dropdown.Item>Save...</Dropdown.Item>
                <Dropdown.Item>Edit Permissions</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Export</Dropdown.Header>
                <Dropdown.Item>Share</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
          <Grid.Column textAlign='center' width={10}>
            <Header color="orange" id="footer-logo" as='h3'>Being Stockholm</Header>
          </Grid.Column>
          <Grid.Column textAlign='center' width={3}>
            <Icon circular
              name='user'
              color='orange' />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Footer;
