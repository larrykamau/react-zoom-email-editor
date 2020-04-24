import React from "react";
import * as moment from "moment";

class Greeting extends React.Component {
  state = {
    hour: null
  };

  componentDidMount() {
    this.getHour();
  }

  getHour = () => {
    const date = new Date();
    const hour = date.getHours();
    this.setState({
      hour
    });
  };
  santitizeTime = () => {
    const date = moment("2015-07-02"); // Thursday Feb 2015
    const dow = date.day();
    console.log(dow);

    const day = "Apr 22, 2020 01:00 PM Nairobi"
    return (
      <div>{day}</div>
    )
  };

  render() {
    const { hour, username } = this.state;
    return (
      <React.Fragment>        
          {hour >= 12 && hour <= 17
            ? `Good Afternoon`
            : hour < 12
            ? `Good Morning `
            : hour > 17
            ? `Good Evening`
            : null}
      </React.Fragment>
    );
  }
}
export default Greeting;
