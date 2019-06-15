import React, { Component } from 'react'
import { Form, Button, Segment, Image, Checkbox } from 'semantic-ui-react';

class PostForm extends Component {
  state = {
    caption: '',
  }

  onChangeHandler = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  

  render() {
    return (
      <>
      <h1>Upload you post!</h1>
      {/* onSubmit={this.onSubmit} */}
      <Form type="medium" id="create_post" >

       
          <Image id="image" src='https://antoniaangeliqa.files.wordpress.com/2015/08/dsc08700.jpg' size='small' />
  

        <Form.Input
          id="caption"
          required
          value={this.state.caption}
          onChange={this.onChangeHandler}
          placeholder="Write your caption here"
        />

        <Button.Group>
          <Button id="work">WORK</Button>
          <Button.Or/>
          <Button id="play">PLAY</Button>
        </Button.Group>

        {/* gives u a location with pin icon on left side */}
        <Button id="create">Upload</Button>
      </Form>

      
      </>
    )
  }
}

export default PostForm