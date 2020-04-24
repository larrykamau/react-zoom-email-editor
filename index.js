import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import InputForm from './inputForm';
import Greeting from './timeUtil';
import './style.css';
import Demo from './templateGenerator'
import Editor from './templateGenerator/editor'


class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <div>
        <Editor />
        <Demo />
        <Hello name={this.state.name} />
        
        <Greeting />
        <InputForm />
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
