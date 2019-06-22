import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import GoogleMapReact from 'google-map-react'
import MapStyle from '../Modules/MapStyle'
import { Icon } from 'semantic-ui-react'
import Popup from 'reactjs-popup'
import CreateImageEntry from './CreateImageEntry'
import axios from 'axios'
import { connect } from 'react-redux'

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 59.330651,
      lng: 18.068562
    },
    zoom: 11
  };

  state = {
    posts: []
  }

  componentDidMount() {
    axios.get('/api/v1/posts').then(response => {
      this.setState({ posts: response.data });
    });
  }

  render() {
    let createEntry
    let user = this.props.currentUser.isSignedIn

    if (user === true) {
      createEntry = (
        <CreateImageEntry />
      )
    } else {
      createEntry = (
        <Redirect to='/log-in' />
      )
    }

    return (

      <div id='map'
        onClick={this.props.sidebarVisible ? () => { this.props.dispatch({ type: 'CHANGE_VISIBILITY' }) } : () => { }}
      >

        <Popup modal trigger={
          <Icon style={{
            position: 'absolute',
            zIndex: '4000',
            padding: '1rem'
          }}
            name='plus'
            size='huge'
            color='orange'
            id='map-icon-plus'
          />
        }
          position="top center"
          closeOnDocumentClick={true}
        >
          {createEntry}
        </Popup>

        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY_GOOGLE_MAPS }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{ styles: MapStyle }}>

          {this.state.posts.map(post => (
            <Icon name='circle'
              lat={parseFloat(post.latitude)}
              lng={parseFloat(post.longitude)}
              key={post.id}
              id={`post_${post.id}`}
              color={(post.category === 'work') ? 'teal' : 'yellow'} />
          ))}

        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  state: state,
  currentUser: state.reduxTokenAuth.currentUser,
  sidebarVisible: state.animation.sidebarVisible
})

export default connect(mapStateToProps)(Map);
