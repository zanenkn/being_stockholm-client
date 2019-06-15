import React, { Component } from 'react'
import { Form, Button, Segment, Image, Icon } from 'semantic-ui-react';

class PostForm extends Component {
  state = {
    caption: '',
    category: '',
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleChangeCategory = (e) => {
    this.setState({ category: e.target.value })
  }

  render() {
    return (
      <>
      <h3>Upload you post!</h3>
      {/* onSubmit={this.onSubmit} */}
      <Form type="medium" id="create_post" >

       
        <Image id="image" src='https://antoniaangeliqa.files.wordpress.com/2015/08/dsc08700.jpg' size='small' />
  
        <p id="location"><Icon name='map marker alternate' />Södermalm, Swedenborgsgatan</p>

        <Form.Input
          id="caption"
          required
          value={this.state.caption}
          onChange={this.onChangeHandler}
          placeholder="Write your caption here"
        />

        <Button.Group color='orange'>
          <Button 
            id="work"
            value="work"
            onClick={this.handleChangeCategory}
            >WORK</Button>
          <Button 
            id="play"
            value="play"
            onClick={this.handleChangeCategory}
            >PLAY</Button>
        </Button.Group>

        <Button id="create">Upload</Button>
      </Form>


      </>
    )
  }
}

export default PostForm