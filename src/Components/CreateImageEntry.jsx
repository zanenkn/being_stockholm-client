import React, { Component } from 'react'
import { Form, Button, Icon, Header, Segment, Container, Sidebar } from 'semantic-ui-react';
import axios from 'axios';
import ImageUploader from 'react-images-upload'
import ImageEntryMessage from './ImageEntryMessage'

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
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  onImageDropHandler = (pictureFiles, pictureDataURLs) => {
    this.setState({
      image: pictureDataURLs,
      button: 'hide-button'
    })
  }
  uploadPost = (e) => {
    e.preventDefault();
    const path = '/api/v1/posts'
    const payload = {
      image: this.state.image,
      caption: this.state.caption,
      category: this.state.category,
      latitude: 59.330393,
      longitude: 18.040709
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
                Södermalm, Swedenborgsgatan</p>
                
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
export default CreateImageEntry