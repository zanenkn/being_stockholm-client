import React, { Component } from 'react'
import { Form, Button, Icon, Message, Segment, Container } from 'semantic-ui-react';
import axios from 'axios';
import ImageUploader from 'react-images-upload'

class PostForm extends Component {
  state = {
    caption: '',
    image: '',
    longitude: '',
    latitude: '',
    category: 'play',
    showPostForm: true,
    successMessage: false,
    errorMessage: false,
    errors: '',
    activeItem: 'play',
    button: 'show-button',
    form: 'show-form',
    toggle: 'show-toggle'
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
      longitude: 53.06,
      latitude: 18.03
    }

    axios.post(path, payload)
      .then(response => {
        console.log(response)
        this.setState({
          successMessage: true,
          showPostForm: false,
          errorMessage: false,
          form: 'hide-form',
          toggle: 'hide-toggle'
        })
      })
      .catch(error => {
        this.setState({
          errorMessage: true,
          errors: error.response.data.error
        })
      })
  }

  handleChangeCategory = (e) => {
    this.setState({ category: e.target.value, activeItem: e.target.value })
  }

  render() {
    let message

    if (this.state.successMessage === true) {
      message = (
        <Message color="green">
          Thank you for sharing your picture! Your post is sent for review and will soon be uploaded! Click on the map in the background to continue.
        </Message>
      )
    }

    if (this.state.errorMessage === true && this.state.image.length === 0) {
      message = (
        <>
          <br />
          <Message color="red">
            <p>Your post could not be created because of following error(s):</p>
            <ul>
              {this.state.errors.map(error => (
                <li key={error}>{error}</li>
              ))}
              <li>You need to upload an image</li>
            </ul>
          </Message>
        </>
      )
    }

    if (this.state.errorMessage === true && this.state.image.length !== 0) {
      message = (
        <>
          <br />
          <Message color="red">
            <p>Your post could not be created because of following error(s):</p>
            <ul>
              {this.state.errors.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </Message>
        </>
      )
    }

    if (this.state.image.length === 0) {
      this.state.button = 'show-button'
    }

    const { activeItem } = this.state
    return (
      <>

        <Segment textAlign='center'
          className={this.state.activeItem}>
          <h3>Add a photo</h3>
          <p>{message}</p>
          <Container>

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
            />

            <Form size="mini" type='medium' id={this.state.form}>
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
            <br></br>
            <Button.Group
              id={this.state.toggle}
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
            <br></br>

            <Button id="upload-button" onClick={this.uploadPost}>MAP IT!</Button>
          </Container>
        </Segment>
      </>
    )
  }
}

export default PostForm
