import React, { Component } from "react";
import { render } from "react-dom";
import EmailGenerator from "./emailGenerator"
import copy from 'copy-html-to-clipboard'
import CopyToClipboard from 'react-copy-html-to-clipboard';
import emailHtml from './email.html'
import "./style.css";


class InputForm extends Component {
  constructor() {
    super();
    this.state = {
      greeting: "suuuup!",
      copy: "",
      hostName: null,
      topic: null,
      time: null,
      joinZM: null,
      password: null,
      pasted: "",
      copySuccess: false
    };
    // this.updateState = this.updateState.bind(this);
  }
  handleEmailHtml = () => {
    let htmlContent = emailHtml
    return (
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    )
  }
  componentDidMount = e => {
    // to check if navigator.clipboard is active
    if (navigator.clipboard) {
      // yep, turn the feature on.
      // console.log("good 😃");

      // navigator.clipboard
      //   .readText()
      //   .then(text => {
      //     resultsEl.innerText = text;
      //   })
      //   .catch(err => {
      //     console.log("Something went wrong", err);
      //   });
      // navigator.clipboard.readText().then(({ items }) => {
      //   items.forEach(item => {
      //     console.log(item.type);
      //     // do something with the data item
      //   });
      // });
    } else {
      // console.log("not looking good 😢");
      // nope 😢. Use execCommand or leave the feature off
    }

    // try {
    //   const text = navigator.clipboard.readText();
    //   console.log("Pasted content: ", text);
    // } catch (err) {
    //   console.error("Failed to read clipboard contents: ", err);
    // }

    // e.clipboardData
    // this.state.pasted = e.clipboardData.getData('Text')
    // console.log(this.state.pasted)
    // console.log(e.clipboardData)
  };
  componentDidUpdate = () => {
    this.setState;
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ pasted: e.target.value });
  };
  updateState = e => {
    const { pasted, hostName, topic, time, joinZM, password } = this.state
    const pastedString = String(pasted)
    this.setState({ [e.target.name]: e.target.value });
    const acquiredHostName = pastedString.match("(.*) is inviting you");
    const acquiredTopic = pastedString.match("Topic: (.*)");
    const acquiredTime = pastedString.match("Time: (.*)");
    const acquiredJZM = pastedString.match("Join Zoom Meeting  (.*) ");
    const acquiredJZM = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.exec(this.state.pasted);
    const acquiredMeetingID = pastedString.match("Meeting ID: (.*)");
    const acquiredPassword = pastedString.match("Password: (.*)");
    this.setState({ hostName: acquiredHostName, topic: acquiredTopic, time: acquiredTime, joinZM: acquiredJZM, meetingID: acquiredMeetingID, password: acquiredPassword });
    const copyDoc = `<div style={{ color: "blue" }}>${this.state.hostName}</div>`
    console.log("Copy Doc", copyDoc)

    console.log("hostName", acquiredHostName)
    console.log("Topic", acquiredTopic)
    console.log("Time", acquiredTime)
    console.log("JZM", acquiredJZM)
    console.log("meeting ID", acquiredMeetingID)
    console.log("Password", acquiredPassword)
  };
  handleCopy = () => {
    const el = this.textArea;
    el.select();
    document.execCommand("copy");
  };
  handleHTMLCopy = () => {
    const el = this.textDiv;
    // document.select()
    document.execCommand("selectAll", false, null);
  };
  handleCopyHTML = () => {
    copy(emailHtml, {
      asHtml: false,
    });
  };
  handlePaste = () => {
    // const text = await navigator.clipboard.readText();
    // console.log("good")
    // navigator.clipboard
    //   .readText()
    //   .then(text => {
    //     // `text` contains the text read from the clipboard
    //   })
    //   .catch(err => {
    //     // maybe user didn't grant access to read from clipboard
    //     console.log("Something went wrong", err);
    //   });
    // const el = this.textArea
    // el.select()
    // document.execCommand("paste")

  };

  render() {
    return (
      <div>
        <p>
          {this.state.copySuccess ? (
            <div style={{ color: "green" }}>Success!</div>
          ) : null}
        </p>
        <button onClick={this.handleHTMLCopy}>html click</button>
        <form>
          <label>
            Paste Content here if not pasted:
            <br />
            <textarea
              rows="4"
              cols="70"
              type="text"
              name="pasted"
              value={this.state.pasted}
              onChange={this.updateState}
              ref={textarea => (this.textArea = textarea)}
            />
          </label>
          <EmailGenerator
            hostName={this.state.hostName ? this.state.hostName[1] : null}
            topic={this.state.topic ? this.state.topic[1] : null}
            time={this.state.time ? this.state.time[1] : null}
            joinZM={this.state.joinZM ? this.state.joinZM[0] : null}
            meetingID={this.state.meetingID ? this.state.meetingID[1] : null}
            password={this.state.password ? this.state.password[1] : null}

          />

          <input onClick={this.handleSubmit} type="submit" value="Submit" />
        </form>
        {/*
        <button onClick={this.emailHtml}>copy sasa</button>
        <button onClick={this.handleCopyHTML}>copy HTML</button>
        <button onClick={this.handleCopy}>copy</button>
        <button onClick={this.handlePaste}>paste</button>
        <CopyToClipboard text={this.state.value}
          onCopy={() => this.setState({ copied: true })}>
          <span >Copy to clipboard with span</span>
        </CopyToClipboard>
        
          <div dangerouslySetInnerHTML={{ __html: emailHtml }} />
         */}
      </div>
    );
  }
}

export default InputForm;
