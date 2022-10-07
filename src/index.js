import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';

class Elements extends Component {

  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      element: [],
      keyword: "",
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

  getElementById(id) {

    fetch('http://localhost:49255/api/elements/' + id)
      .then(res => res.json())
      .then(json => {
        this.setState({
          element: json,
        })
      })
  }

  updateInputValue(evt) {
    const val = evt.target.value;
    // ...       
    this.setState({
      keyword: val
    });
  }

  render() {

    var { isLoaded, elements, elementId, keyword} = this.state;

    if (!isLoaded) {
      return <div>Loading. . .</div>
    }

    else {

      const re = new RegExp(keyword, 'i');

      elements = elements.filter(element => {
        return Object.values(element).some(val => typeof val === "string" && val.match(re));
      })

      return(
        <div>
          <input placeholder="Search" value={keyword} onChange={evt => this.updateInputValue(evt)}></input>
          <ul>
            {elements.map(element => (
              <li key={element.id}> 
                  {element.front} | {element.back}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Elements />);