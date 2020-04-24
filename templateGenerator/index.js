import React, {Component} from 'react'
import {render} from 'react-dom'
import styled, { createGlobalStyle } from 'styled-components'

import Example from './Example'
import sample from './sample.json'
import CodeEditor from './editor'

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
  }
  #demo {
    height: 100%;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`

const Bar = styled.div`
  flex: 1;
  background-color: #61dafb;
  color: #000;
  padding: 10px;
  display: flex;
  max-height: 40px;
  h1 {
    flex: 1;
    font-size: 16px;
    text-align: left;
  }
  button {
    flex: 1;
    padding: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    background-color: #000;
    color: #FFF;
    border: 0px;
    max-width: 150px;
    cursor: pointer;
  }
`

export default class Demo extends Component {
  constructor() {
    super();
    this.state = {
      code: `
      function add(a, b) {
        return a + b;
      }
      `
    };
  }
  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        // <CodeEditor />

        <Container>
          <Bar>
            <h1>React Email Editor (Demo)</h1>

            <button onClick={this.saveDesign}>Save Design</button>
            <button onClick={this.exportHtml}>Export HTML</button>
          </Bar>

          <Example
            ref={editor => this.editor = editor}
            onLoad={this.onLoad}
            onDesignLoad={this.onDesignLoad}
          />
        </Container>
      </React.Fragment>
    )
  }

  onLoad = () => {
    // this.editor.addEventListener('onDesignLoad', this.onDesignLoad)
    this.editor.loadDesign(sample)
  }

  saveDesign = () => {
    this.editor.saveDesign(design => {
      console.log('saveDesign', design)
      alert("Design JSON has been logged in your developer console.")
    })
  }

  exportHtml = () => {
    this.editor.exportHtml(data => {
      const { design, html } = data
      console.log('exportHtml', html)
      alert("Output HTML has been logged in your developer console.")
    })
  }

  onDesignLoad = (data) => {
    console.log('onDesignLoad', data)
  }
}
