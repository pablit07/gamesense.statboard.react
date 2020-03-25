/* 5 props to this component. 
  - label -> label text, 
  - value -> setting the value of the input element ??
  - id -> unique ID
  - isSelected -> boolean value; controls which radio button should be selected
  - changed props -> function to fire every time radio button is changed

The changed props is a function. This function will fire every time the radio button is changed.
In vanilla JS this would be the callback function we pass to the addEventListener.
The event we’re listening for here is the onChange. Assign the props.changed
 to onChange event.
*/

import React, { Component } from "react";

class RadioButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "type"
    };
  }

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  };

  handleFormSubmit = formSubmitEvent => {
    formSubmitEvent.preventDefault();

    console.log("You have submitted:", this.state.selectedOption);
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-sm-12">
            <form onSubmit={this.handleFormSubmit}>
              <div className="form-check">
                <label>
                  <input
                    type="radio"
                    name="data-selector"
                    value="location"
                    checked={this.state.selectedOption === "location"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                  />
                  Location Score
                </label>
              </div>
              <div className="form-check">
                <label>
                  <input
                    type="radio"
                    name="data-selector"
                    value="type"
                    checked={this.state.selectedOption === "type"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                  />
                  Type Score
                </label>
              </div>
              <div className="form-check">
                <label>
                  <input
                    type="radio"
                    name="data-selector"
                    value="total"
                    checked={this.state.selectedOption === "total"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                  />
                  Total PR Score
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default RadioButton;
