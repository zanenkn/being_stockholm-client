import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import MapStyle from '../Modules/MapStyle'
import { Icon } from 'semantic-ui-react'
import Popup from 'reactjs-popup'
import CreateImageEntry from './CreateImageEntry'
import EntryPopup from './EntryPopup'
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
    openEntryPopup: false,
    posts: [],
    id: ''
  }

  closeModal = () => {
    this.setState({ openEntryPopup: false })
  }

  componentDidMount() {
    axios.get('/api/v1/posts').then(response => {
      this.setState({ posts: response.data });
    });
  }

  render() {
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
          <>
            <CreateImageEntry />
          </>
        </Popup>

        <Popup
          open={this.state.openEntryPopup}
          closeOnDocumentClick={true}
          onClose={this.closeModal}>

          <div className="modal">
            <EntryPopup id={this.state.id} />
          </div>
        </Popup>

        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY_GOOGLE_MAPS }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{ styles: MapStyle }}>

          {this.state.posts.map(post => (
   
            <Icon name='circle'
              size='large'
              lat={parseFloat(post.latitude)}
              lng={parseFloat(post.longitude)}
              key={post.id}
              id={`post_${post.id}`}
              onClick={() => {this.setState({id: post.id, openEntryPopup: true}) }}
              color={(post.category === 'work') ? 'teal' : 'yellow'} />
          ))}

        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  sidebarVisible: state.animation.sidebarVisible
})

export default connect(mapStateToProps)(Map);
