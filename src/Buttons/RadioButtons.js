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

import React, { useState } from "react";

const RadioButtons = ({options, initSelectedOption, handleSelect, inputName = null}) => {

    let [selectedOption, setSelectedOption] = useState(initSelectedOption);

    inputName = inputName || 'data-selector-' + Date();

    const handleOptionChange = changeEvent => {
      let value = changeEvent.target.value;
      setSelectedOption(value);
      handleSelect(value);
    };

    const optionNodes = options.map((o, i) => {
      return (
          <div key={i} className="form-check">
            <label>
              <input
                  type="radio"
                  name={inputName}
                  value={o.value}
                  checked={selectedOption === o.value}
                  onChange={handleOptionChange}
                  className="form-check-input"
              />
              {o.name}
            </label>
          </div>
      )
    });

    return (
        <div className="container">
          <div className="row mt-5">
            <div className="col-sm-12">
              {optionNodes}
            </div>
          </div>
        </div>
      );
};

export default RadioButtons;
