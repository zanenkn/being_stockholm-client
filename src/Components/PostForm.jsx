import React, { Component } from 'react'
import { Form, Button, Icon, Message } from 'semantic-ui-react';
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
    button: 'show-button'
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

  onSubmit = (e) => {
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
          showPostForm: false
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
          Thank you for sharing your picture! Your post is sent for review and will soon be uploaded!
        </Message>
      )
    }

    if (this.state.errorMessage === true && this.state.image.length < 1) {
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

    if (this.state.errorMessage === true && this.state.image.length > 0) {
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
        <h3>Upload you post!</h3>
        <p>Images must have geotaging infomration available. If not, you can use an online service (like <a href='https://www.photo-location.net/'>this</a> or <a href='https://www.geoimgr.com/'>this</a>) to geotag your images before uploading.</p>
        <p>{message}</p>
        <Form type="medium" id="create-post">

          <ImageUploader
            buttonText={'Upload your picture'}
            buttonClassName={this.state.button}
            withIcon={false}
            withLabel={true}
            label={'Maximum image file size: 5 MB, Accepted image types: JPG'}
            withPreview={true}
            singleImage={true}
            onChange={this.onImageDropHandler}
            imgExtension={['.jpg']}
            maxFileSize={5242880}
          />

          <p id="location"><Icon name='map marker alternate' />Södermalm, Swedenborgsgatan</p>

          <Form.Input
            id="caption"
            value={this.state.caption}
            onChange={this.onChangeHandler}
            placeholder="Write your caption here"
          />

          <Button.Group
            color='orange'
            toggle={true}
            inverted={true}>
            <Button
              id='work'
              active={activeItem === 'work'}
              value='work'
              onClick={this.handleChangeCategory}>
              WORK
            </Button>

            <Button
              id='play'
              active={activeItem === 'play'}
              value='play'
              onClick={this.handleChangeCategory}>
              PLAY
            </Button>
          </Button.Group>

          <Button id="upload-button" onClick={this.onSubmit}>Upload</Button>
        </Form>
      </>
    )
  }
}

export default PostForm
