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
