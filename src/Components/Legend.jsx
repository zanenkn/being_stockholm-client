import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment, Sidebar, Grid, Menu, Sticky, Icon, Header } from 'semantic-ui-react'

class Legend extends Component {

  hideLegend = async () => {
    await this.props.dispatch({ type: 'CHANGE_LEGEND_VISIBILITY' })    
  }

  render() {
    return (
      <>
        <Sidebar
          className='legend-content'
          id='legend'
          as={Segment}
          animation='overlay'
          direction='bottom'
          visible={this.props.visible}
          onClick={this.hideLegend}
        >
          <Grid>
            <Grid.Column textAlign='center' className="legend-padding" >
              <Icon
                name='window minimize outline' 
                color='grey' 
                className="legend-icon" 
                size='large' 
              />

              <br></br>

            </Grid.Column>
          </Grid>

          <Grid>
            <Grid.Column width={8}>
              <Header>
                <Icon
                  id='circle-my-work'
                  name='circle'
                  size='large'>
                </Icon>
                My work
              </Header>

              <Header>
                <Icon
                  id='circle-settled-work'
                  name='circle'
                  size='large'>
                </Icon>
                Settled Work
              </Header>

              <Header>
                <Icon
                  id='circle-newbie-work'
                  name='circle'
                  size='large'>
                </Icon>
                Nembie Work
              </Header>
            </Grid.Column>

            <Grid.Column width={8}>
              <Header>
                <Icon
                  id='circle-my-play'
                  name='circle'
                  size='large'>
                </Icon>
                My play
              </Header>

              <Header>
                <Icon
                  id='circle-settled-play'
                  name='circle'
                  size='large'>
                </Icon>
                Settled Play
              </Header>

              <Header>
                <Icon
                  id='circle-newbie-play'
                  name='circle'
                  size='large'>
                </Icon>
                Newbie Play
              </Header>
            </Grid.Column>

          </Grid>
        </Sidebar>
      </>

    )
  }
}
const mapStateToProps = (state) => {
  return {
    visible: state.animation.legendVisible
  }
}
export default connect(mapStateToProps)(Legend);
