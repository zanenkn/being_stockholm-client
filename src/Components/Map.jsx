import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapStyle from '../Modules/MapStyle'
import { Icon } from 'semantic-ui-react';
import Popup from 'reactjs-popup';
import PostForm from './PostForm'

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 59.330651,
      lng: 18.068562
    },
    zoom: 11
  };

  render() {

    return (

      <div id='map'>

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
          position="right center"
        >
          <>
            <PostForm />
          </>
        </Popup>


        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY_GOOGLE_MAPS }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          options={{ styles: MapStyle }}
        >
          {/* <AnyReactComponent
            lat={59.330651}
            lng={18.068562}
            text="Hello Sthml!"
          /> */}

        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
