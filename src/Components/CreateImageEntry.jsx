import React, { Component } from 'react'
import { Form, Button, Icon, Header, Segment, Container, Sidebar } from 'semantic-ui-react'
import axios from 'axios'
import ImageUploader from 'react-images-upload'
import ImageEntryMessage from './ImageEntryMessage'
import ExifReader from 'exifreader'
import fileToArrayBuffer from 'file-to-array-buffer'
import Geocode from 'react-geocode'
import { connect } from 'react-redux'

class CreateImageEntry extends Component {
  state = {
    caption: '',
    image: '',
    longitude: '',
    latitude: '',
    category: 'play',
    successMessage: false,
    errorMessage: false,
    errors: '',
    activeItem: 'play',
    button: 'show-button',
    messageVisible: false,
    address: '',
    userInputAddress: ''
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  geolocationDataAddress = () => {
    Geocode.setApiKey(process.env.REACT_APP_API_KEY_GOOGLE_MAPS)
    Geocode.fromAddress(this.state.userInputAddress).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        this.setState({
          latitude: lat,
          longitude: lng,
        })
        this.geolocationDataCoords()
      },
      error => {
        console.error(error);
      }
    )
  }

  geolocationDataCoords = () => {
    Geocode.setApiKey(process.env.REACT_APP_API_KEY_GOOGLE_MAPS)
    Geocode.fromLatLng(this.state.latitude, this.state.longitude).then(
      response => {
        const addressGeocode = response.results[0].formatted_address
        this.setState({ address: addressGeocode })
      },
      error => {
        console.error(error);
      }
    )
  }

  onImageDropHandler = (pictureFiles, pictureDataURLs) => {
    if (pictureFiles.length > 0) {
      let image = pictureFiles[0]
      fileToArrayBuffer(image).then((data) => {
        try {
          var tags = ExifReader.load(data)
        }
        catch (error) {
          this.setState({ messageVisible: true, errorMessage: true, errors: ['This is an invalid JPG/JPEG image format'] })
        }
        if (tags === undefined || tags.GPSLatitude === undefined) {
          this.setState({
            image: pictureDataURLs,
            button: 'hide-button',
            address: 'Your image does not contain any location information'
          })
        } else {
          this.setState({
            image: pictureDataURLs,
            button: 'hide-button',
            longitude: tags.GPSLongitude.description,
            latitude: tags.GPSLatitude.description
          })
          this.geolocationDataCoords()
        }
      })
    } else {
      this.setState({
        button: 'show-button',
        address: '',
        image: '',
        latitude: '',
        longitude: ''
      })
    }
  }

  uploadPost = (e) => {
    e.preventDefault();
    const path = '/api/v1/posts'
    const payload = {
      image: this.state.image,
      caption: this.state.caption,
      category: this.state.category,
      latitude: this.state.latitude,
      longitude: this.state.longitude,
      address: this.state.address,
      user_id: this.props.currentUser.attributes.id
    }
    axios.post(path, payload)
      .then(response => {
        this.setState({
          successMessage: true,
          errorMessage: false,
          messageVisible: true,
        })
      })
      .catch(error => {
        this.setState({
          errorMessage: true,
          messageVisible: true,
          errors: error.response.data.error
        })
      })
  }

  handleChangeCategory = (e) => {
    this.setState({ category: e.target.value, activeItem: e.target.value })
  }

  handleMessageVisibility = animation => () =>
    this.setState(prevState => ({ animation, messageVisible: !prevState.messageVisible })
    )

  render() {

    if (this.state.image.length === 0) {
      this.state.button = 'show-button'
    }
    const { activeItem } = this.state

    let addressField

    if (this.state.address === "Your image does not contain any location information") {
      addressField = (
        <>
          <Form.Input
            required
            id="userInputAddress"
            value={this.state.userInputAddress}
            onChange={this.onChangeHandler}
            placeholder="Your address"
          />
          <Button onClick={this.geolocationDataAddress.bind(this)}>
            Search
            </Button>
        </>
      )
    }

    return (
      <>
        <Sidebar.Pushable as={Segment} textAlign='center'
          className={this.state.activeItem}>

          <ImageEntryMessage
            visible={this.state.messageVisible}
            successMessage={this.state.successMessage}
            errorMessage={this.state.errorMessage}
            image={this.state.image}
            handleMessageVisibility={this.handleMessageVisibility}
            errors={this.state.errors}
          />

          <Sidebar.Pusher dimmed={this.state.messageVisible}>
            <Container id="upload-post-wrapper">
              <Header id="upload-post-header" as='h3'>Add a photo</Header>
              <ImageUploader
                buttonText={
                  <div>
                    <p id="add-photo-headline">Add Image</p>
                    <Icon id="add-photo-icon" name="image outline" size="huge"></Icon>
                    <p id="add-photo-label">Maximum image file size: 5 MB, Accepted image types: JPG</p>
                  </div>
                }
                buttonClassName={this.state.button}
                withLabel={false}
                withIcon={false}
                withPreview={true}
                singleImage={true}
                onChange={this.onImageDropHandler}
                imgExtension={['.jpg']}
                maxFileSize={5242880}
                errorClass={(this.state.image.length > 0) ? 'image-upload-error-hidden' : 'image-upload-error-visible'}
              />
              <Form size="mini" type='medium'>
                <Form.Input
                  required
                  id="caption"
                  value={this.state.caption}
                  onChange={this.onChangeHandler}
                  placeholder="Write your caption here"
                />

              </Form>
              <p id="location">
                <Icon
                  name='map marker alternate' />
                {this.state.address}</p>

              {addressField}

              <Button.Group
                toggle={true}
                inverted={true}>
                <Button
                  id='work'
                  basic color='teal'
                  active={activeItem === 'work'}
                  value='work'
                  onClick={this.handleChangeCategory}>
                  WORK
                </Button>

                <Button
                  id='play'
                  basic color='yellow'
                  active={activeItem === 'play'}
                  value='play'
                  onClick={this.handleChangeCategory}>
                  PLAY
                </Button>
              </Button.Group>
              <br></br>
              <Button id="upload-button" onClick={this.uploadPost}>MAP IT!</Button>
            </Container>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default connect(mapStateToProps)(CreateImageEntry)
