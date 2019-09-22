import React from "react";
import DatePicker from "react-datepicker/es";
import isAfter from "date-fns/isAfter";
import "react-datepicker/dist/react-datepicker.css";

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.startDate,
      endDate: this.props.endDate
    };

    this.handleChange = this.handleChange.bind(this);

    let fromLocalStorage = false;
    if (localStorage.getItem(props.uniqueKey + ' - startDate')) {
      this.state.startDate = new Date(Date.parse(localStorage.getItem(props.uniqueKey + ' - startDate')));
      fromLocalStorage = true;
    }
    if (localStorage.getItem(props.uniqueKey + ' - endDate')) {
      this.state.endDate = new Date(Date.parse(localStorage.getItem(props.uniqueKey + ' - endDate')));
      fromLocalStorage = true;
    }
    if (fromLocalStorage) {
      this.handleChange({startDate: this.state.startDate, endDate: this.state.endDate, skipSetState: true});
    }

  }

  handleChange = ({ startDate, endDate, skipSetState = false }) => {
    startDate = startDate || this.state.startDate;
    endDate = endDate || this.state.endDate;

    let now = new Date();
    if (isAfter(endDate, now)) {
      endDate = now;
    }

    if (isAfter(startDate, endDate)) {
      endDate = startDate;
    }

    if (!skipSetState) {
      this.setState({startDate, endDate});
    }
    if (this.props.onChange) {
      this.props.onChange({startDate, endDate});
    }
  };

  handleChangeStart = startDate => {
    localStorage.setItem(this.props.uniqueKey + ' - startDate', startDate);
    this.handleChange({ startDate });
  };

  handleChangeEnd = endDate => {
    localStorage.setItem(this.props.uniqueKey + ' - endDate', endDate);
    this.handleChange({ endDate });
  };

  render() {
    return (

      <div>
        <h6 className="selectDate">Select Date Range:</h6>
        <br />
        <div className="dateColumns">
          <DatePicker
            selected={this.props.startDate}
            selectsStart
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeStart}
            placeholderText="Select a day"
          />
          <DatePicker
            selected={this.props.endDate}
            selectsEnd
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.handleChangeEnd}
          />
        </div>
      </div>
    );
  }
}