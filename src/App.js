import React, { Component } from "react";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      isLoaded: false,
    }
  }

  componentDidMount() {

    fetch('http://localhost:49255/api/elements')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          elements: json,
        })
      })

  }

  render() {

    var { isLoaded, elements} = this.state;

    if (!isLoaded) {
      return <div>Loading. . .</div>
    }

    else {
      return(
        <div className="App">
          Data has been loaded!
        </div>
      );
    }
  }

}

export default App;